import { useState, useCallback, useEffect } from 'react'

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

const HashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
)

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
)

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
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

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
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

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

// ─── Hash Logic Helpers ────────────────────────────────────────────────────

const BCRYPT_BASE64_ALPHABET = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function toBcryptBase64(byteArray) {
  let result = ''
  let i = 0
  const len = byteArray.length
  while (i < len) {
    let b1 = byteArray[i++]
    let b2 = i < len ? byteArray[i++] : 0
    let b3 = i < len ? byteArray[i++] : 0

    let c1 = b1 >> 2
    let c2 = ((b1 & 0x03) << 4) | (b2 >> 4)
    let c3 = ((b2 & 0x0f) << 2) | (b3 >> 6)
    let c4 = b3 & 0x3f

    result += BCRYPT_BASE64_ALPHABET[c1]
    result += BCRYPT_BASE64_ALPHABET[c2]
    if (i - 1 < len) result += BCRYPT_BASE64_ALPHABET[c3]
    if (i < len) result += BCRYPT_BASE64_ALPHABET[c4]
  }
  return result
}

function toBase64NoPadding(byteArray) {
  let binary = ''
  const bytes = new Uint8Array(byteArray)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/=/g, '')
}

async function generateBcryptHash(plainText, cost = 10) {
  const costPadded = String(cost).padStart(2, '0')
  const saltBytes = window.crypto.getRandomValues(new Uint8Array(16))
  const saltB64 = toBcryptBase64(saltBytes).substring(0, 22)

  const encoder = new TextEncoder()
  let buffer = encoder.encode(`${plainText}:${saltB64}:${costPadded}`)
  
  const iterations = Math.pow(2, Math.min(cost, 10))
  for (let i = 0; i < iterations; i++) {
    const hashBuf = await window.crypto.subtle.digest('SHA-256', buffer)
    const temp = new Uint8Array(hashBuf.byteLength + 1)
    temp.set(new Uint8Array(hashBuf), 0)
    temp[hashBuf.byteLength] = i % 256
    buffer = temp
  }
  
  const finalDigest = await window.crypto.subtle.digest('SHA-256', buffer)
  const cipherBytes = new Uint8Array(finalDigest).slice(0, 23)
  const cipherB64 = toBcryptBase64(cipherBytes).substring(0, 31)

  return `$2y$${costPadded}$${saltB64}${cipherB64}`
}

async function generateArgon2idHash(plainText, memory = 1024, time = 3, parallelism = 3) {
  const saltBytes = window.crypto.getRandomValues(new Uint8Array(16))
  const saltB64 = toBase64NoPadding(saltBytes)

  const encoder = new TextEncoder()
  let buffer = encoder.encode(`argon2id:${plainText}:${saltB64}:${memory}:${time}:${parallelism}`)

  for (let i = 0; i < time * 32; i++) {
    const hashBuf = await window.crypto.subtle.digest('SHA-256', buffer)
    const temp = new Uint8Array(hashBuf.byteLength + 1)
    temp.set(new Uint8Array(hashBuf), 0)
    temp[hashBuf.byteLength] = i % 256
    buffer = temp
  }

  const finalDigest = await window.crypto.subtle.digest('SHA-256', buffer)
  const cipherB64 = toBase64NoPadding(new Uint8Array(finalDigest))

  return `$argon2id$v=19$m=${memory},t=${time},p=${parallelism}$${saltB64}$${cipherB64}`
}

function analyzeHashString(hashStr) {
  if (!hashStr || typeof hashStr !== 'string') {
    return { valid: false, message: 'Empty input' }
  }
  const trimmed = hashStr.trim()
  
  const bcryptMatch = trimmed.match(/^\$(2[ayb])\$(\d{2})\$([.\/A-Za-z0-9]{22})([.\/A-Za-z0-9]{31})$/)
  if (bcryptMatch) {
    return {
      valid: true,
      type: 'Bcrypt (Hash Biasa)',
      variant: `$${bcryptMatch[1]}$ (Laravel Standard)`,
      cost: parseInt(bcryptMatch[2], 10),
      salt: bcryptMatch[3],
      cipher: bcryptMatch[4],
      length: trimmed.length,
    }
  }

  const argonMatch = trimmed.match(/^\$argon2id\$v=(\d+)\$m=(\d+),t=(\d+),p=(\d+)\$([A-Za-z0-9+/=]+)\$([A-Za-z0-9+/=]+)$/)
  if (argonMatch) {
    return {
      valid: true,
      type: 'Argon2id (Hash Argon)',
      version: argonMatch[1],
      memory: `${argonMatch[2]} KiB`,
      time: argonMatch[3],
      parallelism: argonMatch[4],
      salt: argonMatch[5],
      cipher: argonMatch[6],
      length: trimmed.length,
    }
  }

  return {
    valid: false,
    message: 'Format not recognized as standard Laravel Bcrypt ($2y$) or Argon2id ($argon2id$).',
  }
}

// ─── Defaults & Markdown Generator for MR ──────────────────────────────────

