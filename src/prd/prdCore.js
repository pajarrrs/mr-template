// ─── PRD Core ──────────────────────────────────────────────────────────────
// Pure functions (no React, no DOM) shared by the browser UI and the MCP server
// (mcp/server.js). The AI only produces structured JSON; every markdown / SQL /
// Mermaid artifact is rendered deterministically from that JSON here, so the
// document the user previews is byte-for-byte what the coding agent reads.

export const TASK_STATUSES = ['backlog', 'todo', 'in_progress', 'done']

export const STATUS_LABELS = {
  backlog: 'Backlog',
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

export const PRIORITIES = ['must', 'should', 'could']

// ─── AI Prompt ─────────────────────────────────────────────────────────────

export const PRD_JSON_SCHEMA_HINT = `{
  "meta": {
    "name": "string - short product name",
    "summary": "string - 1-2 sentence elevator pitch",
    "problem": "string - problem statement",
    "goals": ["string - measurable goal"],
    "targetUsers": ["string - user role / persona"],
    "techStack": { "frontend": "string", "backend": "string", "database": "string", "other": ["string"] }
  },
  "features": [
    {
      "id": "F1",
      "name": "string",
      "priority": "must | should | could",
      "description": "string",
      "userStory": "As a <role>, I want <goal> so that <benefit>",
      "acceptanceCriteria": [ { "given": "string", "when": "string", "then": "string" } ]
    }
  ],
  "nonFunctional": ["string - performance / security / accessibility requirement"],
  "database": {
    "tables": [
      {
        "name": "snake_case_table",
        "description": "string",
        "columns": [
          { "name": "id", "type": "uuid", "pk": true, "nullable": false, "unique": false, "fk": null, "note": "" },
          { "name": "user_id", "type": "uuid", "pk": false, "nullable": false, "unique": false, "fk": "users.id", "note": "" }
        ]
      }
    ]
  },
  "api": [ { "method": "GET|POST|PUT|PATCH|DELETE|WS", "path": "/api/...", "description": "string", "auth": true } ],
  "steps": [ { "phase": 1, "title": "string", "description": "string - what gets built in this phase and why" } ],
  "tasks": [
    {
      "id": "T1",
      "title": "string - imperative, small enough for one coding session",
      "description": "string - concrete implementation detail (files, endpoints, components)",
      "phase": 1,
      "featureIds": ["F1"],
      "priority": "must | should | could",
      "acceptance": ["string - verifiable done criterion"]
    }
  ],
  "edgeCases": ["string"],
  "outOfScope": ["string - explicitly NOT to be built"]
}`

export function buildPrdSystemPrompt() {
  return [
    'You are a senior product manager and software architect.',
    'Turn the user request into a complete, implementation-ready Product Requirements Document.',
    'Respond with ONE valid JSON object only. No markdown, no code fences, no commentary.',
    'The JSON MUST follow this exact shape:',
    PRD_JSON_SCHEMA_HINT,
    'Rules:',
    '- Everything must be specific to the user request. No generic filler.',
    '- 5-10 features, each with 2-4 Given/When/Then acceptance criteria.',
    '- Database: every table needs a primary key; foreign keys use "table.column" and must reference existing tables.',
    '- 3-6 steps (phases) ordered from foundation to polish.',
    '- 10-25 tasks, ordered by dependency, each referencing an existing phase number and feature ids.',
    '- outOfScope must list things an AI coding agent might be tempted to build but must NOT.',
    '- Use the same language as the user request for descriptions; keep identifiers (table/column/ids) in English snake_case.',
  ].join('\n')
}

export function buildPrdUserPrompt(request, techStack) {
  const stack = techStack && techStack.trim() ? `\nPreferred tech stack: ${techStack.trim()}` : '\nTech stack: choose a modern, pragmatic stack and state it in meta.techStack.'
  return `Request: ${request.trim()}${stack}`
}

// ─── JSON extraction / normalization ───────────────────────────────────────

export function extractJson(raw) {
  if (!raw) throw new Error('AI tidak mengembalikan konten.')
  let text = String(raw)
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/```(?:json)?/gi, '')
    .trim()
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end <= start) throw new Error('Respons AI bukan JSON yang valid.')
  text = text.slice(start, end + 1)
  try {
    return JSON.parse(text)
  } catch {
    // Common LLM slip: trailing commas.
    return JSON.parse(text.replace(/,\s*([}\]])/g, '$1'))
  }
}

const asArray = (v) => (Array.isArray(v) ? v : v == null || v === '' ? [] : [v])
const asStr = (v, fallback = '') => (v == null ? fallback : String(v).trim())
const slug = (v) => asStr(v).toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '')

export function normalizeProject(input, request = '') {
  const src = input && typeof input === 'object' ? input : {}
  const meta = src.meta || {}
  const ts = meta.techStack || {}
  const now = new Date().toISOString()

  const features = asArray(src.features).map((f, i) => ({
    id: asStr(f.id, `F${i + 1}`) || `F${i + 1}`,
    name: asStr(f.name, `Feature ${i + 1}`),
    priority: PRIORITIES.includes(f.priority) ? f.priority : 'should',
    description: asStr(f.description),
    userStory: asStr(f.userStory),
    acceptanceCriteria: asArray(f.acceptanceCriteria).map((ac) =>
      typeof ac === 'string'
        ? { given: '', when: '', then: asStr(ac) }
        : { given: asStr(ac.given), when: asStr(ac.when), then: asStr(ac.then) }
    ),
  }))

  const tables = asArray(src.database?.tables).map((t, i) => ({
    name: slug(t.name) || `table_${i + 1}`,
    description: asStr(t.description),
    columns: asArray(t.columns).map((c, j) => ({
      name: slug(c.name) || `col_${j + 1}`,
      type: asStr(c.type, 'text') || 'text',
      pk: !!c.pk,
      nullable: c.nullable === true,
      unique: !!c.unique,
      fk: c.fk ? asStr(c.fk) : null,
      note: asStr(c.note),
    })),
  }))

  const steps = asArray(src.steps).map((s, i) => ({
    phase: Number(s.phase) || i + 1,
    title: asStr(s.title, `Phase ${i + 1}`),
    description: asStr(s.description),
  }))

  const tasks = asArray(src.tasks).map((t, i) => ({
    id: asStr(t.id, `T${i + 1}`) || `T${i + 1}`,
    title: asStr(t.title, `Task ${i + 1}`),
    description: asStr(t.description),
    phase: Number(t.phase) || 1,
    featureIds: asArray(t.featureIds).map((x) => asStr(x)),
    priority: PRIORITIES.includes(t.priority) ? t.priority : 'should',
    acceptance: asArray(t.acceptance).map((x) => asStr(x)),
    status: TASK_STATUSES.includes(t.status) ? t.status : 'todo',
    notes: asArray(t.notes).map((n) =>
      typeof n === 'string' ? { at: now, by: 'user', text: n } : { at: asStr(n.at, now), by: asStr(n.by, 'user'), text: asStr(n.text) }
    ),
    updatedAt: asStr(t.updatedAt, now),
  }))

  // De-duplicate ids (LLMs sometimes repeat them).
  const seen = new Set()
  tasks.forEach((t, i) => {
    if (seen.has(t.id)) t.id = `T${i + 1}_${Math.random().toString(36).slice(2, 5)}`
    seen.add(t.id)
  })

  return {
    version: 1,
    id: asStr(src.id) || `prd_${Date.now().toString(36)}`,
    request: asStr(src.request, request),
    createdAt: asStr(src.createdAt, now),
    updatedAt: asStr(src.updatedAt, now),
    meta: {
      name: asStr(meta.name, 'Untitled Project'),
      summary: asStr(meta.summary),
      problem: asStr(meta.problem),
      goals: asArray(meta.goals).map((x) => asStr(x)),
      targetUsers: asArray(meta.targetUsers).map((x) => asStr(x)),
      techStack: {
        frontend: asStr(ts.frontend),
        backend: asStr(ts.backend),
        database: asStr(ts.database),
        other: asArray(ts.other).map((x) => asStr(x)),
      },
    },
    features,
    nonFunctional: asArray(src.nonFunctional).map((x) => asStr(x)),
    database: { tables },
    api: asArray(src.api).map((a) => ({
      method: asStr(a.method, 'GET').toUpperCase(),
      path: asStr(a.path),
      description: asStr(a.description),
      auth: a.auth !== false,
    })),
    steps,
    tasks,
    edgeCases: asArray(src.edgeCases).map((x) => asStr(x)),
    outOfScope: asArray(src.outOfScope).map((x) => asStr(x)),
  }
}

// ─── Validation (catches AI mistakes before an agent trusts them) ──────────

export function validateProject(p) {
  const issues = []
  const tableNames = new Set(p.database.tables.map((t) => t.name))
  const featureIds = new Set(p.features.map((f) => f.id))
  const phases = new Set(p.steps.map((s) => s.phase))

  p.database.tables.forEach((t) => {
    if (!t.columns.some((c) => c.pk)) issues.push(`Tabel "${t.name}" tidak punya primary key.`)
    t.columns.forEach((c) => {
      if (!c.fk) return
      const [ref, refCol] = c.fk.split('.')
      const target = p.database.tables.find((x) => x.name === ref)
      if (!target) issues.push(`FK ${t.name}.${c.name} → "${c.fk}" merujuk tabel yang tidak ada.`)
      else if (refCol && !target.columns.some((x) => x.name === refCol)) issues.push(`FK ${t.name}.${c.name} → kolom "${c.fk}" tidak ada.`)
    })
  })
  p.tasks.forEach((t) => {
    if (phases.size && !phases.has(t.phase)) issues.push(`Task ${t.id} merujuk phase ${t.phase} yang tidak ada.`)
    t.featureIds.forEach((f) => {
      if (f && !featureIds.has(f)) issues.push(`Task ${t.id} merujuk fitur "${f}" yang tidak ada.`)
    })
  })
  if (!p.features.length) issues.push('Tidak ada fitur.')
  if (!p.tasks.length) issues.push('Tidak ada task.')
  if (!tableNames.size) issues.push('Tidak ada tabel database.')
  return issues
}

// ─── Renderers ─────────────────────────────────────────────────────────────

const yamlStr = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
const mdCell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')

export function buildMermaidErd(p) {
  const lines = ['erDiagram']
  p.database.tables.forEach((t) => {
    lines.push(`  ${t.name} {`)
    t.columns.forEach((c) => {
      const keys = [c.pk && 'PK', c.fk && 'FK', c.unique && !c.pk && 'UK'].filter(Boolean).join(',')
      const type = c.type.replace(/[^a-zA-Z0-9_]/g, '_') || 'text'
      lines.push(`    ${type} ${c.name}${keys ? ' ' + keys : ''}`)
    })
    lines.push('  }')
  })
  p.database.tables.forEach((t) => {
    t.columns.forEach((c) => {
      if (!c.fk) return
      const [ref] = c.fk.split('.')
      if (!ref) return
      lines.push(`  ${ref} ||--o{ ${t.name} : "${c.name}"`)
    })
  })
  return lines.join('\n')
}

export function buildSqlDdl(p) {
  return p.database.tables
    .map((t) => {
      const cols = t.columns.map((c) => {
        const parts = [`  ${c.name} ${c.type.toUpperCase()}`]
        if (c.pk) parts.push('PRIMARY KEY')
        if (!c.pk && !c.nullable) parts.push('NOT NULL')
        if (c.unique && !c.pk) parts.push('UNIQUE')
        if (c.fk) {
          const [ref, refCol] = c.fk.split('.')
          parts.push(`REFERENCES ${ref}(${refCol || 'id'})`)
        }
        return parts.join(' ')
      })
      const header = t.description ? `-- ${t.description}\n` : ''
      return `${header}CREATE TABLE ${t.name} (\n${cols.join(',\n')}\n);`
    })
    .join('\n\n')
}

export function taskStats(p) {
  const counts = Object.fromEntries(TASK_STATUSES.map((s) => [s, 0]))
  p.tasks.forEach((t) => { counts[t.status] = (counts[t.status] || 0) + 1 })
  const total = p.tasks.length
  return { ...counts, total, percent: total ? Math.round((counts.done / total) * 100) : 0 }
}

export function getNextTask(p) {
  const order = { in_progress: 0, todo: 1, backlog: 2 }
  return (
    [...p.tasks]
      .filter((t) => t.status !== 'done')
      .sort((a, b) => order[a.status] - order[b.status] || a.phase - b.phase || p.tasks.indexOf(a) - p.tasks.indexOf(b))[0] || null
  )
}

export function buildTaskMarkdown(t, p) {
  const feats = t.featureIds
    .map((id) => p.features.find((f) => f.id === id))
    .filter(Boolean)
    .map((f) => `${f.id} – ${f.name}`)
  return [
    `### ${t.id}: ${t.title}`,
    `- **Status:** ${STATUS_LABELS[t.status]}`,
    `- **Phase:** ${t.phase}`,
    `- **Priority:** ${t.priority}`,
    feats.length ? `- **Features:** ${feats.join(', ')}` : null,
    '',
    t.description,
    t.acceptance.length ? '\n**Definition of Done:**\n' + t.acceptance.map((a) => `- [${t.status === 'done' ? 'x' : ' '}] ${a}`).join('\n') : null,
    t.notes.length ? '\n**Notes:**\n' + t.notes.map((n) => `- (${n.by}, ${n.at.slice(0, 16).replace('T', ' ')}) ${n.text}`).join('\n') : null,
  ]
    .filter((x) => x !== null)
    .join('\n')
}

export function buildPrdMarkdown(p) {
  const m = p.meta
  const stats = taskStats(p)
  const stack = [m.techStack.frontend, m.techStack.backend, m.techStack.database, ...m.techStack.other].filter(Boolean)
  const out = []

  out.push('---')
  out.push(`project: ${yamlStr(m.name)}`)
  out.push(`prd_id: ${yamlStr(p.id)}`)
  out.push(`version: ${p.version}`)
  out.push(`updated_at: ${yamlStr(p.updatedAt)}`)
  out.push(`tech_stack: [${stack.map(yamlStr).join(', ')}]`)
  out.push(`progress: "${stats.done}/${stats.total} tasks done (${stats.percent}%)"`)
  out.push('ai_rules:')
  out.push('  - "Implement ONLY what is specified in this document."')
  out.push('  - "Never build anything listed under Out of Scope."')
  out.push('  - "Work task-by-task in the order of the Implementation Plan."')
  out.push('  - "Every task is done only when all its Definition of Done items pass."')
  out.push('  - "Follow the Database Design exactly (table names, columns, relations)."')
  out.push('---')
  out.push('')
  out.push(`# PRD: ${m.name}`)
  out.push('')
  if (m.summary) out.push(`> ${m.summary}`, '')
  out.push(`_Original request: "${p.request}"_`, '')

  out.push('## 1. Problem Statement', '', m.problem || '-', '')
  out.push('## 2. Goals', '', ...(m.goals.length ? m.goals.map((g) => `- ${g}`) : ['-']), '')
  out.push('## 3. Target Users', '', ...(m.targetUsers.length ? m.targetUsers.map((u) => `- ${u}`) : ['-']), '')

  out.push('## 4. Tech Stack', '')
  out.push('| Layer | Choice |', '|---|---|')
  out.push(`| Frontend | ${mdCell(m.techStack.frontend || '-')} |`)
  out.push(`| Backend | ${mdCell(m.techStack.backend || '-')} |`)
  out.push(`| Database | ${mdCell(m.techStack.database || '-')} |`)
  if (m.techStack.other.length) out.push(`| Other | ${mdCell(m.techStack.other.join(', '))} |`)
  out.push('')

  out.push('## 5. Features & Acceptance Criteria', '')
  p.features.forEach((f) => {
    out.push(`### ${f.id}: ${f.name} \`[${f.priority.toUpperCase()}]\``, '')
    if (f.description) out.push(f.description, '')
    if (f.userStory) out.push(`**User story:** ${f.userStory}`, '')
    if (f.acceptanceCriteria.length) {
      out.push('**Acceptance criteria:**', '')
      f.acceptanceCriteria.forEach((ac, i) => {
        if (ac.given || ac.when) {
          out.push(`${i + 1}. **Given** ${ac.given || '-'} **When** ${ac.when || '-'} **Then** ${ac.then || '-'}`)
        } else {
          out.push(`${i + 1}. ${ac.then}`)
        }
      })
      out.push('')
    }
  })

  out.push('## 6. Non-Functional Requirements', '', ...(p.nonFunctional.length ? p.nonFunctional.map((x) => `- ${x}`) : ['-']), '')

  out.push('## 7. Database Design', '')
  out.push('```mermaid', buildMermaidErd(p), '```', '')
  p.database.tables.forEach((t) => {
    out.push(`### Table \`${t.name}\``, '')
    if (t.description) out.push(t.description, '')
    out.push('| Column | Type | Constraints | Note |', '|---|---|---|---|')
    t.columns.forEach((c) => {
      const cons = [c.pk && 'PK', c.fk && `FK → ${c.fk}`, c.unique && !c.pk && 'UNIQUE', !c.pk && (c.nullable ? 'NULL' : 'NOT NULL')]
        .filter(Boolean)
        .join(', ')
      out.push(`| \`${c.name}\` | ${mdCell(c.type)} | ${mdCell(cons)} | ${mdCell(c.note)} |`)
    })
    out.push('')
  })
  out.push('<details><summary>SQL DDL</summary>', '', '```sql', buildSqlDdl(p), '```', '', '</details>', '')

  if (p.api.length) {
    out.push('## 8. API Contract', '')
    out.push('| Method | Path | Auth | Description |', '|---|---|---|---|')
    p.api.forEach((a) => out.push(`| ${a.method} | \`${mdCell(a.path)}\` | ${a.auth ? 'Yes' : 'No'} | ${mdCell(a.description)} |`))
    out.push('')
  }

  out.push('## 9. Implementation Plan', '')
  const phases = p.steps.length ? p.steps : [...new Set(p.tasks.map((t) => t.phase))].map((n) => ({ phase: n, title: `Phase ${n}`, description: '' }))
  phases.forEach((s) => {
    out.push(`### Phase ${s.phase}: ${s.title}`, '')
    if (s.description) out.push(s.description, '')
    const phaseTasks = p.tasks.filter((t) => t.phase === s.phase)
    phaseTasks.forEach((t) => out.push(`- [${t.status === 'done' ? 'x' : ' '}] **${t.id}** ${t.title} _(${STATUS_LABELS[t.status]})_`))
    out.push('')
  })

  out.push('## 10. Task Details', '')
  p.tasks.forEach((t) => out.push(buildTaskMarkdown(t, p), ''))

  out.push('## 11. Edge Cases', '', ...(p.edgeCases.length ? p.edgeCases.map((x) => `- ${x}`) : ['-']), '')
  out.push('## 12. Out of Scope (DO NOT BUILD)', '', ...(p.outOfScope.length ? p.outOfScope.map((x) => `- ❌ ${x}`) : ['-']), '')

  out.push('## 13. Instructions for AI Coding Agents', '')
  out.push('If the `prd-studio` MCP server is connected, use it instead of guessing:')
  out.push('1. `get_next_task` → pick the next task.')
  out.push('2. `update_task_status` with `in_progress` before you start coding.')
  out.push('3. Use `get_db_schema` / `get_prd` whenever you need context.')
  out.push('4. When every Definition of Done item passes, call `update_task_status` with `done` and a short note of files changed.')
  out.push('')

  return out.join('\n')
}
