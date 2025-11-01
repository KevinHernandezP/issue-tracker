import { initDB } from "../db/db.js";

export async function findByProjectId(projectId) {
  const db = await initDB();
  const issues = await db.all("SELECT * FROM issues WHERE project_id = ?", [projectId]);
  return issues.map(i => ({
    ...i,
    tags: i.tags ? JSON.parse(i.tags) : []
  }));
}

export async function createIssue(projectId, title, description, tags, status) {
  const db = await initDB();
  const result = await db.run(
    "INSERT INTO issues (project_id, title, description, tags, status) VALUES (?, ?, ?, ?, ?)",
    [projectId, title, description, JSON.stringify(tags), status]
  );
  return result.lastID;
}