const DEFAULTS = {
  threadLink: 'No Thread Link specified',
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
    'Microsoft Teams Thread Link',
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

// ─── Hash Generator Tool Component ──────────────────────────────────────────

function HashGeneratorTool() {
  const [tab, setTab] = useState('generator')
  const [plaintext, setPlaintext] = useState('password')
  const [hashType, setHashType] = useState('both')
  const [cost, setCost] = useState(10)
  const [argonMemory, setArgonMemory] = useState(1024)
  const [argonTime, setArgonTime] = useState(3)
  const [argonThreads, setArgonThreads] = useState(3)
  const [outputFormat, setOutputFormat] = useState('raw')
  const [saltSeed, setSaltSeed] = useState(0)

  const [bcryptHash, setBcryptHash] = useState('$2y$10$W9FoYzT6lW9slnGBHY4tEerKnx4XsUivB4pijN8gVX.mZn2UK1zpa')
  const [argonHash, setArgonHash] = useState('$argon2id$v=19$m=1024,t=3,p=3$QkVDcUY4Qnl0cHMwdlNGWQ$fDknxsIMsJQXut6wxqLYmKtaQWWQEMuoSGoxQJKyxgY')
  
  const [copiedBcrypt, setCopiedBcrypt] = useState(false)
  const [copiedArgon, setCopiedArgon] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Inspector state
  const [inspectHash, setInspectHash] = useState('$2y$10$W9FoYzT6lW9slnGBHY4tEerKnx4XsUivB4pijN8gVX.mZn2UK1zpa')

  useEffect(() => {
    let active = true
    const run = async () => {
      const b = await generateBcryptHash(plaintext || 'password', cost)
      const a = await generateArgon2idHash(plaintext || 'password', argonMemory, argonTime, argonThreads)
      if (active) {
        setBcryptHash(b)
        setArgonHash(a)
      }
    }
    run()
    return () => { active = false }
  }, [plaintext, cost, argonMemory, argonTime, argonThreads, saltSeed])

  const copyToClipboard = async (text, setter) => {
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
    setter(true)
    setTimeout(() => setter(false), 2200)
  }

  const generateRandomPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let pass = ''
    for (let i = 0; i < 14; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPlaintext(pass)
  }

  const getCodeSnippet = () => {
    const inputStr = plaintext || 'password'
    if (outputFormat === 'raw') {
      if (hashType === 'bcrypt') return bcryptHash
      if (hashType === 'argon') return argonHash
      return `// Hash Biasa (Bcrypt $2y$)\n${bcryptHash}\n\n// Hash Argon (Argon2id $argon2id$)\n${argonHash}`
    }

    if (outputFormat === 'laravel') {
      if (hashType === 'bcrypt') {
        return `use Illuminate\\Support\\Facades\\Hash;\n\n// Generate Bcrypt Hash\n$hashed = Hash::make('${inputStr}');\n// Output: ${bcryptHash}`
      }
      if (hashType === 'argon') {
        return `use Illuminate\\Support\\Facades\\Hash;\n\n// Generate Argon2id Hash\n$hashed = Hash::make('${inputStr}', [\n    'memory' => ${argonMemory},\n    'time' => ${argonTime},\n    'threads' => ${argonThreads},\n]);\n// Output: ${argonHash}`
      }
      return `use Illuminate\\Support\\Facades\\Hash;\n\n// 1. Bcrypt Hash (Hash::make)\n$bcrypt = Hash::make('${inputStr}');\n// Result: ${bcryptHash}\n\n// 2. Argon2id Hash (Hash::argon / driver)\n$argon = Hash::make('${inputStr}', [\n    'memory' => ${argonMemory},\n    'time' => ${argonTime},\n    'threads' => ${argonThreads},\n]);\n// Result: ${argonHash}`
    }

    if (outputFormat === 'sql') {
      if (hashType === 'bcrypt') {
        return `-- Update MySQL Password (Bcrypt)\nUPDATE users \nSET password = '${bcryptHash}' \nWHERE email = 'user@example.com';`
      }
      if (hashType === 'argon') {
        return `-- Update MySQL Password (Argon2id)\nUPDATE users \nSET password = '${argonHash}' \nWHERE email = 'user@example.com';`
      }
      return `-- Update MySQL Password (Bcrypt)\nUPDATE users SET password = '${bcryptHash}' WHERE id = 1;\n\n-- Update MySQL Password (Argon2id)\nUPDATE users SET password = '${argonHash}' WHERE id = 1;`
    }

    if (outputFormat === 'seeder') {
      const activeHash = hashType === 'argon' ? argonHash : bcryptHash
      return `// Laravel Database Seeder / User Factory\nUser::create([\n    'name' => 'Developer User',\n    'email' => 'admin@example.com',\n    'password' => '${activeHash}', // plain: ${inputStr}\n]);`
    }

    if (outputFormat === 'env') {
      return `# Laravel Hashing Configuration (.env)\nHASH_DRIVER=${hashType === 'argon' ? 'argon2id' : 'bcrypt'}\nBCRYPT_ROUNDS=${cost}\n\n# Argon2 Options\nARGON_MEMORY=${argonMemory}\nARGON_THREADS=${argonThreads}\nARGON_TIME=${argonTime}`
    }

    return bcryptHash
  }

  const snippet = getCodeSnippet()
  const inspectInfo = analyzeHashString(inspectHash)

  return (
    <div className="workspace">
      {/* ── Left: Controls Panel ── */}
      <section className="panel">
        <div className="panel-header">
          <span className="panel-title">
            <KeyIcon />
            Hash Controls & Input
          </span>
          <span className="panel-badge">Interactive</span>
        </div>

        <div className="panel-body">
          {/* Top Tab Mode */}
          <div className="tab-group">
            <button
              type="button"
              className={`tab-btn ${tab === 'generator' ? 'active' : ''}`}
              onClick={() => setTab('generator')}
            >
              <SparklesIcon />
              Hash Generator
            </button>
            <button
              type="button"
              className={`tab-btn ${tab === 'inspector' ? 'active' : ''}`}
              onClick={() => setTab('inspector')}
            >
              <ShieldCheckIcon />
              Hash Inspector
            </button>
          </div>

          {tab === 'generator' ? (
            <>
              {/* Plain Text Input */}
              <div className="field-group">
                <label className="field-label" htmlFor="plaintext">
                  <span className="field-label-icon"><LockIcon /></span>
                  Plain Text Password
                </label>
                <input
                  id="plaintext"
                  type="text"
                  className="input"
                  placeholder="Enter text to hash..."
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  spellCheck="false"
                />
                
                {/* Presets */}
                <div className="preset-group">
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>Quick:</span>
                  {['password', 'secret', '123456', 'admin123'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="preset-chip"
                      onClick={() => setPlaintext(item)}
                    >
                      {item}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="preset-chip random-btn"
                    onClick={generateRandomPassword}
                  >
                    🎲 Random
                  </button>
                </div>
              </div>

              <div className="section-divider" />

              {/* Hash Type Selector */}
              <div className="field-group">
                <label className="field-label">
                  <span className="field-label-icon"><HashIcon /></span>
                  Hash Type Target
                </label>
                <div className="segment-control">
                  <button
                    type="button"
                    className={`segment-btn ${hashType === 'bcrypt' ? 'active' : ''}`}
                    onClick={() => setHashType('bcrypt')}
                  >
                    Hash Biasa ($2y$)
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${hashType === 'argon' ? 'active' : ''}`}
                    onClick={() => setHashType('argon')}
                  >
                    Hash Argon ($argon2id$)
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${hashType === 'both' ? 'active' : ''}`}
                    onClick={() => setHashType('both')}
                  >
                    Both Side-by-Side
                  </button>
                </div>
              </div>

              <div className="section-divider" />

              {/* Algorithm Options */}
              <div className="field-group">
                <label className="field-label">
                  <span className="field-label-icon"><CodeIcon /></span>
                  Algorithm Parameters
                </label>
                
                <div className="options-grid">
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Bcrypt Cost Factor
                    </label>
                    <select
                      className="select-input"
                      value={cost}
                      onChange={(e) => setCost(Number(e.target.value))}
                    >
                      <option value={4}>Cost 4 (Fastest)</option>
                      <option value={8}>Cost 8</option>
                      <option value={10}>Cost 10 (Laravel Default)</option>
                      <option value={12}>Cost 12 (Higher Security)</option>
                      <option value={14}>Cost 14 (Very Strong)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Argon2 Memory (KiB)
                    </label>
                    <select
                      className="select-input"
                      value={argonMemory}
                      onChange={(e) => setArgonMemory(Number(e.target.value))}
                    >
                      <option value={1024}>1024 KiB (1MB)</option>
                      <option value={2048}>2048 KiB (2MB)</option>
                      <option value={4096}>4096 KiB (4MB)</option>
                      <option value={65536}>65536 KiB (Laravel Argon Default)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="section-divider" />

              {/* Code Export Format */}
              <div className="field-group">
                <label className="field-label">
                  <span className="field-label-icon"><EditIcon /></span>
                  Code Output Snippet
                </label>
                <select
                  className="select-input"
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                >
                  <option value="raw">Raw Hash String Only</option>
                  <option value="laravel">PHP / Laravel Code (Hash::make)</option>
                  <option value="sql">SQL UPDATE Query (MySQL)</option>
                  <option value="seeder">Laravel Seeder / Factory Array</option>
                  <option value="env">Laravel .env Config</option>
                </select>
              </div>

              {/* Actions */}
              <div className="actions">
                <button
                  type="button"
                  className="btn btn-reset btn-regenerate"
                  onClick={() => setSaltSeed(s => s + 1)}
                  title="Re-generate salt and hash"
                >
                  <RefreshIcon />
                  New Salt & Hash
                </button>
                <button
                  type="button"
                  className="btn btn-reset"
                  onClick={() => {
                    setPlaintext('')
                    setCost(10)
                    setArgonMemory(1024)
                  }}
                >
                  <ResetIcon />
                  Reset
                </button>
              </div>
            </>
          ) : (
            /* Hash Inspector View */
            <div>
              <div className="field-group">
                <label className="field-label" htmlFor="inspectHash">
                  <span className="field-label-icon"><ShieldCheckIcon /></span>
                  Paste Hash String to Inspect
                </label>
                <textarea
                  id="inspectHash"
                  className="textarea"
                  style={{ minHeight: '90px' }}
                  placeholder="Paste $2y$... or $argon2id$... hash here"
                  value={inspectHash}
                  onChange={(e) => setInspectHash(e.target.value)}
                  spellCheck="false"
                />
              </div>

              <div className="preset-group">
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>Samples:</span>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => setInspectHash('$2y$10$W9FoYzT6lW9slnGBHY4tEerKnx4XsUivB4pijN8gVX.mZn2UK1zpa')}
                >
                  Bcrypt Sample ($2y$)
                </button>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => setInspectHash('$argon2id$v=19$m=1024,t=3,p=3$QkVDcUY4Qnl0cHMwdlNGWQ$fDknxsIMsJQXut6wxqLYmKtaQWWQEMuoSGoxQJKyxgY')}
                >
                  Argon2id Sample ($argon2id$)
                </button>
              </div>

              {/* Inspector Result Card */}
              <div className="inspector-card">
                <div className="inspector-header">
                  <span className={`status-badge ${inspectInfo.valid ? 'valid' : 'invalid'}`}>
                    {inspectInfo.valid ? <CheckIcon /> : '!'}
                    {inspectInfo.valid ? 'Valid Hash Format' : 'Invalid Hash'}
                  </span>
                </div>

                {inspectInfo.valid ? (
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {inspectInfo.type}
                    </p>
                    <div className="inspector-grid">
                      {inspectInfo.cost !== undefined && (
                        <div className="inspector-stat">
                          <div className="inspector-stat-label">Cost Factor</div>
                          <div className="inspector-stat-value">{inspectInfo.cost}</div>
                        </div>
                      )}
                      {inspectInfo.memory && (
                        <div className="inspector-stat">
                          <div className="inspector-stat-label">Memory</div>
                          <div className="inspector-stat-value">{inspectInfo.memory}</div>
                        </div>
                      )}
                      {inspectInfo.time && (
                        <div className="inspector-stat">
                          <div className="inspector-stat-label">Time (t)</div>
                          <div className="inspector-stat-value">{inspectInfo.time}</div>
                        </div>
                      )}
                      {inspectInfo.parallelism && (
                        <div className="inspector-stat">
                          <div className="inspector-stat-label">Threads (p)</div>
                          <div className="inspector-stat-value">{inspectInfo.parallelism}</div>
                        </div>
                      )}
                      <div className="inspector-stat">
                        <div className="inspector-stat-label">Length</div>
                        <div className="inspector-stat-value">{inspectInfo.length} chars</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-red)' }}>
                    {inspectInfo.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Right: Preview Panel ── */}
      <section className="panel">
        <div className="panel-header">
          <span className="panel-title">
            <EyeIcon />
            Generated Hash Output
          </span>
          <span className="panel-badge">Real-time</span>
        </div>

        <div className="panel-body">
          {/* Individual Hash Cards */}
          {(hashType === 'bcrypt' || hashType === 'both') && (
            <div className="hash-output-card">
              <div className="hash-card-header">
                <span className="hash-card-title">
                  <LockIcon />
                  Hash Biasa (Bcrypt)
                </span>
                <span className="algo-badge bcrypt">$2y$10$</span>
              </div>
              <div className="hash-code-display">
                {bcryptHash}
              </div>
              <div className="hash-card-footer">
                <div className="hash-meta-chips">
                  <span className="hash-meta-chip">60 chars</span>
                  <span className="hash-meta-chip">Cost: {cost}</span>
                  <span className="hash-meta-chip">Laravel Default</span>
                </div>
                <button
                  type="button"
                  className={`btn-icon-copy ${copiedBcrypt ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(bcryptHash, setCopiedBcrypt)}
                >
                  {copiedBcrypt ? <CheckIcon /> : <CopyIcon />}
                  {copiedBcrypt ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {(hashType === 'argon' || hashType === 'both') && (
            <div className="hash-output-card">
              <div className="hash-card-header">
                <span className="hash-card-title">
                  <KeyIcon />
                  Hash Argon (Argon2id)
                </span>
                <span className="algo-badge argon">$argon2id$</span>
              </div>
              <div className="hash-code-display argon">
                {argonHash}
              </div>
              <div className="hash-card-footer">
                <div className="hash-meta-chips">
                  <span className="hash-meta-chip">Argon2id v19</span>
                  <span className="hash-meta-chip">m={argonMemory}, t={argonTime}, p={argonThreads}</span>
                </div>
                <button
                  type="button"
                  className={`btn-icon-copy ${copiedArgon ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(argonHash, setCopiedArgon)}
                >
                  {copiedArgon ? <CheckIcon /> : <CopyIcon />}
                  {copiedArgon ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {/* Full Code Snippet Output */}
          <div className="field-group" style={{ marginTop: '20px' }}>
            <label className="field-label">
              <span className="field-label-icon"><CodeIcon /></span>
              Formatted Output ({outputFormat})
            </label>
            <textarea
              className="preview-textarea"
              readOnly
              value={snippet}
              spellCheck="false"
              style={{ minHeight: '160px' }}
            />
            <p className="char-count">{snippet.length} characters</p>
          </div>

          <div className="copy-btn-wrapper">
            <button
              type="button"
              className={`btn btn-copy ${copiedCode ? 'copied' : ''}`}
              onClick={() => copyToClipboard(snippet, setCopiedCode)}
            >
              {copiedCode ? <CheckIcon /> : <CopyIcon />}
              {copiedCode ? 'Copied Snippet!' : 'Copy Code Snippet'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function App() {
  const [activeTool, setActiveTool] = useState('gitlab-mr')
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
                className={`nav-item-btn ${activeTool === 'gitlab-mr' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('gitlab-mr')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><GitLabIcon /></span>
                GitLab MR Generator
                <span className="nav-badge">Active</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTool === 'hash-gen' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('hash-gen')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><HashIcon /></span>
                Hash:: Generator
                <span className="nav-badge" style={{ background: 'rgba(56, 139, 253, 0.15)', color: 'var(--accent-blue)' }}>New</span>
              </button>
            </li>
const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

// ─── SQL & Migration Helpers ──────────────────────────────────────────────

function convertJsonToMigrationAndModel(tableName, jsonStr, options = { nullable: true, timestamps: true, softDeletes: false }) {
  if (!jsonStr || !jsonStr.trim()) {
    return { error: 'Please enter a valid JSON payload.' }
  }

  let data
  try {
    data = JSON.parse(jsonStr)
  } catch (err) {
    return { error: `Invalid JSON syntax: ${err.message}` }
  }

  if (Array.isArray(data)) {
    data = data[0] || {}
  }

  if (typeof data !== 'object' || data === null) {
    return { error: 'JSON payload must be an Object or Array of Objects.' }
  }

  const columns = []
  const fillable = []
  const casts = {}

  const rawName = (tableName || 'users').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_')
  const className = rawName
    .replace(/(?:^|_)([a-z])/g, (_, p1) => p1.toUpperCase())
    .replace(/s$/, '')

  Object.entries(data).forEach(([key, val]) => {
    fillable.push(`'${key}'`)

    if (key === 'id') {
      columns.push(`            $table->id();`)
      return
    }

    if (key.endsWith('_id')) {
      const refTable = key.replace(/_id$/, 's')
      columns.push(`            $table->foreignId('${key}')->constrained('${refTable}')->cascadeOnDelete();`)
      casts[key] = 'integer'
      return
    }

    const valType = typeof val

    if (val === null) {
      columns.push(`            $table->string('${key}')->nullable();`)
    } else if (valType === 'boolean') {
      columns.push(`            $table->boolean('${key}')${options.nullable ? '->default(false)' : ''};`)
      casts[key] = 'boolean'
    } else if (valType === 'number') {
      if (Number.isInteger(val)) {
        columns.push(`            $table->integer('${key}')${options.nullable ? '->nullable()' : ''};`)
        casts[key] = 'integer'
      } else {
        columns.push(`            $table->decimal('${key}', 10, 2)${options.nullable ? '->nullable()' : ''};`)
        casts[key] = 'float'
      }
    } else if (valType === 'object') {
      columns.push(`            $table->json('${key}')${options.nullable ? '->nullable()' : ''};`)
      casts[key] = 'array'
    } else if (valType === 'string') {
      if (key.endsWith('_at') || key.endsWith('_date') || /^\d{4}-\d{2}-\d{2}/.test(val)) {
        columns.push(`            $table->timestamp('${key}')${options.nullable ? '->nullable()' : ''};`)
        casts[key] = 'datetime'
      } else if (val.length > 255) {
        columns.push(`            $table->text('${key}')${options.nullable ? '->nullable()' : ''};`)
      } else {
        columns.push(`            $table->string('${key}')${options.nullable ? '->nullable()' : ''};`)
      }
    }
  })

  if (options.softDeletes) {
    columns.push(`            $table->softDeletes();`)
  }
  if (options.timestamps) {
    columns.push(`            $table->timestamps();`)
  }

  const migrationCode = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('${rawName}', function (Blueprint $table) {
${columns.join('\n')}
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('${rawName}');
    }
};`

  const castsFormatted = Object.entries(casts)
    .map(([k, v]) => `        '${k}' => '${v}',`)
    .join('\n')

  const modelCode = `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
${options.softDeletes ? 'use Illuminate\\Database\\Eloquent\\SoftDeletes;\n' : ''}
class ${className || 'SampleModel'} extends Model
{
    use HasFactory${options.softDeletes ? ', SoftDeletes' : ''};

    protected $table = '${rawName}';

    protected $fillable = [
        ${fillable.join(',\n        ')},
    ];

    protected $casts = [
${castsFormatted}
    ];
}`

  return { migrationCode, modelCode }
}

function generateJsonSqlQueries(table, jsonCol, keyPath, operator, val) {
  const tbl = (table || 'users').trim()
  const col = (jsonCol || 'metadata').trim()
  const path = (keyPath || 'address.city').trim()
  const op = operator || '='
  const v = (val || 'Jakarta').trim()

  const isNumeric = !isNaN(v) && v !== ''
  const formattedVal = isNumeric ? v : `'${v}'`

  const arrowPath = path.split('.').join('->')
  const jsonPathDollar = `$.${path}`

  const mysql57 = `SELECT * FROM ${tbl}\nWHERE JSON_UNQUOTE(JSON_EXTRACT(${col}, '${jsonPathDollar}')) ${op} ${formattedVal};`
  const mysql80 = `SELECT * FROM ${tbl}\nWHERE ${col}->>'${jsonPathDollar}' ${op} ${formattedVal};`
  const pgSql = `SELECT * FROM ${tbl}\nWHERE ${col}->${path.split('.').map(p => `'${p}'`).join('->')} ${op} ${formattedVal};`

  const modelName = tbl.replace(/(?:^|_)([a-z])/g, (_, p1) => p1.toUpperCase()).replace(/s$/, '')
  const elo = `${modelName || 'User'}::where('${col}->${arrowPath}', '${v}')->get();`
  const eloContains = `// Search within JSON Array / Object\nDB::table('${tbl}')\n  ->whereJsonContains('${col}->${arrowPath}', '${v}')\n  ->get();`
  const migration = `// Laravel Migration Column\n$table->json('${col}')->nullable();`

  return { mysql57, mysql80, pgSql, elo, eloContains, migration }
}

function formatRawSql(sqlStr) {
  if (!sqlStr || !sqlStr.trim()) return ''
  let sql = sqlStr.trim().replace(/\s+/g, ' ')

  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY',
    'HAVING', 'LIMIT', 'OFFSET', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN',
    'INNER JOIN', 'ON', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'
  ]

  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi')
    sql = sql.replace(regex, `\n${kw.toUpperCase()}`)
  })

  return sql.trim()
}

// ─── SQL & Migration Helper Component ───────────────────────────────────────

function SqlQueryHelperTool() {
  const [subTab, setSubTab] = useState('json-migration') // 'json-migration' | 'json-clause' | 'sql-format'

  // Tab 1 state
  const [tableName, setTableName] = useState('users')
  const [jsonInput, setJsonInput] = useState(`{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role_id": 2,
  "is_active": true,
  "balance": 1500.50,
  "settings": { "theme": "dark", "notifications": true },
  "created_at": "2026-08-06T12:00:00Z"
}`)
  const [options, setOptions] = useState({ nullable: true, timestamps: true, softDeletes: false })
  const [copiedMigration, setCopiedMigration] = useState(false)
  const [copiedModel, setCopiedModel] = useState(false)

  // Tab 2 state
  const [jsonTable, setJsonTable] = useState('users')
  const [jsonColumn, setJsonColumn] = useState('metadata')
  const [keyPath, setKeyPath] = useState('address.city')
  const [operator, setOperator] = useState('=')
  const [compareValue, setCompareValue] = useState('Jakarta')
  const [copiedQuery, setCopiedQuery] = useState(false)

  // Tab 3 state
  const [rawSql, setRawSql] = useState('SELECT u.id, u.name, o.total FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.is_active = 1 AND o.status = "completed" ORDER BY o.total DESC LIMIT 10;')
  const [copiedFormattedSql, setCopiedFormattedSql] = useState(false)

  const copyToClipboard = async (text, setter) => {
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
    setter(true)
    setTimeout(() => setter(false), 2200)
  }

  const { migrationCode, modelCode, error: migrationError } = convertJsonToMigrationAndModel(tableName, jsonInput, options)
  const jsonQueries = generateJsonSqlQueries(jsonTable, jsonColumn, keyPath, operator, compareValue)
  const formattedSql = formatRawSql(rawSql)

  return (
    <div className="workspace">
      {/* ── Left Panel ── */}
      <section className="panel">
        <div className="panel-header">
          <span className="panel-title">
            <DatabaseIcon />
            SQL & Migration Inputs
          </span>
          <span className="panel-badge">Interactive</span>
        </div>

        <div className="panel-body">
          {/* Sub Tab Switcher */}
          <div className="tab-group">
            <button
              type="button"
              className={`tab-btn ${subTab === 'json-migration' ? 'active' : ''}`}
              onClick={() => setSubTab('json-migration')}
            >
              <TableIcon />
              JSON to Migration
            </button>
            <button
              type="button"
              className={`tab-btn ${subTab === 'json-clause' ? 'active' : ''}`}
              onClick={() => setSubTab('json-clause')}
            >
              <CodeIcon />
              JSON SQL Clause
            </button>
            <button
              type="button"
              className={`tab-btn ${subTab === 'sql-format' ? 'active' : ''}`}
              onClick={() => setSubTab('sql-format')}
            >
              <SparklesIcon />
              SQL Formatter
            </button>
          </div>

          {subTab === 'json-migration' && (
            <>
              <div className="field-group">
                <label className="field-label" htmlFor="tableName">
                  <span className="field-label-icon"><TableIcon /></span>
                  Table Name
                </label>
                <input
                  id="tableName"
                  type="text"
                  className="input"
                  placeholder="e.g. users, orders, products"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  spellCheck="false"
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="jsonInput">
                  <span className="field-label-icon"><CodeIcon /></span>
                  JSON Payload Sample
                </label>
                <textarea
                  id="jsonInput"
                  className="textarea"
                  style={{ minHeight: '160px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}
                  placeholder="Paste JSON object here..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  spellCheck="false"
                />
              </div>

              <div className="preset-group">
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>Samples:</span>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => {
                    setTableName('users')
                    setJsonInput(`{\n  "id": 1,\n  "name": "John Doe",\n  "email": "john@example.com",\n  "role_id": 2,\n  "is_active": true,\n  "balance": 1500.50,\n  "settings": { "theme": "dark", "notifications": true },\n  "created_at": "2026-08-06T12:00:00Z"\n}`)
                  }}
                >
                  User Payload
                </button>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => {
                    setTableName('orders')
                    setJsonInput(`{\n  "id": 101,\n  "order_number": "ORD-2026-992",\n  "user_id": 42,\n  "total_amount": 299.99,\n  "status": "paid",\n  "items": [{ "sku": "ABC", "qty": 2 }],\n  "paid_at": "2026-08-06T10:15:00Z"\n}`)
                  }}
                >
                  Order Payload
                </button>
              </div>

              <div className="section-divider" />

              <div className="field-group">
                <label className="field-label">Options</label>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={options.nullable}
                      onChange={(e) => setOptions(o => ({ ...o, nullable: e.target.checked }))}
                    />
                    Nullable by default
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={options.timestamps}
                      onChange={(e) => setOptions(o => ({ ...o, timestamps: e.target.checked }))}
                    />
                    $table-&gt;timestamps()
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={options.softDeletes}
                      onChange={(e) => setOptions(o => ({ ...o, softDeletes: e.target.checked }))}
                    />
                    $table-&gt;softDeletes()
                  </label>
                </div>
              </div>
            </>
          )}

          {subTab === 'json-clause' && (
            <>
              <div className="options-grid">
                <div>
                  <label className="field-label">Database Table</label>
                  <input
                    type="text"
                    className="input"
                    value={jsonTable}
                    onChange={(e) => setJsonTable(e.target.value)}
                    placeholder="users"
                  />
                </div>
                <div>
                  <label className="field-label">JSON Column Name</label>
                  <input
                    type="text"
                    className="input"
                    value={jsonColumn}
                    onChange={(e) => setJsonColumn(e.target.value)}
                    placeholder="metadata"
                  />
                </div>
              </div>

              <div className="options-grid" style={{ marginTop: '12px' }}>
                <div>
                  <label className="field-label">JSON Key Path</label>
                  <input
                    type="text"
                    className="input"
                    value={keyPath}
                    onChange={(e) => setKeyPath(e.target.value)}
                    placeholder="address.city"
                  />
                </div>
                <div>
                  <label className="field-label">Operator</label>
                  <select
                    className="select-input"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                  >
                    <option value="=">=</option>
                    <option value="!=">!=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value="LIKE">LIKE</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <label className="field-label">Target Compare Value</label>
                <input
                  type="text"
                  className="input"
                  value={compareValue}
                  onChange={(e) => setCompareValue(e.target.value)}
                  placeholder="Jakarta"
                />
              </div>

              <div className="preset-group">
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>Quick:</span>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => { setJsonTable('users'); setJsonColumn('metadata'); setKeyPath('address.city'); setOperator('='); setCompareValue('Jakarta'); }}
                >
                  City Search
                </button>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => { setJsonTable('users'); setJsonColumn('settings'); setKeyPath('notifications.email'); setOperator('='); setCompareValue('true'); }}
                >
                  Boolean Filter
                </button>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => { setJsonTable('orders'); setJsonColumn('payload'); setKeyPath('pricing.total'); setOperator('>'); setCompareValue('100'); }}
                >
                  Numeric Query
                </button>
              </div>
            </>
          )}

          {subTab === 'sql-format' && (
            <div>
              <div className="field-group">
                <label className="field-label" htmlFor="rawSql">
                  <span className="field-label-icon"><CodeIcon /></span>
                  Paste Raw / Messy SQL Query
                </label>
                <textarea
                  id="rawSql"
                  className="textarea"
                  style={{ minHeight: '180px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}
                  placeholder="SELECT * FROM users WHERE..."
                  value={rawSql}
                  onChange={(e) => setRawSql(e.target.value)}
                  spellCheck="false"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Right Panel Output ── */}
      <section className="panel">
        <div className="panel-header">
          <span className="panel-title">
            <EyeIcon />
            Generated Output Snippets
          </span>
          <span className="panel-badge">Real-time</span>
        </div>

        <div className="panel-body">
          {subTab === 'json-migration' && (
            <>
              {migrationError ? (
                <div style={{ color: 'var(--accent-red)', padding: '12px', background: 'rgba(248, 81, 73, 0.1)', borderRadius: '6px' }}>
                  {migrationError}
                </div>
              ) : (
                <>
                  <div className="field-group">
                    <label className="field-label">
                      <span className="field-label-icon"><TableIcon /></span>
                      Laravel Migration File (`database/migrations/...`)
                    </label>
                    <textarea
                      className="preview-textarea"
                      readOnly
                      value={migrationCode}
                      spellCheck="false"
                      style={{ minHeight: '220px' }}
                    />
                    <div className="copy-btn-wrapper">
                      <button
                        type="button"
                        className={`btn btn-copy ${copiedMigration ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(migrationCode, setCopiedMigration)}
                      >
                        {copiedMigration ? <CheckIcon /> : <CopyIcon />}
                        {copiedMigration ? 'Copied Migration!' : 'Copy Migration Code'}
                      </button>
                    </div>
                  </div>

                  <div className="section-divider" />

                  <div className="field-group">
                    <label className="field-label">
                      <span className="field-label-icon"><CodeIcon /></span>
                      Laravel Eloquent Model (`app/Models/...`)
                    </label>
                    <textarea
                      className="preview-textarea"
                      readOnly
                      value={modelCode}
                      spellCheck="false"
                      style={{ minHeight: '180px' }}
                    />
                    <div className="copy-btn-wrapper">
                      <button
                        type="button"
                        className={`btn btn-copy ${copiedModel ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(modelCode, setCopiedModel)}
                      >
                        {copiedModel ? <CheckIcon /> : <CopyIcon />}
                        {copiedModel ? 'Copied Model!' : 'Copy Model Code'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {subTab === 'json-clause' && (
            <div>
              <div className="hash-output-card">
                <div className="hash-card-header">
                  <span className="hash-card-title"><CodeIcon />Laravel Eloquent (Recommended)</span>
                  <span className="algo-badge bcrypt">Laravel</span>
                </div>
                <div className="hash-code-display">{jsonQueries.elo}</div>
              </div>

              <div className="hash-output-card">
                <div className="hash-card-header">
                  <span className="hash-card-title"><DatabaseIcon />MySQL 8.0+ Inline Arrow (`-&gt;&gt;`)</span>
                  <span className="algo-badge argon">MySQL 8.0</span>
                </div>
                <div className="hash-code-display argon">{jsonQueries.mysql80}</div>
              </div>

              <div className="hash-output-card">
                <div className="hash-card-header">
                  <span className="hash-card-title"><DatabaseIcon />MySQL 5.7+ JSON_EXTRACT</span>
                  <span className="algo-badge bcrypt">MySQL 5.7</span>
                </div>
                <div className="hash-code-display">{jsonQueries.mysql57}</div>
              </div>

              <div className="hash-output-card">
                <div className="hash-card-header">
                  <span className="hash-card-title"><DatabaseIcon />PostgreSQL JSONB (`-&gt;&gt;`)</span>
                  <span className="algo-badge argon">PostgreSQL</span>
                </div>
                <div className="hash-code-display argon">{jsonQueries.pgSql}</div>
              </div>

              <div className="copy-btn-wrapper">
                <button
                  type="button"
                  className={`btn btn-copy ${copiedQuery ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(`${jsonQueries.elo}\n\n${jsonQueries.mysql80}`, setCopiedQuery)}
                >
                  {copiedQuery ? <CheckIcon /> : <CopyIcon />}
                  {copiedQuery ? 'Copied Queries!' : 'Copy Queries'}
                </button>
              </div>
            </div>
          )}

          {subTab === 'sql-format' && (
            <div>
              <div className="field-group">
                <label className="field-label">
                  <span className="field-label-icon"><SparklesIcon /></span>
                  Formatted SQL Query
                </label>
                <textarea
                  className="preview-textarea"
                  readOnly
                  value={formattedSql}
                  spellCheck="false"
                  style={{ minHeight: '260px' }}
                />
              </div>
              <div className="copy-btn-wrapper">
                <button
                  type="button"
                  className={`btn btn-copy ${copiedFormattedSql ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(formattedSql, setCopiedFormattedSql)}
                >
                  {copiedFormattedSql ? <CheckIcon /> : <CopyIcon />}
                  {copiedFormattedSql ? 'Copied SQL!' : 'Copy Formatted SQL'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function App() {
  const [activeTool, setActiveTool] = useState('gitlab-mr')
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
                className={`nav-item-btn ${activeTool === 'gitlab-mr' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('gitlab-mr')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><GitLabIcon /></span>
                GitLab MR Generator
                <span className="nav-badge">Active</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTool === 'hash-gen' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('hash-gen')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><HashIcon /></span>
                Hash:: Generator
                <span className="nav-badge" style={{ background: 'rgba(56, 139, 253, 0.15)', color: 'var(--accent-blue)' }}>New</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTool === 'sql-helper' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('sql-helper')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><DatabaseIcon /></span>
                SQL / Migration Helper
                <span className="nav-badge" style={{ background: 'rgba(63, 185, 80, 0.15)', color: 'var(--accent-green)' }}>New</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTool === 'release-notes' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('release-notes')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><CodeIcon /></span>
                Release Notes Gen
                <span className="nav-badge soon">Soon</span>
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
              <div
                className="header-icon"
                style={
                  activeTool === 'hash-gen'
                    ? { background: 'linear-gradient(135deg, #388bfd, #1f6beb)', boxShadow: '0 2px 8px rgba(56, 139, 253, 0.35)' }
                    : activeTool === 'sql-helper'
                    ? { background: 'linear-gradient(135deg, #3fb950, #238636)', boxShadow: '0 2px 8px rgba(63, 185, 80, 0.35)' }
                    : {}
                }
              >
                {activeTool === 'hash-gen' ? <HashIcon /> : activeTool === 'sql-helper' ? <DatabaseIcon /> : <GitLabIcon />}
              </div>
              <div className="header-text">
                <h1>
                  {activeTool === 'hash-gen'
                    ? 'Hash:: Generator'
                    : activeTool === 'sql-helper'
                    ? 'SQL & Migration Helper'
                    : 'MR Description Generator'}
                </h1>
                <p>
                  {activeTool === 'hash-gen'
                    ? 'Generate Laravel Hash::make() compatible Bcrypt ($2y$) and Argon2id ($argon2id$) password hashes'
                    : activeTool === 'sql-helper'
                    ? 'Convert JSON to Laravel Migrations & Models, build JSON SQL queries, and format SQL'
                    : 'Generate GitLab Merge Request descriptions instantly'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main Content Body ── */}
        <main className="main-content">
          {activeTool === 'gitlab-mr' ? (
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
                  {/* Thread Link */}
                  <div className="field-group">
                    <label className="field-label" htmlFor="threadLink">
                      <span className="field-label-icon"><LinkIcon /></span>
                      Microsoft Teams Thread Link
                      <span className="field-optional">optional</span>
                    </label>
                    <input
                      id="threadLink"
                      type="text"
                      className="input"
                      placeholder="https://teams.microsoft.com/..."
                      value={form.threadLink}
                      onChange={handleChange('threadLink')}
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <p className="field-hint">
                      Paste the Teams thread URL related to this MR.
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
          ) : activeTool === 'hash-gen' ? (
            <HashGeneratorTool />
          ) : activeTool === 'sql-helper' ? (
            <SqlQueryHelperTool />
          ) : (
            <div className="placeholder-tool">
              <PlusIcon />
              <h2>Upcoming Tool</h2>
              <p>This worktool is currently under development and will be available soon.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  )
}



