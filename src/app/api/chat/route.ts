import { db } from "@/db";
import { sessions, messages, paths, technologies } from "@/db/schema";
import { SYSTEM_PROMPTS, InterviewTopic, Difficulty } from "@/lib/prompts";
import { aiClient } from "@/lib/ai";
import { eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: "Missing sessionId or message" },
        { status: 400 },
      );
    }

    // 1. Fetch Session Info
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Fetch Context Details
    let pathTitle = "General Software Engineering";
    if (session.pathId) {
      const p = await db
        .select()
        .from(paths)
        .where(eq(paths.id, session.pathId))
        .limit(1);
      if (p.length) pathTitle = p[0].title;
    }

    let techNames = "General concepts";
    if (session.techIds) {
      const ids = session.techIds.split(",");
      const allTechs = await db.select().from(technologies); // Optimization: could filter by IDs query
      const names = allTechs
        .filter((t) => ids.includes(t.id))
        .map((t) => t.name);
      if (names.length) techNames = names.join(", ");
    }

    // 3. Fetch History
    const messageHistory = await db.query.messages.findMany({
      where: eq(messages.sessionId, sessionId),
      orderBy: asc(messages.timestamp),
    });

    // 4. Prepare Prompts
    const systemPrompt = `You are a Senior Technical Recruiter conducting a spoken interview for a ${session.difficulty} position in ${pathTitle}. The stack includes: ${techNames}.
      Interaction Rules:
      1. **One Question Only:** Ask exactly ONE question at a time. Never provide a list of questions.
      2. **Feedback Loop:** If I answer, briefly validate my technical accuracy and correct any major English grammar mistakes first.
      3. **Flow:** After the brief feedback, immediately ask the next single question.
      4. **Style:** Be concise, professional, and conversational. Do not use emojis.`;
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messageHistory.map((m) => ({
        role: (m.role === "ai" ? "assistant" : m.role) as
          | "user"
          | "assistant"
          | "system",
        content: m.content,
      })),
    ];

    // 5. Call AI (Stream)
    const completion = await aiClient.chat.completions.create({
      model: "local-model",
      messages: apiMessages as any,
      stream: true,
      temperature: 0.7,
    });

    // 6. Create Stream & Handle DB Save
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        const encoder = new TextEncoder();

        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              fullResponse += content;
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
          // SAVE TO DB ONCE COMPLETE
          if (fullResponse) {
            await db.insert(messages).values({
              id: crypto.randomUUID(),
              sessionId,
              role: "ai",
              content: fullResponse,
            });
            console.log("Saved AI response to DB");
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
