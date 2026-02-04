import { db } from "@/db";
import { sessions, questions } from "@/db/schema";
import { aiClient } from "@/lib/ai";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  questionTimestamp: Date;
  answerTimestamp: Date;
  responseTime: number;
}

export async function POST(req: Request) {
  console.log("🔍 [EVALUATE] Starting session evaluation...");

  try {
    const { sessionId, questionAnswers } = (await req.json()) as {
      sessionId: string;
      questionAnswers: QuestionAnswer[];
    };

    console.log(`📊 [EVALUATE] Session ID: ${sessionId}`);
    console.log(
      `📊 [EVALUATE] Q&A pairs received: ${questionAnswers?.length || 0}`,
    );

    if (!sessionId || !questionAnswers || questionAnswers.length === 0) {
      console.error("❌ [EVALUATE] Missing data");
      return NextResponse.json(
        { error: "Missing sessionId or questionAnswers" },
        { status: 400 },
      );
    }

    // 1. Construct evaluation prompt
    console.log("🤖 [EVALUATE] Constructing evaluation prompt...");
    const evaluationPrompt = `You are an expert technical interviewer evaluating interview responses.

For each question-answer pair below, provide:
- score: A number from 0-100
- feedback: Constructive feedback (2-3 sentences max)

Return ONLY a valid JSON array in this exact format:
[
  {
    "questionIndex": 0,
    "score": 85,
    "feedback": "Good explanation..."
  }
]

Questions and Answers:
${questionAnswers
  .map(
    (qa, i) => `
Q${i + 1}: ${qa.question}
A${i + 1}: ${qa.answer}
Response Time: ${qa.responseTime.toFixed(1)}s
`,
  )
  .join("\n")}`;

    // 2. Call LM Studio for evaluation
    console.log("🤖 [EVALUATE] Calling LM Studio for AI evaluation...");
    const evaluation = await aiClient.chat.completions.create({
      model: "local-model",
      messages: [
        {
          role: "system",
          content: "You are an expert interviewer. Return only valid JSON.",
        },
        { role: "user", content: evaluationPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    console.log("✅ [EVALUATE] AI evaluation received");
    const content = evaluation.choices[0].message.content || "{}";
    console.log(
      "📄 [EVALUATE] AI response:",
      content.substring(0, 200) + "...",
    );

    let scores: Array<{
      questionIndex: number;
      score: number;
      feedback: string;
    }>;

    try {
      const parsed = JSON.parse(content);
      // Handle both array and object with array property
      scores = Array.isArray(parsed) ? parsed : parsed.evaluations || [];
      console.log(`✅ [EVALUATE] Parsed ${scores.length} scores`);
    } catch (e) {
      console.error("❌ [EVALUATE] Failed to parse AI evaluation:", content);
      throw new Error("Invalid AI response format");
    }

    // 3. Save to questions table
    console.log("💾 [EVALUATE] Saving to database...");
    for (let i = 0; i < questionAnswers.length; i++) {
      const qa = questionAnswers[i];
      const score = scores[i] || {
        score: 0,
        feedback: "No evaluation available",
      };

      console.log(`💾 [EVALUATE] Saving Q${i + 1}: score=${score.score}`);

      await db.insert(questions).values({
        id: crypto.randomUUID(),
        sessionId,
        question: qa.question,
        userAnswer: qa.answer,
        score: score.score,
        feedback: score.feedback,
        startTime: new Date(qa.questionTimestamp),
        endTime: new Date(qa.answerTimestamp),
      });
    }

    console.log("✅ [EVALUATE] All questions saved to DB");

    // 4. Mark session as inactive
    console.log("💾 [EVALUATE] Marking session as inactive...");
    await db
      .update(sessions)
      .set({ isActive: false })
      .where(eq(sessions.id, sessionId));

    console.log("✅ [EVALUATE] Session evaluation complete!");

    return NextResponse.json({
      success: true,
      evaluatedCount: questionAnswers.length,
    });
  } catch (error) {
    console.error("❌ [EVALUATE] Session evaluation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 },
    );
  }
}
