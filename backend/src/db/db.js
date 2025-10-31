import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./src/db/data.db",
    driver: sqlite3.Database
  });

  // Tablas
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
      FOREIGN KEY(project_id) REFERENCES projects(id)
    );
  `);

  // Usuario de prueba
  await db.run("INSERT OR IGNORE INTO users (id, username, password) VALUES (1, 'admin', '1234')");
  await db.run("INSERT OR IGNORE INTO projects (id, name) VALUES (1, 'Proyecto Demo')");

  return db;
}
