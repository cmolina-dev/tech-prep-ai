import { db } from "./index";
import { technologies, paths, difficultyLevels } from "./schema";
import {
  interviewPaths,
  techOptions,
  difficultyOptions,
} from "@/data/mockData";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // 1. Clear existing data
    console.log("Cleaning tables...");
    await db.delete(technologies);
    await db.delete(paths);
    await db.delete(difficultyLevels);

    // 2. Insert Technologies
    console.log("Inserting technologies...");
    const allTechs = Object.entries(techOptions).flatMap(([category, techs]) =>
      techs.map((t) => ({
        id: t.id,
        name: t.name,
        icon: t.icon,
        category: category,
      })),
    );

    if (allTechs.length > 0) {
      await db.insert(technologies).values(allTechs);
    }

    // 3. Insert Paths
    console.log("Inserting paths...");
    const pathsData = interviewPaths.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      icon: p.icon,
      topics: p.topics.join(","), // Convert array to CSV string
    }));

    if (pathsData.length > 0) {
      await db.insert(paths).values(pathsData);
    }

    // 4. Insert Difficulty Levels
    console.log("Inserting difficulties...");
    const difficultiesData = difficultyOptions.map((d, index) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      color: d.color,
      levelOrder: index + 1,
    }));

    if (difficultiesData.length > 0) {
      await db.insert(difficultyLevels).values(difficultiesData);
    }

    console.log("✅ Seeding completed!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
