import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath = process.env.DB_PATH || path.join(process.cwd(), "data", "thearktech.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  projectType TEXT NOT NULL,
  budget TEXT,
  message TEXT,
  createdAt TEXT DEFAULT (datetime('now'))
);
`);

export function saveSubmission(data: {
  name: string; email: string; phone: string; projectType: string; budget?: string; message?: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO submissions (name, email, phone, projectType, budget, message)
    VALUES (@name, @email, @phone, @projectType, @budget, @message)
  `);
  const info = stmt.run(data);
  return info.lastInsertRowid as number;
}
