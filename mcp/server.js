#!/usr/bin/env node
// ─── PRD Studio MCP Server ─────────────────────────────────────────────────
// Zero-dependency Model Context Protocol server over stdio (JSON-RPC 2.0,
// newline-delimited). Exposes the PRD, database design and Kanban board created
// in the "PRD & Kanban Studio" tool to AI coding agents (Cursor, Claude Desktop,
// Antigravity, ...). Every write goes to the same file the web UI polls, so the
// Kanban board updates live while the agent works.
//
// Usage:  node mcp/server.js            (reads .prd/project.json)
//         PRD_FILE=/path/project.json node mcp/server.js

import { readProject, writeProject, getPrdFile, setActivePrdFile } from './store.js'
import {
  TASK_STATUSES,
  STATUS_LABELS,
  buildPrdMarkdown,
  buildMermaidErd,
  buildSqlDdl,
  buildTaskMarkdown,
  getNextTask,
  taskStats,
} from '../src/prd/prdCore.js'

const SERVER_INFO = { name: 'prd-studio', version: '1.0.0' }
const FALLBACK_PROTOCOL = '2024-11-05'

const log = (...args) => process.stderr.write(`[prd-studio] ${args.join(' ')}\n`)

function requireProject() {
  const p = readProject()
  if (!p) throw new Error(`No PRD found at ${getPrdFile()}. Generate one in the PRD & Kanban Studio web UI and click "Sync ke MCP" first.`)
  return p
}

const text = (t) => ({ content: [{ type: 'text', text: t }] })

// ─── Tools ─────────────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'get_prd',
    description: 'Get the full Product Requirements Document (markdown): goals, features with Given/When/Then acceptance criteria, database design, API contract, implementation plan, tasks, edge cases and out-of-scope rules. Read this before starting work.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: () => text(buildPrdMarkdown(requireProject())),
  },
  {
    name: 'get_db_schema',
    description: 'Get the database design: Mermaid ERD, SQL DDL and the raw JSON table definitions. Follow table/column names exactly.',
    inputSchema: {
      type: 'object',
      properties: { format: { type: 'string', enum: ['all', 'sql', 'mermaid', 'json'], description: 'Output format (default: all)' } },
      additionalProperties: false,
    },
    handler: ({ format = 'all' } = {}) => {
      const p = requireProject()
      const parts = {
        mermaid: '```mermaid\n' + buildMermaidErd(p) + '\n```',
        sql: '```sql\n' + buildSqlDdl(p) + '\n```',
        json: '```json\n' + JSON.stringify(p.database.tables, null, 2) + '\n```',
      }
      return text(format === 'all' ? `## ERD\n${parts.mermaid}\n\n## SQL\n${parts.sql}\n\n## JSON\n${parts.json}` : parts[format])
    },
  },
  {
    name: 'list_tasks',
    description: 'List Kanban tasks, optionally filtered by status and/or phase.',
    inputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: TASK_STATUSES },
        phase: { type: 'number' },
      },
      additionalProperties: false,
    },
    handler: ({ status, phase } = {}) => {
      const p = requireProject()
      const s = taskStats(p)
      const tasks = p.tasks.filter((t) => (!status || t.status === status) && (phase == null || t.phase === phase))
      const lines = tasks.map((t) => `- [${STATUS_LABELS[t.status]}] ${t.id} (phase ${t.phase}, ${t.priority}): ${t.title}`)
      return text(`Progress: ${s.done}/${s.total} done (${s.percent}%)\n\n${lines.join('\n') || 'No tasks match.'}`)
    },
  },
  {
    name: 'get_task',
    description: 'Get full detail of a single task (description, linked features with acceptance criteria, definition of done, notes).',
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'], additionalProperties: false },
    handler: ({ id }) => {
      const p = requireProject()
      const t = p.tasks.find((x) => x.id === id)
      if (!t) throw new Error(`Task ${id} not found.`)
      return text(taskWithContext(t, p))
    },
  },
  {
    name: 'get_next_task',
    description: 'Get the next task to work on (in-progress first, then todo, then backlog; ordered by phase). Includes linked feature acceptance criteria.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: () => {
      const p = requireProject()
      const t = getNextTask(p)
      if (!t) return text('🎉 All tasks are done.')
      return text(taskWithContext(t, p) + `\n\n---\nWhen you start, call update_task_status { id: "${t.id}", status: "in_progress" }.`)
    },
  },
  {
    name: 'update_task_status',
    description: 'Move a task on the Kanban board. Use "in_progress" when you start and "done" only after all Definition of Done items pass. Optionally attach a note (e.g. files changed).',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        status: { type: 'string', enum: TASK_STATUSES },
        note: { type: 'string', description: 'Optional implementation note' },
      },
      required: ['id', 'status'],
      additionalProperties: false,
    },
    handler: ({ id, status, note }) => {
      if (!TASK_STATUSES.includes(status)) throw new Error(`Invalid status "${status}".`)
      const p = requireProject()
      const t = p.tasks.find((x) => x.id === id)
      if (!t) throw new Error(`Task ${id} not found.`)
      const prev = t.status
      const now = new Date().toISOString()
      t.status = status
      t.updatedAt = now
      if (note) t.notes.push({ at: now, by: 'ai', text: note })
      const saved = writeProject(p)
      const s = taskStats(saved)
      return text(`${id}: ${STATUS_LABELS[prev]} → ${STATUS_LABELS[status]}. Progress ${s.done}/${s.total} (${s.percent}%).`)
    },
  },
  {
    name: 'add_task_note',
    description: 'Append an implementation note to a task without changing its status.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string' }, note: { type: 'string' } },
      required: ['id', 'note'],
      additionalProperties: false,
    },
    handler: ({ id, note }) => {
      const p = requireProject()
      const t = p.tasks.find((x) => x.id === id)
      if (!t) throw new Error(`Task ${id} not found.`)
      const now = new Date().toISOString()
      t.notes.push({ at: now, by: 'ai', text: note })
      t.updatedAt = now
      writeProject(p)
      return text(`Note added to ${id}.`)
    },
  },
  {
    name: 'set_project_file',
    description: 'Switch the active project file to a specific path (e.g. "d:/code/Fintrack/project.json"). Use this whenever working in a different workspace or project directory.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Absolute or relative path to project.json' },
      },
      required: ['path'],
      additionalProperties: false,
    },
    handler: ({ path: filePath }) => {
      const resolved = setActivePrdFile(filePath)
      const p = readProject()
      if (!p) throw new Error(`File not found or invalid JSON at: ${resolved}`)
      return text(`Active project switched to "${p.meta?.name || 'Untitled'}" (${p.id}) at ${resolved}. ${p.tasks.length} tasks loaded.`)
    },
  },
]

