#!/usr/bin/env node
/**
 * Minimal, safe Claude Code hook handler.
 *
 * Supported actions:
 *   pre-bash
 *   pre-edit
 *   post-edit
 *   post-bash
 *   route
 *   session-restore
 *   session-end
 *
 * This script is intentionally dependency-free and tolerant of unknown payloads.
 * It will not fail if Claude changes the hook payload shape. It logs useful data,
 * keeps lightweight session artifacts, and exits cleanly.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const action = process.argv[2] || "unknown";
const home = os.homedir();
const helpersDir = path.join(home, ".claude", "helpers");
const dataDir = path.join(helpersDir, "data");
const logsDir = path.join(dataDir, "logs");
const sessionsDir = path.join(dataDir, "sessions");
const memoryDir = path.join(dataDir, "memory");

for (const dir of [helpersDir, dataDir, logsDir, sessionsDir, memoryDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

function readStdin() {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) return resolve("");
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
    process.stdin.resume();

    // Failsafe in case the stream never ends.
    setTimeout(() => resolve(data), 150);
  });
}

function safeJsonParse(text) {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

function appendJsonl(filePath, obj) {
  fs.appendFileSync(filePath, JSON.stringify(obj) + "\n", "utf8");
}

function writeJson(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf8");
}

function truncate(value, max = 400) {
  const str = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!str) return null;
  return str.length > max ? str.slice(0, max) + "..." : str;
}

function uniq(items) {
  return [...new Set(items.filter(Boolean))];
}

function pickFirst(payload, paths) {
  for (const p of paths) {
    const value = getPath(payload, p);
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return null;
}

function getPath(obj, pathExpr) {
  if (!obj || !pathExpr) return undefined;
  const parts = pathExpr.split(".");
  let cur = obj;
  for (const part of parts) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

function collectStrings(obj, out = []) {
  if (obj == null) return out;
  if (typeof obj === "string") {
    out.push(obj);
    return out;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) collectStrings(item, out);
    return out;
  }
  if (typeof obj === "object") {
    for (const value of Object.values(obj)) collectStrings(value, out);
  }
  return out;
}

function normalizePayload(rawText, payload) {
  const cwd =
    pickFirst(payload, [
      "cwd",
      "workspace.cwd",
      "workspace.root",
      "project.cwd",
      "project.root",
      "repo.root",
    ]) || process.cwd();

  const tool =
    pickFirst(payload, [
      "tool_name",
      "tool.name",
      "tool",
      "matcher",
      "event.tool",
      "event.matcher",
    ]) || null;

  const prompt =
    pickFirst(payload, [
      "prompt",
      "user_prompt",
      "message",
      "input",
      "text",
      "event.prompt",
      "event.message",
    ]) || null;

  const fileCandidates = uniq(
    collectStrings(
      pickFirst(payload, [
        "file_path",
        "file_paths",
        "path",
        "paths",
        "files",
        "event.file_path",
        "event.paths",
      ]) || []
    )
      .filter((s) => /[\\/]|\.([a-z0-9]{1,8})$/i.test(s))
      .map((s) => truncate(s, 260))
  );

  return {
    action,
    ts: new Date().toISOString(),
    cwd: truncate(cwd, 260),
    tool: truncate(tool, 120),
    prompt: truncate(prompt, 500),
    files: fileCandidates.slice(0, 20),
    rawSize: rawText ? rawText.length : 0,
    payloadKeys:
      payload && typeof payload === "object" ? Object.keys(payload).slice(0, 30) : [],
  };
}

function currentSessionId() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function updateSessionIndex(event) {
  const sessionId = currentSessionId();
  const sessionFile = path.join(sessionsDir, `${sessionId}.json`);
  let session = {
    sessionId,
    createdAt: event.ts,
    updatedAt: event.ts,
    repos: [],
    tools: [],
    files: [],
    prompts: [],
    events: [],
  };

  if (fs.existsSync(sessionFile)) {
    try {
      session = JSON.parse(fs.readFileSync(sessionFile, "utf8"));
    } catch {
      // keep default
    }
  }

  session.updatedAt = event.ts;
  session.repos = uniq([...(session.repos || []), event.cwd]).slice(-20);
  session.tools = uniq([...(session.tools || []), event.tool]).slice(-50);
  session.files = uniq([...(session.files || []), ...(event.files || [])]).slice(-100);
  if (event.prompt) session.prompts = uniq([...(session.prompts || []), event.prompt]).slice(-20);
  session.events = [...(session.events || []), event].slice(-200);

  writeJson(sessionFile, session);
}

(async function main() {
  try {
    const rawText = await readStdin();
    const payload = safeJsonParse(rawText);
    const event = normalizePayload(rawText, payload);

    appendJsonl(path.join(logsDir, "events.jsonl"), event);
    updateSessionIndex(event);

    // These hook actions are currently log-only. No blocking behavior.
    // For session-restore/session-end, auto-memory-hook.mjs handles summaries.
    process.exit(0);
  } catch (error) {
    // Never break Claude Code because of the helper.
    try {
      appendJsonl(path.join(logsDir, "errors.jsonl"), {
        ts: new Date().toISOString(),
        action,
        error: String(error && error.stack ? error.stack : error),
      });
    } catch {}
    process.exit(0);
  }
})();
