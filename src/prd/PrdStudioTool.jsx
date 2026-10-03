import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  TASK_STATUSES,
  STATUS_LABELS,
  PRIORITIES,
  buildPrdSystemPrompt,
  buildPrdUserPrompt,
  extractJson,
  normalizeProject,
  validateProject,
  buildPrdMarkdown,
  buildMermaidErd,
  buildSqlDdl,
  taskStats,
} from './prdCore.js'
import { extractTextFromPdf } from './pdfExtractor.js'
import './prdStudio.css'

const LS_KEY = 'prd_studio_project'
const LS_MODEL_KEY = 'prd_studio_model'
const POLL_MS = 3000
const AI_TIMEOUT_MS = 240000

const PRESETS = [
  { title: 'Aplikasi Chat', prompt: 'Buatkan PRD membuat aplikasi chat realtime dengan room, direct message, status online, dan upload attachment' },
  { title: 'E-Commerce', prompt: 'Buatkan PRD toko online sederhana dengan katalog produk, keranjang, checkout, dan payment gateway' },
  { title: 'Task Manager SaaS', prompt: 'Buatkan PRD aplikasi manajemen tugas tim (multi workspace, project, task, komentar, notifikasi)' },
  { title: 'Booking Klinik', prompt: 'Buatkan PRD aplikasi booking jadwal dokter klinik dengan antrian dan reminder WhatsApp' },
]

const TABS = [
  { id: 'prd', label: 'PRD' },
  { id: 'steps', label: 'Steps' },
  { id: 'db', label: 'Database' },
  { id: 'kanban', label: 'Kanban' },
  { id: 'mcp', label: 'MCP' },
]

const RECOMMENDED_MODELS = [
  { id: 'openrouter/free', label: 'Auto Free' },
  { id: 'google/gemini-2.0-flash-exp:free', label: '⚡ Gemini 2.0 Flash (Anti-Limit)' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', label: '🧠 Llama 3.3 70B' },
  { id: 'qwen/qwen-2.5-coder-32b-instruct:free', label: '💻 Qwen 2.5 Coder 32B' },
]

const isLocalDev = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.endsWith('.local')
)

// ─── Helpers ───────────────────────────────────────────────────────────────

function loadLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? normalizeProject(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}

function downloadFile(name, content, type = 'text/markdown') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

// Frontmatter renders badly through the simple markdown parser; show it as a code block.
function markdownForPreview(md) {
  return md.replace(/^---\n([\s\S]*?)\n---\n/, (_, yaml) => '```yaml\n' + yaml + '\n```\n')
}

