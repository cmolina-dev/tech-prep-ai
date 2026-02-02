import { db } from '@/db';
import { sessions, messages } from '@/db/schema';
import { SYSTEM_PROMPTS, InterviewTopic, Difficulty } from '@/lib/prompts';
import { aiClient } from '@/lib/ai';
import { eq, asc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Missing sessionId or message' }, { status: 400 });
    }

    // 1. Fetch Session Info
    const session = await db.query.sessions.findFirst({
        where: eq(sessions.id, sessionId)
    });

    if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // 2. Save User Message
    await db.insert(messages).values({
      id: crypto.randomUUID(),
      sessionId,
      role: 'user',
      content: message,
    });

    // 3. Fetch History
    const history = await db.query.messages.findMany({
      where: eq(messages.sessionId, sessionId),
      orderBy: asc(messages.timestamp),
    });

    // 4. Prepare Prompts
    // Safe cast or fallback
    const systemPrompt = SYSTEM_PROMPTS[session.topic as InterviewTopic]?.[session.difficulty as Difficulty] 
        || "You are a helpful technical interviewer.";
    
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...history.map(m => ({ role: m.role as "user" | "assistant", content: m.content }))
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
                role: 'ai',
                content: fullResponse,
             });
             console.log("Saved AI response to DB");
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
