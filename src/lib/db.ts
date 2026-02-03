
import Database from 'better-sqlite3';
import { interviewPaths, techOptions, difficultyOptions } from '@/data/mockData';

const db = new Database('tech-prep.db');

export function initDB() {
  // 1. Technologies Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS technologies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT,
      category TEXT
    )
  `);

  // 2. Paths Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS paths (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      icon TEXT
    )
  `);

  // 3. Junction Table: Paths <-> Technologies
  // Note: effectively a Many-to-Many relationship
  db.exec(`
    CREATE TABLE IF NOT EXISTS paths_technologies (
      path_id TEXT,
      technology_id TEXT,
      PRIMARY KEY (path_id, technology_id),
      FOREIGN KEY (path_id) REFERENCES paths(id) ON DELETE CASCADE,
      FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
    )
  `);

  // 4. Difficulty Levels Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS difficulty_levels (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      color TEXT,
      level_order INTEGER
    )
  `);

  seedDB();
}

function seedDB() {
  const techCount = db.prepare('SELECT count(*) as count FROM technologies').get() as { count: number };
  
  if (techCount.count === 0) {
    console.log('Seeding Database...');
    
    // Seed Technologies
    const insertTech = db.prepare('INSERT INTO technologies (id, name, icon, category) VALUES (?, ?, ?, ?)');
    const allTechs = Object.entries(techOptions).flatMap(([category, techs]) => 
        techs.map(t => ({ ...t, category }))
    );

    const insertPath = db.prepare('INSERT INTO paths (id, title, description, icon) VALUES (?, ?, ?, ?)');
    const insertPathTech = db.prepare('INSERT INTO paths_technologies (path_id, technology_id) VALUES (?, ?)');
    const insertDiff = db.prepare('INSERT INTO difficulty_levels (id, title, description, color, level_order) VALUES (?, ?, ?, ?, ?)');

    const transaction = db.transaction(() => {
        // Technologies
        for (const tech of allTechs) {
            insertTech.run(tech.id, tech.name, tech.icon, tech.category);
        }

        // Paths
        for (const path of interviewPaths) {
            insertPath.run(path.id, path.title, path.description, path.icon);
            // Assuming for now that paths verify 'topics' against tech names or have a mapping. 
            // Since mockData 'topics' are strings like 'React', we might need to match them to tech IDs.
            // For simplicity in this seed, let's map common ones or leave empty if no direct match logic exists in mockData yet.
            // Actually, let's try to match by name for a better experience if possible, or skip for MVP.
            // Updated plan: we will just seed the base Tables. Associations might need manual setup or a smarter seed if mockData had IDs.
            // Looking at mockData, 'topics' are just strings. We'll skip auto-linking for now or do a best effort match.
             allTechs.forEach(t => {
                if (path.topics.includes(t.name)) {
                     insertPathTech.run(path.id, t.id);
                }
             });
        }

        // Difficulties
        let order = 1;
        for (const diff of difficultyOptions) {
            insertDiff.run(diff.id, diff.title, diff.description, diff.color, order++);
        }
    });

    transaction();
    console.log('Database seeded successfully.');
  }
}

// Initialize on first import/usage
try {
    initDB();
} catch (error) {
    console.error('Failed to initialize database:', error);
}

export default db;
