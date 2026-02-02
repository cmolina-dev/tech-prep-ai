import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  topic: text('topic').notNull(),
  difficulty: text('difficulty').notNull(),
  startTime: integer('start_time', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(), // We'll generate UUIDs in app
  sessionId: text('session_id').notNull().references(() => sessions.id),
  role: text('role', { enum: ['user', 'ai', 'system'] }).notNull(),
  content: text('content').notNull(),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const questions = sqliteTable('questions', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull().references(() => sessions.id),
  question: text('question').notNull(),
  userAnswer: text('user_answer'), // Nullable if currently active question
  score: integer('score'), // 0-100
  feedback: text('feedback'),
  startTime: integer('start_time', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  endTime: integer('end_time', { mode: 'timestamp' }),
});
