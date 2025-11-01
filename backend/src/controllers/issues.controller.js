import { classifyIssue } from "../services/classify.service.js";
import * as issueRepository from "../repositories/issue.repository.js";

export async function getIssues(req, res) {
  try {
    const { projectId } = req.params;
    const issues = await issueRepository.findByProjectId(projectId);
    res.json(issues);
  } catch (error) {
    console.error("Error getting issues:", error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
}

export async function createIssue(req, res) {
  try {
    const { projectId } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const tags = await classifyIssue(title, description);
    const status = "To Do";

    const id = await issueRepository.createIssue(
      projectId,
      title,
      description,
      tags,
      status
    );

    res.status(201).json({ id, title, description, tags, status });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ error: "Failed to create issue" });
  }
}
