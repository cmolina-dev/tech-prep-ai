'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { InterviewPath, TechOption, DifficultyOption } from '@/data/mockData';

// --- PATHS ---

export async function getPaths(): Promise<InterviewPath[]> {
  const rows = db.prepare('SELECT * FROM paths').all() as any[];
  
  // For each path, get related topics/technologies
  // This is a simplistic approach (N+1), but fine for SQLite/local MVP with small data
  const paths = rows.map((row) => {
    // Join with technologies table to get names as "topics"
    const techRows = db.prepare(`
      SELECT t.name 
      FROM technologies t
      JOIN paths_technologies pt ON t.id = pt.technology_id
      WHERE pt.path_id = ?
    `).all(row.id) as { name: string }[];

    return {
      id: row.id,
      title: row.title,
      description: row.description,
      icon: row.icon,
      image: '', // DB doesn't have image column yet per simple schema in db.ts, or we iterate to add it
      topics: techRows.map(t => t.name)
    };
  });

  return paths;
}

export async function createPath(data: InterviewPath) {
  const stmt = db.prepare('INSERT INTO paths (id, title, description, icon) VALUES (?, ?, ?, ?)');
  stmt.run(data.id, data.title, data.description, data.icon);
  revalidatePath('/settings');
  revalidatePath('/');
}

export async function updatePath(id: string, data: Partial<InterviewPath>) {
   // Dynamic update query builder could be used here, but for now simple fixed columns
   // Or just specific updates. For MVP edit, usually we send full object.
   // Let's implement a simple direct update for the main fields.
   
   db.prepare(`
     UPDATE paths 
     SET title = ?, description = ?, icon = ?
     WHERE id = ?
   `).run(data.title || '', data.description || '', data.icon || '', id);
   
   revalidatePath('/settings');
   revalidatePath('/');
}

export async function deletePath(id: string) {
  db.prepare('DELETE FROM paths WHERE id = ?').run(id);
  revalidatePath('/settings');
  revalidatePath('/');
}

// --- TECHNOLOGIES ---

export async function getTechnologies(): Promise<TechOption[]> {
  const rows = db.prepare('SELECT * FROM technologies').all() as any[];
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    icon: r.icon,
    category: r.category // Using extra field we added in seed
  }));
}

export async function createTechnology(data: TechOption & { category?: string }) {
  db.prepare('INSERT INTO technologies (id, name, icon, category) VALUES (?, ?, ?, ?)')
    .run(data.id, data.name, data.icon, data.category || 'other');
  revalidatePath('/settings');
}

export async function deleteTechnology(id: string) {
  db.prepare('DELETE FROM technologies WHERE id = ?').run(id);
  revalidatePath('/settings');
}

// --- DIFFICULTIES ---

export async function getDifficulties(): Promise<DifficultyOption[]> {
  const rows = db.prepare('SELECT * FROM difficulty_levels ORDER BY level_order ASC').all() as any[];
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description,
    color: r.color
  }));
}

export async function createDifficulty(data: DifficultyOption) {
  // Get max order
  const max = db.prepare('SELECT MAX(level_order) as m FROM difficulty_levels').get() as { m: number };
  const nextOrder = (max.m || 0) + 1;

  db.prepare('INSERT INTO difficulty_levels (id, title, description, color, level_order) VALUES (?, ?, ?, ?, ?)')
    .run(data.id, data.title, data.description, data.color, nextOrder);
  revalidatePath('/settings');
}

export async function deleteDifficulty(id: string) {
  db.prepare('DELETE FROM difficulty_levels WHERE id = ?').run(id);
  revalidatePath('/settings');
}
