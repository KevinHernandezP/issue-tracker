import jwt from "jsonwebtoken";
import { initDB } from "../db/db.js";

export async function login(req, res) {
  const { username, password } = req.body;
  const db = await initDB();
  const user = await db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );

  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = jwt.sign({ id: user.id, username: user.username }, "secretkey");
  res.json({ token });
}
