import { db } from '@/db';
import { sessions, messages } from '@/db/schema';
import { INITIAL_GREETINGS, InterviewTopic, Difficulty } from '@/lib/prompts';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, difficulty } = body as { topic: InterviewTopic, difficulty: Difficulty };

    const sessionId = crypto.randomUUID();

    // Create Session
    await db.insert(sessions).values({
      id: sessionId,
      topic,
      difficulty,
    });

    const initialGreeting = INITIAL_GREETINGS[topic] || "Hello! Let's start the interview.";

    // Save Initial Greeting
    await db.insert(messages).values({
      id: crypto.randomUUID(),
      sessionId,
      role: 'ai',
      content: initialGreeting,
    });

    return NextResponse.json({ 
      sessionId, 
      greeting: initialGreeting 
    });

  } catch (error) {
    console.error('Error starting session:', error);
    return NextResponse.json({ error: 'Failed to start session' }, { status: 500 });
  }
}
