"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { InterviewPath, TechOption, DifficultyOption } from "@/data/mockData";
import { paths, technologies, difficultyLevels } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

// --- PATHS ---

export async function getPaths(): Promise<InterviewPath[]> {
  const rows = await db.select().from(paths);

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description || "",
    icon: row.icon || "",
    image: "", // DB schema doesn't have image yet
    topics: row.topics ? row.topics.split(",") : [],
  }));
}

export async function createPath(data: InterviewPath) {
  await db.insert(paths).values({
    id: data.id,
    title: data.title,
    description: data.description,
    icon: data.icon,
    topics: data.topics.join(","),
  });
  revalidatePath("/settings");
  revalidatePath("/");
}

export async function updatePath(id: string, data: Partial<InterviewPath>) {
  await db
    .update(paths)
    .set({
      title: data.title,
      description: data.description,
      icon: data.icon,
      topics: data.topics ? data.topics.join(",") : undefined,
    })
    .where(eq(paths.id, id));

  revalidatePath("/settings");
  revalidatePath("/");
}

export async function deletePath(id: string) {
  await db.delete(paths).where(eq(paths.id, id));
  revalidatePath("/settings");
  revalidatePath("/");
}

// --- TECHNOLOGIES ---

export async function getTechnologies(): Promise<TechOption[]> {
  const rows = await db.select().from(technologies);
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    icon: r.icon || "",
    category: r.category, // existing field in our schema
  }));
}

export async function createTechnology(
  data: TechOption & { category?: string },
) {
  await db.insert(technologies).values({
    id: data.id,
    name: data.name,
    icon: data.icon,
    category: data.category || "other",
  });
  revalidatePath("/settings");
}

export async function deleteTechnology(id: string) {
  await db.delete(technologies).where(eq(technologies.id, id));
  revalidatePath("/settings");
}

// --- DIFFICULTIES ---

export async function getDifficulties(): Promise<DifficultyOption[]> {
  const rows = await db
    .select()
    .from(difficultyLevels)
    .orderBy(difficultyLevels.levelOrder);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    color: r.color || "",
  }));
}

export async function createDifficulty(data: DifficultyOption) {
  // Get max order
  const maxResult = await db
    .select({ value: difficultyLevels.levelOrder })
    .from(difficultyLevels)
    .orderBy(desc(difficultyLevels.levelOrder))
    .limit(1);

  const nextOrder = (maxResult[0]?.value || 0) + 1;

  await db.insert(difficultyLevels).values({
    id: data.id,
    title: data.title,
    description: data.description,
    color: data.color,
    levelOrder: nextOrder,
  });
  revalidatePath("/settings");
}

export async function deleteDifficulty(id: string) {
  await db.delete(difficultyLevels).where(eq(difficultyLevels.id, id));
  revalidatePath("/settings");
}

// --- SESSIONS ---

import { sessions } from "@/db/schema";

export async function createSession(config: {
  pathId: string;
  techIds: string[];
  difficulty: string;
  mode: string;
}) {
  const id = crypto.randomUUID();
  await db.insert(sessions).values({
    id,
    pathId: config.pathId,
    techIds: config.techIds.join(","),
    difficulty: config.difficulty,
    topic: "Interview", // Default topic
    isActive: true,
    startTime: new Date(),
  });
  return id;
}

export async function getSessionContext(sessionId: string) {
  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);
  if (!session.length) return null;

  const s = session[0];

  // Fetch Path Title
  const path = await db
    .select()
    .from(paths)
    .where(eq(paths.id, s.pathId || ""))
    .limit(1);
  const pathTitle = path[0]?.title || "General";

  // Fetch Tech Names
  let techNames: string[] = [];
  if (s.techIds) {
    const ids = s.techIds.split(",");
    // Drizzle doesn't have 'inArray' easily reachable globally without importing?
    // actually `inArray(technologies.id, ids)` works.
    // simpler: fetch all techs and filter, or just map if we want to be lazy.
    // or use inArray: import { inArray } from 'drizzle-orm';
    // I need to import inArray at top. I'll just do separate queries or a loop for now to be safe with existing imports,
    // OR just use the IDs if I can't easily change imports at top of file with this tool call.
    // actually I can assume I can add imports if I replace the top.
    // But I'm appending to the bottom basically.
    // I'll assume simple fetch for now or iterate.
    // Let's use `inArray` and add the import in a separate edit if needed, OR just fetch all techs (small list) and find.
    const allTechs = await db.select().from(technologies);
    techNames = allTechs.filter((t) => ids.includes(t.id)).map((t) => t.name);
  }

  return {
    path: pathTitle,
    technologies: techNames.join(", "),
    difficulty: s.difficulty,
  };
}

// --- MESSAGES ---

import { messages } from "@/db/schema";

export async function saveSessionMessage(data: {
  sessionId: string;
  role: "user" | "ai";
  content: string;
}) {
  await db.insert(messages).values({
    id: crypto.randomUUID(),
    sessionId: data.sessionId,
    role: data.role,
    content: data.content,
    timestamp: new Date(),
  });
}
