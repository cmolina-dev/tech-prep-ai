import { db } from '@/db';
import { sessions, messages, questions } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Fetch Session
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, id),
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Fetch Questions / Feedback
    const sessionQuestions = await db.query.questions.findMany({
      where: eq(questions.sessionId, id),
    });

    // Fetch Full Chat History
    const chatHistory = await db.query.messages.findMany({
      where: eq(messages.sessionId, id),
      orderBy: desc(messages.timestamp),
    });

    // Calculate Basic Stats (since we might not have detailed analysis yet)
    // In a real app, these would come from the 'questions' table's scores
    const averageScore = sessionQuestions.length > 0 
        ? sessionQuestions.reduce((acc, q) => acc + (q.score || 0), 0) / sessionQuestions.length 
        : 0;

    const summaryPayload = {
      sessionDate: session.startTime,
      topic: session.topic,
      difficulty: session.difficulty,
      stats: {
        overallScore: averageScore,
        totalQuestions: sessionQuestions.length || Math.floor(chatHistory.length / 2),
        duration: 'N/A' // Calculate based on start/end timestamps
      },
      questions: sessionQuestions,
      // Mapping raw messages to show conversation if no structured questions
      rawHistory: chatHistory 
    };

    return NextResponse.json(summaryPayload);

  } catch (error) {
    console.error('Summary error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
