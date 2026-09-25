import { useState, useCallback } from 'react'

// ─── Inline SVG Icons ──────────────────────────────────────────────────────

const WorktoolsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const GitLabIcon = () => (
  <svg viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
    <path d="M282.83 170.73l-.27-.69-26.14-68.22a6.81 6.81 0 00-2.69-3.24 7 7 0 00-8 .43 7 7 0 00-2.32 3.52l-17.65 54H154.29l-17.65-54a6.86 6.86 0 00-2.32-3.52 7 7 0 00-8-.43 6.85 6.85 0 00-2.69 3.24L97.44 170l-.26.69a48.54 48.54 0 0016.1 56.1l.09.07.24.17 39.82 29.82 19.7 14.91 12 9.06a8.07 8.07 0 009.66 0l12-9.06 19.7-14.91 40.06-30 .1-.08a48.56 48.56 0 0016.08-56.04z" />
  </svg>
)

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
)

const StepsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

const TableIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
)

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ResetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
)

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

// ─── Defaults & Markdown Generator for MR ──────────────────────────────────

const DEFAULTS = {
  threadLink: 'No Project Link specified',
  deploymentSteps: 'No deployment steps specified',
  tablesToBackup: 'No tables to backup specified',
}

function generateMarkdown({ threadLink, deploymentSteps, tablesToBackup }) {
  const formatBullets = (text, defaultText) => {
    const trimmed = text.trim()
    if (!trimmed) return `* ${defaultText}`
    const lines = trimmed.split('\n').filter(l => l.trim())
    return lines.map(l => `* ${l.trim()}`).join('\n')
  }

  const threadLinkValue = threadLink.trim()
    ? `* ${threadLink.trim()}`
    : `* ${DEFAULTS.threadLink}`

  const deploymentValue = formatBullets(deploymentSteps, DEFAULTS.deploymentSteps)
  const tablesValue = formatBullets(tablesToBackup, DEFAULTS.tablesToBackup)

  return [
    'Nyra Project Link',
    '',
    threadLinkValue,
    '',
    'Deployment Steps',
    '',
    deploymentValue,
    '',
    'Tables Need To Backup',
    '',
    tablesValue,
  ].join('\n')
}

const INITIAL_STATE = {
  threadLink: '',
  deploymentSteps: '',
  tablesToBackup: '',
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm] = useState(INITIAL_STATE)
  const [copied, setCopied] = useState(false)

  const markdown = generateMarkdown(form)

  const handleChange = useCallback((field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }, [])

  const handleReset = useCallback(() => {
    setForm(INITIAL_STATE)
    setCopied(false)
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      const el = document.createElement('textarea')
      el.value = markdown
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }, [markdown])

  return (
    <div className="app-container">

      {/* ── Overlay for Mobile ── */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-icon">
            <WorktoolsIcon />
          </div>
          <div>
            <h2 className="brand-title">Worktools</h2>
            <p className="brand-subtitle">Developer Utilities</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Git & Code Tools</div>
          <ul className="nav-list">
            <li>
              <button
                type="button"
                className="nav-item-btn active"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon"><GitLabIcon /></span>
                GitLab MR Generator
                <span className="nav-badge">Active</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          GG AI &copy; {new Date().getFullYear()}
        </div>
      </aside>

      {/* ── Main Wrapper ── */}
      <div className="main-wrapper">

        {/* ── Top Header ── */}
        <header className="header">
          <div className="header-left">
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Toggle Navigation Menu"
            >
              <MenuIcon />
            </button>
            <div className="header-title-group">
              <div className="header-icon">
                <GitLabIcon />
              </div>
              <div className="header-text">
                <h1>MR Description Generator</h1>
                <p>Generate GitLab Merge Request descriptions instantly</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main Content Body ── */}
        <main className="main-content">
          <div className="workspace">

            {/* ── Left: Form Panel ── */}
            <section className="panel">
              <div className="panel-header">
                <span className="panel-title">
                  <EditIcon />
                  Input Fields
                </span>
                <span className="panel-badge">All optional</span>
              </div>

              <div className="panel-body">
                {/* Project Link */}
                <div className="field-group">
                  <label className="field-label" htmlFor="threadLink">
                    <span className="field-label-icon"><LinkIcon /></span>
                    Nyra Project Link
                    <span className="field-optional">optional</span>
                  </label>
                  <input
                    id="threadLink"
                    type="text"
                    className="input"
                    placeholder="https://..."
                    value={form.threadLink}
                    onChange={handleChange('threadLink')}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <p className="field-hint">
                    Paste the Nyra thread URL related to this MR.
                  </p>
                </div>

                <div className="section-divider" />

                {/* Deployment Steps */}
                <div className="field-group">
                  <label className="field-label" htmlFor="deploymentSteps">
                    <span className="field-label-icon"><StepsIcon /></span>
                    Deployment Steps
                    <span className="field-optional">optional</span>
                  </label>
                  <textarea
                    id="deploymentSteps"
                    className="textarea"
                    placeholder={`Run migration\nUpdate .env config\nRestart queue workers`}
                    value={form.deploymentSteps}
                    onChange={handleChange('deploymentSteps')}
                    spellCheck="false"
                    rows={5}
                  />
                  <p className="field-hint">
                    Each line will be converted into a separate bullet point.
                  </p>
                </div>

                <div className="section-divider" />

                {/* Tables to backup */}
                <div className="field-group">
                  <label className="field-label" htmlFor="tablesToBackup">
                    <span className="field-label-icon"><TableIcon /></span>
                    Tables Need To Backup
                    <span className="field-optional">optional</span>
                  </label>
                  <textarea
                    id="tablesToBackup"
                    className="textarea"
                    placeholder={`users\norders\norder_items`}
                    value={form.tablesToBackup}
                    onChange={handleChange('tablesToBackup')}
                    spellCheck="false"
                    rows={4}
                  />
                  <p className="field-hint">
                    List database tables that need to be backed up before deployment.
                  </p>
                </div>

                {/* Actions */}
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-reset"
                    onClick={handleReset}
                    title="Clear all fields"
                  >
                    <ResetIcon />
                    Reset
                  </button>
                </div>
              </div>
            </section>

            {/* ── Right: Preview Panel ── */}
            <section className="panel">
              <div className="panel-header">
                <span className="panel-title">
                  <EyeIcon />
                  Markdown Preview
                </span>
                <span className="panel-badge">Live</span>
              </div>

              <div className="panel-body">
                <textarea
                  className="preview-textarea"
                  readOnly
                  value={markdown}
                  aria-label="Markdown preview output"
                  spellCheck="false"
                />
                <p className="char-count">{markdown.length} characters</p>

                <div className="copy-btn-wrapper">
                  <button
                    type="button"
                    className={`btn btn-copy${copied ? ' copied' : ''}`}
                    onClick={handleCopy}
                    title="Copy markdown to clipboard"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>

                  {copied && (
                    <span className="copied-badge">
                      <CheckIcon />
                      Copied to clipboard
                    </span>
                  )}
                </div>
              </div>
            </section>

          </div>
        </main>

      </div>
    </div>
  )
}
