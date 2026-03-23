#!/usr/bin/env node
/**
 * Lightweight auto-memory helper for Claude Code hooks.
 *
 * Commands:
 *   import  -> prints a small prior-session summary to stdout if available
 *   export  -> builds and saves a compact summary from recent logged events
 *
 * No external dependencies required.
 */

import fs from "fs";
import os from "os";
import path from "path";

const mode = process.argv[2] || "import";
const home = os.homedir();
const helpersDir = path.join(home, ".claude", "helpers");
const dataDir = path.join(helpersDir, "data");
const logsDir = path.join(dataDir, "logs");
const sessionsDir = path.join(dataDir, "sessions");
const memoryDir = path.join(dataDir, "memory");

for (const dir of [helpersDir, dataDir, logsDir, sessionsDir, memoryDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const summaryJson = path.join(memoryDir, "latest-summary.json");
const summaryMd = path.join(memoryDir, "latest-summary.md");
const eventsFile = path.join(logsDir, "events.jsonl");

function safeRead(filePath, fallback = "") {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return fallback;
  }
}

function safeJsonParse(text, fallback = null) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function uniq(items) {
  return [...new Set(items.filter(Boolean))];
}

function readEvents(limit = 200) {
  const raw = safeRead(eventsFile, "");
  const lines = raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return lines
    .slice(-limit)
    .map((line) => safeJsonParse(line))
    .filter(Boolean);
}

function summarize(events) {
  const repos = uniq(events.map((e) => e.cwd)).slice(-10);
  const tools = uniq(events.map((e) => e.tool)).slice(-20);
  const files = uniq(events.flatMap((e) => e.files || [])).slice(-20);
  const prompts = uniq(events.map((e) => e.prompt)).slice(-8);
  const actions = uniq(events.map((e) => e.action)).slice(-20);

  const lastRepo = repos[repos.length - 1] || null;
  const lastPrompt = prompts[prompts.length - 1] || null;

  return {
    createdAt: new Date().toISOString(),
    repos,
    tools,
    files,
    prompts,
    actions,
    lastRepo,
    lastPrompt,
    eventCount: events.length,
  };
}

function toMarkdown(summary) {
  const lines = [];
  lines.push("Previous working context:");
  lines.push("");

  if (summary.lastRepo) {
    lines.push(`- Last repo: ${summary.lastRepo}`);
  }

  if (summary.actions?.length) {
    lines.push(`- Recent actions: ${summary.actions.join(", ")}`);
  }

  if (summary.tools?.length) {
    lines.push(`- Recent tools: ${summary.tools.slice(0, 8).join(", ")}`);
  }

  if (summary.files?.length) {
    lines.push(`- Recently touched files: ${summary.files.slice(0, 8).join(", ")}`);
  }

  if (summary.lastPrompt) {
    lines.push(`- Last notable prompt: ${summary.lastPrompt}`);
  }

  lines.push("");
  lines.push("Use this only as lightweight continuity context. Prefer current repo state over stale memory.");

  return lines.join("\n");
}

if (mode === "export") {
  const events = readEvents(250);
  const summary = summarize(events);
  const md = toMarkdown(summary);

  fs.writeFileSync(summaryJson, JSON.stringify(summary, null, 2), "utf8");
  fs.writeFileSync(summaryMd, md, "utf8");

  process.exit(0);
}

if (mode === "import") {
  const md = safeRead(summaryMd, "").trim();

  if (md) {
    // Plain text output is intentional.
    // If Claude Code consumes command hook stdout, this becomes compact restore context.
    process.stdout.write(md + "\n");
  }

  process.exit(0);
}

// Unknown mode: fail open.
process.exit(0);