function taskWithContext(t, p) {
  const feats = t.featureIds.map((id) => p.features.find((f) => f.id === id)).filter(Boolean)
  const featText = feats
    .map((f) => {
      const ac = f.acceptanceCriteria
        .map((a, i) => (a.given || a.when ? `${i + 1}. Given ${a.given} When ${a.when} Then ${a.then}` : `${i + 1}. ${a.then}`))
        .join('\n')
      return `#### ${f.id}: ${f.name}\n${f.description}\n${ac}`
    })
    .join('\n\n')
  const oos = p.outOfScope.length ? `\n\n### Out of scope (do NOT build)\n${p.outOfScope.map((x) => `- ${x}`).join('\n')}` : ''
  return `${buildTaskMarkdown(t, p)}${featText ? `\n\n### Linked features\n${featText}` : ''}${oos}`
}

// ─── Resources ─────────────────────────────────────────────────────────────

const RESOURCES = [
  { uri: 'prd://document', name: 'PRD document', mimeType: 'text/markdown', read: () => buildPrdMarkdown(requireProject()) },
  { uri: 'prd://erd', name: 'Database ERD (Mermaid)', mimeType: 'text/plain', read: () => buildMermaidErd(requireProject()) },
  { uri: 'prd://project.json', name: 'Raw PRD project JSON', mimeType: 'application/json', read: () => JSON.stringify(requireProject(), null, 2) },
]

// ─── JSON-RPC plumbing ─────────────────────────────────────────────────────

function respond(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n')
}
function respondError(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }) + '\n')
}

function handle(msg) {
  const { id, method, params = {} } = msg
  const isNotification = id === undefined || id === null

  switch (method) {
    case 'initialize':
      return respond(id, {
        protocolVersion: params.protocolVersion || FALLBACK_PROTOCOL,
        capabilities: { tools: {}, resources: {} },
        serverInfo: SERVER_INFO,
        instructions: 'PRD-driven development. Call get_next_task, mark it in_progress, implement it strictly per the PRD, then mark it done with a note.',
      })
    case 'ping':
      return respond(id, {})
    case 'tools/list':
      return respond(id, { tools: TOOLS.map(({ handler, ...t }) => t) })
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === params.name)
      if (!tool) return respondError(id, -32602, `Unknown tool: ${params.name}`)
      try {
        return respond(id, tool.handler(params.arguments || {}))
      } catch (err) {
        return respond(id, { content: [{ type: 'text', text: `Error: ${err.message}` }], isError: true })
      }
    }
    case 'resources/list':
      return respond(id, { resources: RESOURCES.map(({ read, ...r }) => r) })
    case 'resources/read': {
      const r = RESOURCES.find((x) => x.uri === params.uri)
      if (!r) return respondError(id, -32602, `Unknown resource: ${params.uri}`)
      try {
        return respond(id, { contents: [{ uri: r.uri, mimeType: r.mimeType, text: r.read() }] })
      } catch (err) {
        return respondError(id, -32603, err.message)
      }
    }
    default:
      if (isNotification) return // e.g. notifications/initialized
      return respondError(id, -32601, `Method not found: ${method}`)
  }
}

let buffer = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  buffer += chunk
  let nl
  while ((nl = buffer.indexOf('\n')) !== -1) {
    const line = buffer.slice(0, nl).trim()
    buffer = buffer.slice(nl + 1)
    if (!line) continue
    let msg
    try {
      msg = JSON.parse(line)
    } catch {
      respondError(null, -32700, 'Parse error')
      continue
    }
    try {
      handle(msg)
    } catch (err) {
      if (msg.id != null) respondError(msg.id, -32603, err.message)
    }
  }
})
process.stdin.on('end', () => process.exit(0))

log(`ready – PRD file: ${getPrdFile()}`)
