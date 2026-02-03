import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// --- Static Data Tables ---

export const technologies = sqliteTable("technologies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon"),
  category: text("category"), // 'frontend', 'backend', etc.
});

export const paths = sqliteTable("paths", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"),
  topics: text("topics"), // Comma-separated string of topics
});

export const difficultyLevels = sqliteTable("difficulty_levels", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  color: text("color"),
  levelOrder: integer("level_order"),
});

// --- Dynamic User Data Tables ---

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  topic: text("topic"), // Can be null if using specific path/techs? Or maybe this is the 'Path' name? Let's keep it flexible.
  // Actually, to match the wizard, we might want to store specific config.
  // But for now, let's keep the existing structure and maybe add fields if needed later.
  // User didn't explicitly ask to change sessions table structure, just "migrate todo".
  // However, we need to store the wizard selection.
  // Let's stick to the existing schema for now and see if we need to add columns.
  // Wait, user said "pass parameter to AI". We probably need to store 'pathId', 'difficultyId', 'techIds' in session.
  // But let's follow the immediate instruction: Migrate existing tables.
  difficulty: text("difficulty").notNull(),
  startTime: integer("start_time", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  // New fields for wizard context
  pathId: text("path_id").references(() => paths.id),
  techIds: text("tech_ids"), // Comma-separated string of selected tech IDs
});

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(), // We'll generate UUIDs in app
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["user", "ai", "system"] }).notNull(),
  content: text("content").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const questions = sqliteTable("questions", {
  id: text("id").primaryKey(),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  userAnswer: text("user_answer"), // Nullable if currently active question
  score: integer("score"), // 0-100
  feedback: text("feedback"),
  startTime: integer("start_time", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  endTime: integer("end_time", { mode: "timestamp" }),
});
