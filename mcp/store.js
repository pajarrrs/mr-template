// ─── PRD file store (Node only) ────────────────────────────────────────────
// Shared by the Vite dev-server sync API (vite.config.js) and the MCP server.
// The project lives in a single JSON file; a rendered PRD.md is written next to
// it on every save so agents without MCP can still read the latest document.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildPrdMarkdown, normalizeProject } from '../src/prd/prdCore.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export function getPrdFile() {
  const fromEnv = process.env.PRD_FILE
  if (fromEnv) return path.resolve(fromEnv)

  // 1. Check process.cwd() (if AI agent is opened in another project folder)
  const cwdPrd = path.join(process.cwd(), '.prd', 'project.json')
  if (fs.existsSync(cwdPrd)) return cwdPrd

  const cwdDirect = path.join(process.cwd(), 'project.json')
  if (fs.existsSync(cwdDirect)) return cwdDirect

  // 2. Default fallback inside this repo
  return path.join(ROOT, '.prd', 'project.json')
}

export function readProject() {
  const file = getPrdFile()
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  if (!raw.trim()) return null
  return normalizeProject(JSON.parse(raw))
}

export function writeProject(project, { touch = true } = {}) {
  const file = getPrdFile()
  const normalized = normalizeProject(project)
  if (touch) normalized.updatedAt = new Date().toISOString()
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const tmp = `${file}.${process.pid}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(normalized, null, 2), 'utf8')
  fs.renameSync(tmp, file)
  fs.writeFileSync(path.join(path.dirname(file), 'PRD.md'), buildPrdMarkdown(normalized), 'utf8')

  // Asynchronous background sync to server (Vercel cloud or local dev server)
  const syncUrl = process.env.PRD_SYNC_URL || normalized.syncUrl
  if (syncUrl && typeof fetch === 'function') {
    fetch(syncUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized),
    }).catch(() => {})
  }

  return normalized
}
