import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5050;

app.use(
  cors({
    origin: true, // reflect request origin (simple dev setup)
    credentials: false,
  })
);
app.use(express.json({ limit: "200kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "zeeshan-portfolio-api" });
});

app.post("/api/contact", (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  const email = String(req.body?.email ?? "").trim();
  const message = String(req.body?.message ?? "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  // Lightweight persistence (no database): append to JSONL file.
  const record = {
    ts: new Date().toISOString(),
    name,
    email,
    message,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
  };

  const outDir = path.resolve("./data");
  const outFile = path.join(outDir, "messages.jsonl");
  fs.mkdirSync(outDir, { recursive: true });
  fs.appendFileSync(outFile, JSON.stringify(record) + "\n", "utf8");

  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
