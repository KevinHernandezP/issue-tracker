import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./src/db/data.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS issues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      title TEXT,
      description TEXT,
      tags TEXT,
      status TEXT DEFAULT 'To Do',
      FOREIGN KEY(project_id) REFERENCES projects(id)
    );
  `);

  try {
    await db.exec(`ALTER TABLE issues ADD COLUMN status TEXT DEFAULT 'To Do';`);
  } catch (err) {
    if (!err.message.includes("duplicate column")) {
      console.error("Error adding status column:", err.message);
    }
  }

  await db.run(
    "INSERT OR IGNORE INTO users (id, username, password) VALUES (1, 'admin', '1234')"
  );
  await db.run(
    "INSERT OR IGNORE INTO projects (id, name) VALUES (1, 'Proyecto Demo')"
  );

  return db;
}