function CopyButton({ text, label = 'Copy', className = '' }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      className={`prd-btn ${className}`}
      onClick={async () => {
        await copyText(text)
        setDone(true)
        setTimeout(() => setDone(false), 1800)
      }}
    >
      {done ? '✓ Copied' : label}
    </button>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function PrdStudioTool({ apiKey, model, renderMarkdown }) {
  const [request, setRequest] = useState('')
  const [techStack, setTechStack] = useState('')
  const [modelOverride, setModelOverride] = useState(() => localStorage.getItem(LS_MODEL_KEY) || '')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [pdfExtracting, setPdfExtracting] = useState(false)
  const [pdfProgress, setPdfProgress] = useState(null)
  const [pdfData, setPdfData] = useState(null)
  const [pdfExtra, setPdfExtra] = useState('')
  const [pdfError, setPdfError] = useState(null)
  const [project, setProject] = useState(loadLocal)
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState('')
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('prd')
  const [prdView, setPrdView] = useState('preview')
  const [sync, setSync] = useState({ available: false, file: '', mcpServer: '', lastSync: null, error: null })
  const projectRef = useRef(project)
  projectRef.current = project

  const markdown = useMemo(() => (project ? buildPrdMarkdown(project) : ''), [project])
  const issues = useMemo(() => (project ? validateProject(project) : []), [project])
  const stats = useMemo(() => (project ? taskStats(project) : null), [project])

  useEffect(() => {
    if (project) localStorage.setItem(LS_KEY, JSON.stringify(project))
  }, [project])

  // ── File sync (Vite dev middleware ↔ .prd/project.json ↔ MCP server) ──

  const pushToServer = useCallback(async (p) => {
    try {
      const res = await fetch('/api/prd', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      setSync((s) => ({ ...s, available: true, file: data.file, lastSync: new Date(), error: null }))
      return normalizeProject(data.project)
    } catch (err) {
      setSync((s) => ({ ...s, error: err.message }))
      return null
    }
  }, [])

  const pullFromServer = useCallback(async () => {
    try {
      const res = await fetch('/api/prd')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setSync((s) => ({
        ...s,
        available: true,
        isCloud: data.isCloud || !isLocalDev,
        file: data.file || (isLocalDev ? 'Local Disk' : 'Cloud Session (Vercel)'),
        mcpServer: data.mcpServer || s.mcpServer,
        error: null,
      }))
      if (!data.project) return
      const remote = normalizeProject(data.project)
      const local = projectRef.current
      // Remote wins if it is a different project or has newer edits (e.g. AI agent moved a card).
      if (!local || remote.id !== local.id || remote.updatedAt > local.updatedAt) {
        setProject(remote)
        setSync((s) => ({ ...s, lastSync: new Date() }))
      }
    } catch {
      setSync((s) => ({
        ...s,
        available: false,
        isCloud: !isLocalDev,
        file: !isLocalDev ? 'Browser Storage' : '',
        error: null,
      }))
    }
  }, [])

  useEffect(() => {
    pullFromServer()
    if (isLocalDev) {
      const t = setInterval(pullFromServer, POLL_MS)
      return () => clearInterval(t)
    }
  }, [pullFromServer])

  // Every local edit goes through commit() so updatedAt + sync stay consistent.
  const commit = useCallback(
    async (updater) => {
      const base = projectRef.current
      if (!base) return
      const next = typeof updater === 'function' ? updater(structuredClone(base)) : updater
      next.updatedAt = new Date().toISOString()
      setProject(next)
      if (sync.available) {
        const saved = await pushToServer(next)
        if (saved) setProject(saved)
      }
    },
    [pushToServer, sync.available]
  )

  // ── AI generation ──

  const callAI = async (messages) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS)
    try {
      const selectedModel = modelOverride.trim() || model
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'PRD & Kanban Studio',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages,
          response_format: { type: 'json_object' },
          temperature: 0.2,
          max_tokens: 8192,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`)
      const choice = data?.choices?.[0]
      let content = choice?.message?.content || ''
      if (!content && choice?.message?.reasoning) {
        content = choice.message.reasoning
      }
      if (!content && choice?.finish_reason === 'length') {
        throw new Error('Model AI kehabisan token saat berpikir. Silakan pilih model "Gemini 2.0 Flash" pada menu Model di atas untuk hasil instan tanpa limit.')
      }
      return content
    } catch (err) {
      if (err.name === 'AbortError') throw new Error('AI terlalu lama merespons (timeout). Coba lagi atau ganti model.')
      throw err
    } finally {
      clearTimeout(timer)
    }
  }

  const handleGenerate = async (customPrompt) => {
    const req = (customPrompt ?? request).trim()
    if (!req || loading) return
    if (project && !window.confirm('Generate PRD baru akan menggantikan PRD & Kanban saat ini. Lanjutkan?')) return

    setLoading(true)
    setError(null)
    try {
      setLoadingStage('Menyusun PRD, database design & task breakdown...')
      const messages = [
        { role: 'system', content: buildPrdSystemPrompt() },
        { role: 'user', content: buildPrdUserPrompt(req, techStack) },
      ]
      let raw = await callAI(messages)
      let parsed
      try {
        parsed = extractJson(raw)
      } catch {
        // One retry: free models sometimes return empty, wrapped or truncated JSON.
        setLoadingStage('Output AI tidak valid, mencoba ulang...')
        raw = await callAI(
          raw.trim()
            ? [
                ...messages,
                { role: 'assistant', content: raw.slice(0, 12000) },
                { role: 'user', content: 'That was not valid JSON. Return the COMPLETE PRD again as ONE valid JSON object only, no prose, no code fences.' },
              ]
            : messages
        )
        parsed = extractJson(raw)
      }
      const next = normalizeProject({ ...parsed, request: req, id: `prd_${Date.now().toString(36)}` }, req)
      if (!next.features.length && !next.tasks.length) throw new Error('Output AI kosong / tidak sesuai skema. Coba generate ulang.')
      setProject(next)
      setTab('prd')
      if (sync.available) {
        const saved = await pushToServer(next)
        if (saved) setProject(saved)
      }
    } catch (err) {
      setError(err.message || 'Gagal generate PRD.')
    } finally {
      setLoading(false)
      setLoadingStage('')
    }
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    file.text().then((txt) => {
      try {
        const next = normalizeProject(JSON.parse(txt))
        next.updatedAt = new Date().toISOString()
        setProject(next)
        if (sync.available) pushToServer(next)
      } catch (err) {
        setError(`Import gagal: ${err.message}`)
      }
    })
    e.target.value = ''
  }

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setPdfModalOpen(true)
    setPdfExtracting(true)
    setPdfError(null)
    setPdfProgress({ current: 0, total: 1 })
    try {
      const data = await extractTextFromPdf(file, (curr, total) => {
        setPdfProgress({ current: curr, total })
      })
      setPdfData(data)
    } catch (err) {
      setPdfError(err.message || 'Gagal mengekstrak teks dari file PDF.')
    } finally {
      setPdfExtracting(false)
    }
  }

  const handleClear = () => {
    if (!window.confirm('Hapus PRD lokal dari browser? (File sync di disk tidak dihapus)')) return
    localStorage.removeItem(LS_KEY)
    setProject(null)
  }

  // ── Kanban ops ──

  const moveTask = (id, status) =>
    commit((p) => {
      const t = p.tasks.find((x) => x.id === id)
      if (t && t.status !== status) {
        t.status = status
        t.updatedAt = new Date().toISOString()
      }
      return p
    })

  const updateTask = (id, patch) =>
    commit((p) => {
      const t = p.tasks.find((x) => x.id === id)
      if (t) Object.assign(t, patch, { updatedAt: new Date().toISOString() })
      return p
    })

  const addTask = (title) =>
    commit((p) => {
      const nums = p.tasks.map((t) => parseInt(String(t.id).replace(/\D/g, ''), 10)).filter((n) => !isNaN(n))
      const id = `T${(nums.length ? Math.max(...nums) : 0) + 1}`
      p.tasks.push({
        id,
        title,
        description: '',
        phase: p.steps[p.steps.length - 1]?.phase || 1,
        featureIds: [],
        priority: 'should',
        acceptance: [],
        status: 'backlog',
        notes: [],
        updatedAt: new Date().toISOString(),
      })
      return p
    })

  const deleteTask = (id) => {
    if (!window.confirm(`Hapus task ${id}?`)) return
    commit((p) => {
      p.tasks = p.tasks.filter((t) => t.id !== id)
      return p
    })
  }

  // ── Render ──

  return (
    <div className="prd-studio">
      {/* Generator */}
      <section className="panel prd-generator">
        <div className="panel-header">
          <span className="panel-title">✦ Apa yang ingin kamu bangun?</span>
          <span
            className={`prd-sync-pill ${sync.available ? 'on' : isLocalDev ? 'off' : 'cloud'}`}
            title={
              isLocalDev
                ? (sync.available ? `Tersimpan di ${sync.file}` : 'Jalankan via npm run dev untuk sync otomatis ke file disk')
                : 'Berjalan di Vercel Cloud: Dokumen tersimpan aman di browser Anda.'
            }
          >
            {isLocalDev
              ? (sync.available ? '● Local MCP Sync aktif' : '○ Sync offline')
              : '☁️ Cloud Mode (Vercel)'}
          </span>
        </div>
        <div className="panel-body">
          <textarea
            className="textarea prd-request"
            rows={3}
            placeholder='Contoh: "buatkan prd membuat aplikasi chat"'
            value={request}
            disabled={loading}
            onChange={(e) => setRequest(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate()
            }}
          />
          <div className="prd-gen-row">
            <input
              className="input"
              placeholder="Tech stack (opsional) – mis. Next.js, Supabase, Socket.io"
              value={techStack}
              disabled={loading}
              onChange={(e) => setTechStack(e.target.value)}
            />
            <button type="button" className="prd-btn primary" disabled={loading || !request.trim()} onClick={() => handleGenerate()}>
              {loading ? 'Generating…' : 'Generate PRD'}
            </button>
          </div>
          <div className="prd-presets">
            {PRESETS.map((p) => (
              <button key={p.title} type="button" className="ai-preset-chip" disabled={loading} onClick={() => setRequest(p.prompt)}>
                {p.title}
              </button>
            ))}
            <label className="ai-preset-chip prd-import">
              Import JSON
              <input type="file" accept="application/json,.json" onChange={handleImport} hidden />
            </label>
            <label className="ai-preset-chip prd-import" title="Upload file PDF untuk dianalisis dan dijadikan PRD">
              📄 Import PDF
              <input type="file" accept="application/pdf,.pdf" onChange={handlePdfUpload} hidden />
            </label>
            <button type="button" className="ai-preset-chip" onClick={() => setShowAdvanced((v) => !v)}>
              {showAdvanced ? '▾' : '▸'} Model
            </button>
          </div>
          {showAdvanced && (
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rekomendasi Model:</span>
                {RECOMMENDED_MODELS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className="ai-preset-chip"
                    style={{
                      background: (modelOverride.trim() || model) === m.id ? 'rgba(137, 87, 229, 0.25)' : undefined,
                      borderColor: (modelOverride.trim() || model) === m.id ? '#8957e5' : undefined,
                      color: (modelOverride.trim() || model) === m.id ? '#d2a8ff' : undefined,
                    }}
                    onClick={() => {
                      setModelOverride(m.id)
                      localStorage.setItem(LS_MODEL_KEY, m.id)
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <input
                className="input"
                placeholder={`Custom Model ID (default: ${model})`}
                value={modelOverride}
                onChange={(e) => {
                  setModelOverride(e.target.value)
                  localStorage.setItem(LS_MODEL_KEY, e.target.value)
                }}
              />
            </div>
          )}
          {loading && (
            <div className="prd-loading">
              <div className="ai-typing-indicator"><span /><span /><span /></div>
              <span>{loadingStage}</span>
            </div>
          )}
          {error && <div className="prd-alert error">⚠ {error}</div>}
        </div>
      </section>

      {!project ? (
        <div className="prd-empty">
          <h3>Belum ada PRD</h3>
          <p>Ketik ide aplikasi di atas. AI akan membuat PRD lengkap, langkah implementasi, desain database, dan Kanban board yang bisa langsung dikerjakan AI coding agent lewat MCP.</p>
        </div>
      ) : (
        <section className="panel prd-result">
          <div className="prd-result-head">
            <div>
              <h2>{project.meta.name}</h2>
              <p>{project.meta.summary}</p>
            </div>
            <div className="prd-progress" title={`${stats.done}/${stats.total} task selesai`}>
              <span>{stats.percent}%</span>
              <div className="prd-progress-track"><div style={{ width: `${stats.percent}%` }} /></div>
              <small>{stats.done}/{stats.total} tasks done</small>
            </div>
          </div>

          <div className="prd-tabs">
            {TABS.map((t) => (
              <button key={t.id} type="button" className={`prd-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                {t.label}
                {t.id === 'kanban' && <span className="prd-tab-count">{stats.total}</span>}
                {t.id === 'prd' && issues.length > 0 && <span className="prd-tab-count warn">{issues.length}</span>}
              </button>
            ))}
            <div className="prd-tabs-spacer" />
            <button type="button" className="prd-btn ghost" onClick={handleClear}>Reset</button>
          </div>

          <div className="prd-tab-body">
            {tab === 'prd' && (
              <PrdTab
                markdown={markdown}
                project={project}
                issues={issues}
                view={prdView}
                setView={setPrdView}
                renderMarkdown={renderMarkdown}
              />
            )}
            {tab === 'steps' && <StepsTab project={project} />}
            {tab === 'db' && <DatabaseTab project={project} />}
            {tab === 'kanban' && (
              <KanbanTab project={project} onMove={moveTask} onUpdate={updateTask} onAdd={addTask} onDelete={deleteTask} />
            )}
            {tab === 'mcp' && <McpTab sync={sync} project={project} onSyncNow={() => pushToServer(project).then((s) => s && setProject(s))} />}
          </div>
        </section>
      )}

      {pdfModalOpen && (
        <PdfImportModal
          extracting={pdfExtracting}
          progress={pdfProgress}
          data={pdfData}
          error={pdfError}
          extra={pdfExtra}
          onExtraChange={setPdfExtra}
          onClose={() => {
            setPdfModalOpen(false)
            setPdfData(null)
            setPdfError(null)
            setPdfExtra('')
          }}
          onUseAsPrompt={(finalPrompt) => {
            setRequest(finalPrompt)
            setPdfModalOpen(false)
            setPdfData(null)
            setPdfExtra('')
          }}
          onDirectGenerate={(finalPrompt) => {
            setPdfModalOpen(false)
            setPdfData(null)
            setPdfExtra('')
            handleGenerate(finalPrompt)
          }}
        />
      )}
    </div>
  )
}

