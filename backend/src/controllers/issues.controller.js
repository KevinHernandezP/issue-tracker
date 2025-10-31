import { initDB } from "../db/db.js";
import { classifyIssue } from "../services/classify.service.js";

export async function getIssues(req, res) {
  const { projectId } = req.params;
  const db = await initDB();
  const issues = await db.all("SELECT * FROM issues WHERE project_id = ?", [projectId]);

  const formattedIssues = issues.map(i => ({
    ...i,
    tags: i.tags ? JSON.parse(i.tags) : []
  }));

  res.json(formattedIssues);
}


export async function createIssue(req, res) {
  const { projectId } = req.params;
  const { title, description } = req.body;

  const tags = await classifyIssue(title, description);

  const db = await initDB();
  const result = await db.run(
    "INSERT INTO issues (project_id, title, description, tags) VALUES (?, ?, ?, ?)",
    [projectId, title, description, JSON.stringify(tags)]
  );

  res.status(201).json({ id: result.lastID, title, description, tags });
}
