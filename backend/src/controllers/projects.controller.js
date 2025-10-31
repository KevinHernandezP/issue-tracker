import { initDB } from "../db/db.js";

export async function getProjects(req, res) {
    const db = await initDB();
    const projects = await db.all("SELECT * FROM projects");
    res.json(projects);
}