// ─── PRD Tab ───────────────────────────────────────────────────────────────

function PrdTab({ markdown, project, issues, view, setView, renderMarkdown }) {
  const html = useMemo(() => (view === 'preview' ? renderMarkdown(markdownForPreview(markdown)) : ''), [markdown, view, renderMarkdown])
  return (
    <div>
      <div className="prd-toolbar">
        <div className="prd-seg">
          <button type="button" className={view === 'preview' ? 'active' : ''} onClick={() => setView('preview')}>Preview</button>
          <button type="button" className={view === 'raw' ? 'active' : ''} onClick={() => setView('raw')}>Raw Markdown</button>
        </div>
        <div className="prd-toolbar-actions">
          <CopyButton text={markdown} label="Copy Markdown" />
          <button type="button" className="prd-btn" onClick={() => downloadFile('PRD.md', markdown)}>Download PRD.md</button>
          <button type="button" className="prd-btn" onClick={() => downloadFile('project.json', JSON.stringify(project, null, 2), 'application/json')}>Download JSON</button>
        </div>
      </div>
      {issues.length > 0 && (
        <div className="prd-alert warn">
          <strong>Validasi menemukan {issues.length} potensi masalah dari output AI:</strong>
          <ul>{issues.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      )}
      {view === 'preview' ? (
        <div className="prd-markdown ai-message-content" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <textarea className="preview-textarea prd-raw" readOnly value={markdown} spellCheck="false" />
      )}
      <p className="char-count">{markdown.length.toLocaleString()} characters · {markdown.split('\n').length} lines</p>
    </div>
  )
}

// ─── Steps Tab ─────────────────────────────────────────────────────────────

function StepsTab({ project }) {
  const phases = project.steps.length
    ? project.steps
    : [...new Set(project.tasks.map((t) => t.phase))].map((n) => ({ phase: n, title: `Phase ${n}`, description: '' }))
  return (
    <div className="prd-steps">
      {phases.map((s) => {
        const tasks = project.tasks.filter((t) => t.phase === s.phase)
        const done = tasks.filter((t) => t.status === 'done').length
        const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0
        return (
          <div key={s.phase} className={`prd-step ${pct === 100 ? 'complete' : ''}`}>
            <div className="prd-step-num">{pct === 100 ? '✓' : s.phase}</div>
            <div className="prd-step-body">
              <div className="prd-step-head">
                <h4>Phase {s.phase}: {s.title}</h4>
                <span>{done}/{tasks.length}</span>
              </div>
              {s.description && <p>{s.description}</p>}
              <div className="prd-progress-track small"><div style={{ width: `${pct}%` }} /></div>
              <ul>
                {tasks.map((t) => (
                  <li key={t.id} className={`status-${t.status}`}>
                    <span className="prd-task-id">{t.id}</span> {t.title}
                    <span className={`prd-status-dot ${t.status}`}>{STATUS_LABELS[t.status]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Database Tab ──────────────────────────────────────────────────────────

function DatabaseTab({ project }) {
  const [view, setView] = useState('diagram')
  const sql = useMemo(() => buildSqlDdl(project), [project])
  const mermaid = useMemo(() => buildMermaidErd(project), [project])
  const relations = project.database.tables.flatMap((t) =>
    t.columns.filter((c) => c.fk).map((c) => ({ from: `${t.name}.${c.name}`, to: c.fk, fromTable: t.name, toTable: c.fk.split('.')[0] }))
  )
  const [hover, setHover] = useState(null)
  const related = (name) =>
    hover && (hover === name || relations.some((r) => (r.fromTable === hover && r.toTable === name) || (r.toTable === hover && r.fromTable === name)))

  return (
    <div>
      <div className="prd-toolbar">
        <div className="prd-seg">
          <button type="button" className={view === 'diagram' ? 'active' : ''} onClick={() => setView('diagram')}>Diagram</button>
          <button type="button" className={view === 'sql' ? 'active' : ''} onClick={() => setView('sql')}>SQL</button>
          <button type="button" className={view === 'mermaid' ? 'active' : ''} onClick={() => setView('mermaid')}>Mermaid</button>
        </div>
        <div className="prd-toolbar-actions">
          <span className="panel-badge">{project.database.tables.length} tables · {relations.length} relations</span>
          {view === 'sql' && <CopyButton text={sql} label="Copy SQL" />}
          {view === 'mermaid' && <CopyButton text={mermaid} label="Copy Mermaid" />}
        </div>
      </div>

      {view === 'diagram' && (
        <>
          <div className="prd-erd">
            {project.database.tables.map((t) => (
              <div
                key={t.name}
                className={`prd-erd-table ${hover ? (related(t.name) ? 'hl' : 'dim') : ''}`}
                onMouseEnter={() => setHover(t.name)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="prd-erd-title">{t.name}</div>
                {t.description && <div className="prd-erd-desc">{t.description}</div>}
                <table>
                  <tbody>
                    {t.columns.map((c) => (
                      <tr key={c.name}>
                        <td className="col-keys">
                          {c.pk && <span className="key pk">PK</span>}
                          {c.fk && <span className="key fk" title={`→ ${c.fk}`}>FK</span>}
                          {c.unique && !c.pk && <span className="key uk">UQ</span>}
                        </td>
                        <td className="col-name">
                          {c.name}
                          {c.nullable && <span className="nullable">?</span>}
                        </td>
                        <td className="col-type">{c.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          {relations.length > 0 && (
            <div className="prd-relations">
              <h4>Relasi</h4>
              <ul>
                {relations.map((r) => (
                  <li key={r.from}>
                    <code>{r.to}</code> <span>1 ──&lt; N</span> <code>{r.from}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {view === 'sql' && <pre className="prd-code">{sql}</pre>}
      {view === 'mermaid' && (
        <>
          <pre className="prd-code">{mermaid}</pre>
          <p className="field-hint">Paste ke <a href="https://mermaid.live" target="_blank" rel="noreferrer">mermaid.live</a> untuk melihat diagram ERD visual.</p>
        </>
      )}
    </div>
  )
}

// ─── Kanban Tab ────────────────────────────────────────────────────────────

function KanbanTab({ project, onMove, onUpdate, onAdd, onDelete }) {
  const [dragId, setDragId] = useState(null)
  const [overCol, setOverCol] = useState(null)
  const [openId, setOpenId] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [filterPhase, setFilterPhase] = useState('all')

  const phases = [...new Set(project.tasks.map((t) => t.phase))].sort((a, b) => a - b)
  const visible = project.tasks.filter((t) => filterPhase === 'all' || t.phase === Number(filterPhase))
  const openTask = project.tasks.find((t) => t.id === openId)

  return (
    <div>
      <div className="prd-toolbar">
        <div className="prd-gen-row compact">
          <select className="input" value={filterPhase} onChange={(e) => setFilterPhase(e.target.value)}>
            <option value="all">Semua phase</option>
            {phases.map((p) => <option key={p} value={p}>Phase {p}</option>)}
          </select>
        </div>
        <form
          className="prd-gen-row compact"
          onSubmit={(e) => {
            e.preventDefault()
            if (!newTitle.trim()) return
            onAdd(newTitle.trim())
            setNewTitle('')
          }}
        >
          <input className="input" placeholder="Tambah task ke Backlog…" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button type="submit" className="prd-btn" disabled={!newTitle.trim()}>+ Add</button>
        </form>
      </div>

      <div className="prd-kanban">
        {TASK_STATUSES.map((status) => {
          const tasks = visible.filter((t) => t.status === status)
          return (
            <div
              key={status}
              className={`prd-col col-${status} ${overCol === status ? 'over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault()
                setOverCol(status)
              }}
              onDragLeave={() => setOverCol(null)}
              onDrop={(e) => {
                e.preventDefault()
                const id = e.dataTransfer.getData('text/plain') || dragId
                if (id) onMove(id, status)
                setDragId(null)
                setOverCol(null)
              }}
            >
              <div className="prd-col-head">
                <span>{STATUS_LABELS[status]}</span>
                <span className="prd-tab-count">{tasks.length}</span>
              </div>
              <div className="prd-col-body">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className={`prd-card prio-${t.priority} ${dragId === t.id ? 'dragging' : ''}`}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', t.id)
                      setDragId(t.id)
                    }}
                    onDragEnd={() => setDragId(null)}
                    onClick={() => setOpenId(t.id)}
                  >
                    <div className="prd-card-top">
                      <span className="prd-task-id">{t.id}</span>
                      <span className="prd-card-phase">P{t.phase}</span>
                    </div>
                    <div className="prd-card-title">{t.title}</div>
                    <div className="prd-card-meta">
                      <span className={`prio prio-${t.priority}`}>{t.priority}</span>
                      {t.featureIds.slice(0, 3).map((f) => <span key={f} className="feat">{f}</span>)}
                      {t.notes.some((n) => n.by === 'ai') && <span className="ai-note" title="Diupdate oleh AI agent">🤖</span>}
                      {t.notes.length > 0 && <span className="notes">💬 {t.notes.length}</span>}
                    </div>
                  </div>
                ))}
                {!tasks.length && <div className="prd-col-empty">Drop task di sini</div>}
              </div>
            </div>
          )
        })}
      </div>

      {openTask && (
        <TaskModal task={openTask} project={project} onClose={() => setOpenId(null)} onUpdate={onUpdate} onDelete={(id) => { onDelete(id); setOpenId(null) }} />
      )}
    </div>
  )
}

function TaskModal({ task, project, onClose, onUpdate, onDelete }) {
  const [note, setNote] = useState('')
  const [draft, setDraft] = useState({ title: task.title, description: task.description, acceptance: task.acceptance.join('\n') })
  useEffect(() => {
    setDraft({ title: task.title, description: task.description, acceptance: task.acceptance.join('\n') })
  }, [task.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const dirty = draft.title !== task.title || draft.description !== task.description || draft.acceptance !== task.acceptance.join('\n')
  const feats = task.featureIds.map((id) => project.features.find((f) => f.id === id)).filter(Boolean)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="prd-modal-overlay" onClick={onClose}>
      <div className="prd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="prd-modal-head">
          <span className="prd-task-id">{task.id}</span>
          <input className="input prd-modal-title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <button type="button" className="prd-btn ghost" onClick={onClose}>✕</button>
        </div>
        <div className="prd-modal-body">
          <div className="prd-modal-grid">
            <label>
              Status
              <select className="input" value={task.status} onChange={(e) => onUpdate(task.id, { status: e.target.value })}>
                {TASK_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </label>
            <label>
              Priority
              <select className="input" value={task.priority} onChange={(e) => onUpdate(task.id, { priority: e.target.value })}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <label>
              Phase
              <input className="input" type="number" min={1} value={task.phase} onChange={(e) => onUpdate(task.id, { phase: Number(e.target.value) || 1 })} />
            </label>
          </div>
          <label className="prd-modal-field">
            Deskripsi
            <textarea className="textarea" rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </label>
          <label className="prd-modal-field">
            Definition of Done (1 baris = 1 kriteria)
            <textarea className="textarea" rows={4} value={draft.acceptance} onChange={(e) => setDraft({ ...draft, acceptance: e.target.value })} />
          </label>
          {dirty && (
            <button
              type="button"
              className="prd-btn primary"
              onClick={() =>
                onUpdate(task.id, {
                  title: draft.title.trim() || task.title,
                  description: draft.description,
                  acceptance: draft.acceptance.split('\n').map((x) => x.trim()).filter(Boolean),
                })
              }
            >
              Simpan perubahan
            </button>
          )}

          {feats.length > 0 && (
            <div className="prd-modal-section">
              <h5>Fitur terkait</h5>
              {feats.map((f) => (
                <div key={f.id} className="prd-feat">
                  <strong>{f.id}: {f.name}</strong>
                  <ol>
                    {f.acceptanceCriteria.map((a, i) => (
                      <li key={i}>{a.given || a.when ? <><b>Given</b> {a.given} <b>When</b> {a.when} <b>Then</b> {a.then}</> : a.then}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}

          <div className="prd-modal-section">
            <h5>Notes / Log</h5>
            {task.notes.length === 0 && <p className="field-hint">Belum ada catatan. AI agent akan menambahkan catatan di sini saat mengerjakan task via MCP.</p>}
            <ul className="prd-notes">
              {task.notes.map((n, i) => (
                <li key={i} className={n.by}>
                  <span>{n.by === 'ai' ? '🤖 AI' : '👤 You'} · {new Date(n.at).toLocaleString('id-ID')}</span>
                  <p>{n.text}</p>
                </li>
              ))}
            </ul>
            <form
              className="prd-gen-row"
              onSubmit={(e) => {
                e.preventDefault()
                if (!note.trim()) return
                onUpdate(task.id, { notes: [...task.notes, { at: new Date().toISOString(), by: 'user', text: note.trim() }] })
                setNote('')
              }}
            >
              <input className="input" placeholder="Tambah catatan…" value={note} onChange={(e) => setNote(e.target.value)} />
              <button type="submit" className="prd-btn" disabled={!note.trim()}>Add</button>
            </form>
          </div>
        </div>
        <div className="prd-modal-foot">
          <button type="button" className="prd-btn danger" onClick={() => onDelete(task.id)}>Hapus task</button>
        </div>
      </div>
    </div>
  )
}

// ─── MCP Tab ───────────────────────────────────────────────────────────────

const MCP_TOOLS = [
  ['get_prd', 'Baca seluruh PRD (markdown)'],
  ['get_db_schema', 'ERD Mermaid + SQL DDL + JSON tabel'],
  ['list_tasks', 'Daftar task (filter status / phase)'],
  ['get_task', 'Detail 1 task + acceptance criteria fitur terkait'],
  ['get_next_task', 'Task berikutnya yang harus dikerjakan'],
  ['update_task_status', 'Pindahkan kartu Kanban (+ catatan)'],
  ['add_task_note', 'Tambah catatan implementasi'],
]

function McpTab({ sync, onSyncNow }) {
  const serverPath = isLocalDev && sync.mcpServer
    ? sync.mcpServer.replace(/\\/g, '/')
    : './mcp/server.js'
  const prdFile = isLocalDev && sync.file ? sync.file.replace(/\\/g, '/') : ''
  const config = JSON.stringify(
    {
      mcpServers: {
        'prd-studio': {
          command: 'node',
          args: [serverPath],
          ...(prdFile ? { env: { PRD_FILE: prdFile } } : {})
        }
      }
    },
    null,
    2
  )
  const agentPrompt =
    'Gunakan MCP prd-studio. Panggil get_next_task, set statusnya ke in_progress, implementasikan sesuai PRD (patuhi Out of Scope & Database Design), lalu set ke done dengan catatan file yang diubah. Ulangi sampai semua task selesai.'

  return (
    <div className="prd-mcp">
      <div className={`prd-alert ${sync.available && isLocalDev ? 'ok' : 'warn'}`}>
        {isLocalDev && sync.available ? (
          <>
            <strong>Sync lokal aktif.</strong> PRD tersimpan di <code>{prdFile}</code> (+ <code>PRD.md</code> di folder yang sama). Kanban otomatis refresh tiap 3 detik saat AI agent mengupdate task.
            {sync.lastSync && <> Terakhir sync: {sync.lastSync.toLocaleTimeString('id-ID')}.</>}
          </>
        ) : (
          <>
            <strong>Mode Cloud / Multi-User:</strong> PRD tersimpan aman di browser Anda. Agar AI agent (Cursor / Claude Desktop) di laptop Anda bisa membaca PRD ini:
            <ol style={{ marginTop: '6px', marginLeft: '18px' }}>
              <li>Klik tab <b>PRD</b> → <b>Download JSON</b> (simpan sebagai <code>project.json</code> di root proyek coding Anda).</li>
              <li>Jalankan MCP server di bawah ini. MCP akan otomatis mendeteksi <code>project.json</code> di folder proyek Anda.</li>
            </ol>
          </>
        )}
      </div>
      {sync.available && (
        <button type="button" className="prd-btn primary" onClick={onSyncNow}>Sync ke MCP sekarang</button>
      )}

      <h4>1. Tambahkan MCP server ke AI agent</h4>
      <p className="field-hint">
        <b>Cursor:</b> <code>.cursor/mcp.json</code> · <b>Claude Desktop:</b> <code>claude_desktop_config.json</code> · <b>Antigravity / lainnya:</b> menu MCP servers → edit config.
      </p>
      <div className="prd-code-wrap">
        <CopyButton text={config} label="Copy config" className="float" />
        <pre className="prd-code">{config}</pre>
      </div>

      <h4>2. Perintahkan AI agent</h4>
      <div className="prd-code-wrap">
        <CopyButton text={agentPrompt} label="Copy prompt" className="float" />
        <pre className="prd-code wrap">{agentPrompt}</pre>
      </div>

      <h4>3. Tools yang tersedia</h4>
      <table className="markdown-table prd-tools-table">
        <tbody>
          {MCP_TOOLS.map(([name, desc]) => (
            <tr key={name}>
              <td><code>{name}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── PDF Import Modal ──────────────────────────────────────────────────────

function PdfImportModal({
  extracting,
  progress,
  data,
  error,
  extra,
  onExtraChange,
  onClose,
  onUseAsPrompt,
  onDirectGenerate,
}) {
  const [editedText, setEditedText] = useState('')

  useEffect(() => {
    if (data?.text) {
      setEditedText(data.text)
    }
  }, [data?.text])

  const getCombinedPrompt = () => {
    const coreText = editedText.trim()
    const extraText = extra.trim()
    if (extraText) {
      return `Dokumen Spesifikasi:\n\n${coreText}\n\nInstruksi Tambahan:\n${extraText}`
    }
    return `Dokumen Spesifikasi:\n\n${coreText}`
  }

  return (
    <div className="prd-modal-overlay" onClick={onClose}>
      <div className="prd-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        <div className="prd-modal-head">
          <span className="prd-task-id">PDF</span>
          <span className="prd-modal-title" style={{ flex: 1, marginLeft: '8px' }}>
            {data ? `Ekstraksi: ${data.fileName}` : 'Memproses File PDF...'}
          </span>
          <button type="button" className="prd-btn ghost" onClick={onClose}>✕</button>
        </div>

        <div className="prd-modal-body">
          {extracting && (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div className="ai-typing-indicator" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                <span /><span /><span />
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {progress && progress.total > 0
                  ? `Membaca halaman ${progress.current} dari ${progress.total}...`
                  : 'Mempersiapkan dokumen PDF...'}
              </p>
              <p className="field-hint">Seluruh teks diekstrak secara lokal di browser Anda (tanpa upload ke server luar).</p>
            </div>
          )}

          {error && (
            <div className="prd-alert error">
              <strong>Gagal membaca PDF:</strong> {error}
            </div>
          )}

          {!extracting && data && (
            <>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="prd-pdf-badge">
                  📄 <strong>{data.fileName}</strong>
                </span>
                <span className="prd-pdf-badge">
                  📑 <strong>{data.numPages}</strong> Halaman
                </span>
                <span className="prd-pdf-badge">
                  🔤 <strong>{data.charCount.toLocaleString()}</strong> Karakter
                </span>
              </div>

              <label className="prd-modal-field" style={{ marginTop: '6px' }}>
                <span>Hasil Ekstraksi Teks (bisa Anda edit/bersihkan):</span>
                <textarea
                  className="textarea prd-pdf-preview-box"
                  rows={10}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  placeholder="Isi teks PDF..."
                  spellCheck="false"
                />
              </label>

              <label className="prd-modal-field">
                <span>Instruksi Khusus / Modifikasi (opsional):</span>
                <input
                  className="input"
                  placeholder='Contoh: "Fokus ke MVP saja, gunakan PostgreSQL & Next.js"'
                  value={extra}
                  onChange={(e) => onExtraChange(e.target.value)}
                />
              </label>
            </>
          )}
        </div>

        {!extracting && data && (
          <div className="prd-modal-foot prd-pdf-actions">
            <button
              type="button"
              className="prd-btn"
              onClick={() => onUseAsPrompt(getCombinedPrompt())}
            >
              Salin ke Form Input
            </button>
            <button
              type="button"
              className="prd-btn primary"
              disabled={!editedText.trim()}
              onClick={() => onDirectGenerate(getCombinedPrompt())}
            >
              🚀 Langsung Generate PRD & Kanban
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

