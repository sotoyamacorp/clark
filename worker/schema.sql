CREATE TABLE IF NOT EXISTS chat_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  locale TEXT NOT NULL,
  email TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at ON chat_logs (created_at);
