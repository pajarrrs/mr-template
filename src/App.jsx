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

const UnlockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
)

const CheckSquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
)

const SquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
)

const StickyNoteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const UploadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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
  try {
    const salt = bcrypt.genSaltSync(cost)
    const hash = bcrypt.hashSync(plainText, salt)
    // Laravel standard uses $2y$ prefix (PHP standard), bcryptjs generates $2a$ or $2b$
    return hash.replace(/^\$2[ab]\$/, '$2y$')
  } catch (err) {
    console.error('Bcrypt generation error:', err)
    return ''
  }
}

async function generateArgon2idHash(plainText, memory = 1024, time = 3, parallelism = 3) {
  try {
    const salt = window.crypto.getRandomValues(new Uint8Array(16))
    return await argon2id({
      password: plainText,
      salt,
      iterations: time,
      memorySize: memory,
      hashLength: 32,
      parallelism,
      outputType: 'encoded'
    })
  } catch (err) {
    console.error('Argon2id generation error:', err)
    return ''
  }
}

async function verifyPasswordAgainstHash(plainText, hashStr) {
  if (!plainText || !hashStr) return null
  const trimmed = hashStr.trim()
  try {
    if (trimmed.startsWith('$2')) {
      // Normalize $2y$ or $2b$ to $2a$ for bcryptjs verification
      const normalized = trimmed.replace(/^\$2[yb]\$/, '$2a$')
      return bcrypt.compareSync(plainText, normalized)
    }
    if (trimmed.startsWith('$argon2id$')) {
      return await argon2Verify({ password: plainText, hash: trimmed })
    }
  } catch (err) {
    console.error('Verify error:', err)
    return false
  }
  return false
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
    'Nyra Thread Link',
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

  // SQL Query Customization state
  const [sqlTargetUser, setSqlTargetUser] = useState('admin@example.com')
  const [sqlTable, setSqlTable] = useState('users')
  const [sqlColumn, setSqlColumn] = useState('password')

  // Laravel standard initial default bcrypt hash for 'password'
  const [bcryptHash, setBcryptHash] = useState('$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
  const [argonHash, setArgonHash] = useState('$argon2id$v=19$m=1024,t=3,p=3$AAAAAAAAAAAAAAAAAAAAAA$xZLsaiLg7fwzkOVIiR4+o60D5Oky/nmrj9HvsHIJbwE')
  
  const [copiedBcrypt, setCopiedBcrypt] = useState(false)
  const [copiedArgon, setCopiedArgon] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Inspector state
  const [inspectHash, setInspectHash] = useState('$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
  const [inspectTestPassword, setInspectTestPassword] = useState('password')
  const [inspectMatchResult, setInspectMatchResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    let active = true
    const run = async () => {
      const b = await generateBcryptHash(plaintext || 'password', cost)
      const a = await generateArgon2idHash(plaintext || 'password', argonMemory, argonTime, argonThreads)
      if (active) {
        if (b) setBcryptHash(b)
        if (a) setArgonHash(a)
      }
    }
    run()
    return () => { active = false }
  }, [plaintext, cost, argonMemory, argonTime, argonThreads, saltSeed])

  // Real-time verification effect in inspector
  useEffect(() => {
    let active = true
    if (!inspectHash || !inspectTestPassword) {
      setInspectMatchResult(null)
      return
    }
    setIsVerifying(true)
    verifyPasswordAgainstHash(inspectTestPassword, inspectHash).then((matched) => {
      if (active) {
        setInspectMatchResult(matched)
        setIsVerifying(false)
      }
    })
    return () => { active = false }
  }, [inspectHash, inspectTestPassword])

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
    const targetUser = sqlTargetUser.trim() || 'admin@example.com'
    const targetTable = sqlTable.trim() || 'users'
    const targetCol = sqlColumn.trim() || 'password'

    if (outputFormat === 'raw') {
      if (hashType === 'bcrypt') return bcryptHash
      if (hashType === 'argon') return argonHash
      return `// Hash Biasa (Bcrypt $2y$)\n${bcryptHash}\n\n// Hash Argon (Argon2id $argon2id$)\n${argonHash}`
    }

    if (outputFormat === 'laravel') {
      if (hashType === 'bcrypt') {
        return `use Illuminate\\Support\\Facades\\Hash;\n\n// Generate Bcrypt Hash (Default Laravel)\n$hashed = Hash::make('${inputStr}');\n// Verified Hash: ${bcryptHash}`
      }
      if (hashType === 'argon') {
        return `use Illuminate\\Support\\Facades\\Hash;\n\n// Generate Argon2id Hash\n$hashed = Hash::make('${inputStr}', [\n    'memory' => ${argonMemory},\n    'time' => ${argonTime},\n    'threads' => ${argonThreads},\n]);\n// Verified Hash: ${argonHash}`
      }
      return `use Illuminate\\Support\\Facades\\Hash;\n\n// 1. Bcrypt Hash (Hash::make)\n$bcrypt = Hash::make('${inputStr}');\n// Result: ${bcryptHash}\n\n// 2. Argon2id Hash\n$argon = Hash::make('${inputStr}', [\n    'memory' => ${argonMemory},\n    'time' => ${argonTime},\n    'threads' => ${argonThreads},\n]);\n// Result: ${argonHash}`
    }

    if (outputFormat === 'sql') {
      if (hashType === 'bcrypt') {
        return [
          `-- ============================================================`,
          `-- Update MySQL Password (Bcrypt $2y$ - Laravel Compatible)`,
          `-- Target Password: "${inputStr}"`,
          `-- ============================================================`,
          ``,
          `-- Option 1: Update by Email (Recommended)`,
          `UPDATE \`${targetTable}\``,
          `SET \`${targetCol}\` = '${bcryptHash}',`,
          `    \`updated_at\` = NOW()`,
          `WHERE \`email\` = '${targetUser}';`,
          ``,
          `-- Option 2: Update by ID`,
          `UPDATE \`${targetTable}\``,
          `SET \`${targetCol}\` = '${bcryptHash}',`,
          `    \`updated_at\` = NOW()`,
          `WHERE \`id\` = 1;`,
          ``,
          `-- ⚠️ CLI NOTE: When executing via MySQL CLI / Bash (mysql -e),`,
          `-- wrap query in SINGLE QUOTES ('...') to prevent bash from expanding '$2y$' as shell variables:`,
          `-- mysql -u root -p database_name -e 'UPDATE \`${targetTable}\` SET \`${targetCol}\` = "${bcryptHash}", \`updated_at\` = NOW() WHERE \`email\` = "${targetUser}";'`
        ].join('\n')
      }

      if (hashType === 'argon') {
        return [
          `-- ============================================================`,
          `-- Update MySQL Password (Argon2id - Laravel Compatible)`,
          `-- Target Password: "${inputStr}"`,
          `-- ============================================================`,
          ``,
          `-- Option 1: Update by Email`,
          `UPDATE \`${targetTable}\``,
          `SET \`${targetCol}\` = '${argonHash}',`,
          `    \`updated_at\` = NOW()`,
          `WHERE \`email\` = '${targetUser}';`,
          ``,
          `-- Option 2: Update by ID`,
          `UPDATE \`${targetTable}\``,
          `SET \`${targetCol}\` = '${argonHash}',`,
          `    \`updated_at\` = NOW()`,
          `WHERE \`id\` = 1;`,
          ``,
          `-- ⚠️ CLI NOTE: When executing via bash, wrap in single quotes:`,
          `-- mysql -u root -p database_name -e 'UPDATE \`${targetTable}\` SET \`${targetCol}\` = "${argonHash}", \`updated_at\` = NOW() WHERE \`email\` = "${targetUser}";'`
        ].join('\n')
      }

      return [
        `-- ============================================================`,
        `-- Update MySQL Password (Both Drivers - Laravel Compatible)`,
        `-- Target Password: "${inputStr}"`,
        `-- ============================================================`,
        ``,
        `-- 1. Bcrypt ($2y$ - Laravel Standard Default)`,
        `UPDATE \`${targetTable}\``,
        `SET \`${targetCol}\` = '${bcryptHash}',`,
        `    \`updated_at\` = NOW()`,
        `WHERE \`email\` = '${targetUser}';`,
        ``,
        `-- 2. Argon2id ($argon2id$)`,
        `UPDATE \`${targetTable}\``,
        `SET \`${targetCol}\` = '${argonHash}',`,
        `    \`updated_at\` = NOW()`,
        `WHERE \`email\` = '${targetUser}';`,
        ``,
        `-- ⚠️ CLI NOTE: Wrap in SINGLE QUOTES ('...') in bash so '$' is not expanded!`
      ].join('\n')
    }

    if (outputFormat === 'seeder') {
      const activeHash = hashType === 'argon' ? argonHash : bcryptHash
      return `// Laravel Database Seeder / User Factory\n\\App\\Models\\User::updateOrCreate(\n    ['email' => '${targetUser}'],\n    [\n        'name' => 'Admin User',\n        'password' => '${activeHash}', // plain: ${inputStr}\n    ]\n);`
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

              {/* SQL Specific Options */}
              {outputFormat === 'sql' && (
                <div style={{ marginTop: '-4px', marginBottom: '16px', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    MySQL Query Target Parameters
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
                        Target Email / Username
                      </label>
                      <input
                        type="text"
                        className="input"
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                        value={sqlTargetUser}
                        onChange={(e) => setSqlTargetUser(e.target.value)}
                        placeholder="admin@example.com"
                        spellCheck="false"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
                        Table Name
                      </label>
                      <input
                        type="text"
                        className="input"
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                        value={sqlTable}
                        onChange={(e) => setSqlTable(e.target.value)}
                        placeholder="users"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                </div>
              )}

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
                    setSqlTargetUser('admin@example.com')
                    setSqlTable('users')
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
                  onClick={() => {
                    setInspectHash('$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
                    setInspectTestPassword('password')
                  }}
                >
                  Bcrypt Laravel Default ($2y$)
                </button>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => {
                    setInspectHash('$argon2id$v=19$m=1024,t=3,p=3$AAAAAAAAAAAAAAAAAAAAAA$xZLsaiLg7fwzkOVIiR4+o60D5Oky/nmrj9HvsHIJbwE')
                    setInspectTestPassword('password')
                  }}
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

              {/* Password Verifier Section */}
              <div style={{ marginTop: '16px', padding: '14px', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)' }}>
                <label className="field-label" htmlFor="testPasswordInput" style={{ marginBottom: '6px' }}>
                  <span className="field-label-icon"><KeyIcon /></span>
                  Test Plaintext Password Against this Hash
                </label>
                <input
                  id="testPasswordInput"
                  type="text"
                  className="input"
                  placeholder="Type plaintext password to verify (e.g. password)..."
                  value={inspectTestPassword}
                  onChange={(e) => setInspectTestPassword(e.target.value)}
                  spellCheck="false"
                />

                <div style={{ marginTop: '10px' }}>
                  {!inspectHash ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Paste a hash above to begin verification.
                    </span>
                  ) : !inspectTestPassword ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Enter a password to test matching.
                    </span>
                  ) : isVerifying ? (
                    <span className="status-badge" style={{ background: 'rgba(56, 139, 253, 0.15)', color: 'var(--accent-blue)', borderColor: 'rgba(56, 139, 253, 0.3)' }}>
                      Verifying cryptographic match...
                    </span>
                  ) : inspectMatchResult === true ? (
                    <div style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(63, 185, 80, 0.15)', border: '1px solid rgba(63, 185, 80, 0.4)', color: '#56d364', fontSize: '0.82rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckIcon />
                      <div>
                        <strong>MATCH! (Valid for Login)</strong>
                        <div style={{ fontSize: '0.74rem', opacity: 0.9, marginTop: '2px' }}>
                          Password &ldquo;{inspectTestPassword}&rdquo; matches this hash. Laravel <code>Hash::check()</code> / <code>Auth::attempt()</code> will succeed.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(248, 81, 73, 0.15)', border: '1px solid rgba(248, 81, 73, 0.4)', color: '#f85149', fontSize: '0.82rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1rem', lineHeight: '1' }}>✕</span>
                      <div>
                        <strong>MISMATCH (Login will Fail)</strong>
                        <div style={{ fontSize: '0.74rem', opacity: 0.9, marginTop: '2px' }}>
                          Password &ldquo;{inspectTestPassword}&rdquo; does NOT match this hash. If stored in database, user authentication will be rejected.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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

// ─── Secure Notes & Tasks Tool Component ──────────────────────────────────

const SECURE_STORAGE_KEYS = {
  CODE_HASH: 'worktools_access_code_hash',
  TASKS: 'worktools_secure_tasks',
  NOTES: 'worktools_secure_notes',
}

const DEFAULT_TASKS = []
const DEFAULT_NOTES = []

async function hashAccessCode(code) {
  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder()
    const data = encoder.encode('worktools_salt_' + code)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }
  let hash = 0
  for (let i = 0; i < code.length; i++) {
    hash = (hash << 5) - hash + code.charCodeAt(i)
    hash |= 0
  }
  return 'simple_' + hash
}

function formatTaskDate(isoString) {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    if (isNaN(d.getTime())) return ''
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d)
  } catch {
    return ''
  }
}

function SecureNotesTool() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasCode, setHasCode] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)

  // Auth Inputs
  const [inputCode, setInputCode] = useState('')
  const [confirmCode, setConfirmCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [authError, setAuthError] = useState('')

  // Data
  const [tab, setTab] = useState('tasks') // 'tasks' | 'notes'
  const [tasks, setTasks] = useState([])
  const [notes, setNotes] = useState([])

  // Task Form & Filter
  const [newTaskText, setNewTaskText] = useState('')
  const [newTaskDesc, setNewTaskDesc] = useState('')
  const [newTaskStatus, setNewTaskStatus] = useState('todo') // 'todo' | 'in-progress' | 'done' | 'blocked'
  const [newTaskPriority, setNewTaskPriority] = useState('medium')
  const [newTaskCategory, setNewTaskCategory] = useState('Feature')
  const [showAddDesc, setShowAddDesc] = useState(false)
  const [taskFilter, setTaskFilter] = useState('all') // 'all' | 'todo' | 'in-progress' | 'done' | 'blocked'

  // Note Form & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [editingNote, setEditingNote] = useState(null) // null or note object
  const [copiedNoteId, setCopiedNoteId] = useState(null)

  // Modals
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  // Change PIN State
  const [oldPin, setOldPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmNewPin, setConfirmNewPin] = useState('')
  const [pinChangeError, setPinChangeError] = useState('')
  const [pinChangeSuccess, setPinChangeSuccess] = useState('')

  // Export/Import State
  const [copiedExport, setCopiedExport] = useState(false)
  const [importJson, setImportJson] = useState('')
  const [importError, setImportError] = useState('')
  const [importSuccess, setImportSuccess] = useState('')

  // Load Initial State
  useEffect(() => {
    try {
      const storedHash = localStorage.getItem(SECURE_STORAGE_KEYS.CODE_HASH)
      if (storedHash) {
        setHasCode(true)
      } else {
        setHasCode(false)
      }

      const storedTasks = localStorage.getItem(SECURE_STORAGE_KEYS.TASKS)
      if (storedTasks) {
        try {
          const parsed = JSON.parse(storedTasks)
          // If stored tasks contain previous dummy tasks, clear them to empty
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id === '1' && parsed[0].text && parsed[0].text.includes('GitLab merge request')) {
            setTasks([])
            localStorage.setItem(SECURE_STORAGE_KEYS.TASKS, JSON.stringify([]))
          } else {
            setTasks(Array.isArray(parsed) ? parsed : [])
          }
        } catch {
          setTasks([])
        }
      } else {
        setTasks([])
        localStorage.setItem(SECURE_STORAGE_KEYS.TASKS, JSON.stringify([]))
      }

      const storedNotes = localStorage.getItem(SECURE_STORAGE_KEYS.NOTES)
      if (storedNotes) {
        try {
          const parsed = JSON.parse(storedNotes)
          // If stored notes contain previous dummy notes, clear them to empty
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id === '1' && parsed[0].title && parsed[0].title.includes('Production Deployment')) {
            setNotes([])
            localStorage.setItem(SECURE_STORAGE_KEYS.NOTES, JSON.stringify([]))
          } else {
            setNotes(Array.isArray(parsed) ? parsed : [])
          }
        } catch {
          setNotes([])
        }
      } else {
        setNotes([])
        localStorage.setItem(SECURE_STORAGE_KEYS.NOTES, JSON.stringify([]))
      }
    } catch (e) {
      console.error('Failed to load secure notes data:', e)
    }
    setIsLoaded(true)
  }, [])

  // Sync Data to LocalStorage
  const saveTasks = (newTasks) => {
    setTasks(newTasks)
    localStorage.setItem(SECURE_STORAGE_KEYS.TASKS, JSON.stringify(newTasks))
  }

  const saveNotes = (newNotes) => {
    setNotes(newNotes)
    localStorage.setItem(SECURE_STORAGE_KEYS.NOTES, JSON.stringify(newNotes))
  }

  // Handle First Time Setup
  const handleSetupCode = async (e) => {
    if (e) e.preventDefault()
    setAuthError('')
    if (!inputCode || inputCode.length < 4) {
      setAuthError('Access code must be at least 4 characters!')
      return
    }
    if (inputCode !== confirmCode) {
      setAuthError('Access code confirmation does not match!')
      return
    }

    const hashed = await hashAccessCode(inputCode)
    localStorage.setItem(SECURE_STORAGE_KEYS.CODE_HASH, hashed)
    setHasCode(true)
    setIsUnlocked(true)
    setInputCode('')
    setConfirmCode('')
  }

  // Handle Unlock
  const handleUnlock = async (e) => {
    if (e) e.preventDefault()
    setAuthError('')
    if (!inputCode) {
      setAuthError('Please enter your access code!')
      return
    }

    const storedHash = localStorage.getItem(SECURE_STORAGE_KEYS.CODE_HASH)
    const hashed = await hashAccessCode(inputCode)

    if (hashed === storedHash) {
      setIsUnlocked(true)
      setInputCode('')
      setAuthError('')
    } else {
      setAuthError('Incorrect access code! Please try again.')
    }
  }

  // Keypad click handler
  const handleKeypadPress = (val) => {
    setAuthError('')
    if (val === 'backspace') {
      setInputCode(prev => prev.slice(0, -1))
    } else if (val === 'clear') {
      setInputCode('')
    } else {
      setInputCode(prev => prev + val)
    }
  }

  // Lock Action
  const handleLockNow = () => {
    setIsUnlocked(false)
    setInputCode('')
    setAuthError('')
    setEditingNote(null)
  }

  // Change PIN handler
  const handleChangePin = async () => {
    setPinChangeError('')
    setPinChangeSuccess('')

    const storedHash = localStorage.getItem(SECURE_STORAGE_KEYS.CODE_HASH)
    const oldHashed = await hashAccessCode(oldPin)

    if (oldHashed !== storedHash) {
      setPinChangeError('Current access code is incorrect!')
      return
    }
    if (!newPin || newPin.length < 4) {
      setPinChangeError('New access code must be at least 4 characters!')
      return
    }
    if (newPin !== confirmNewPin) {
      setPinChangeError('New access code confirmation does not match!')
      return
    }

    const newHashed = await hashAccessCode(newPin)
    localStorage.setItem(SECURE_STORAGE_KEYS.CODE_HASH, newHashed)
    setPinChangeSuccess('Access code updated successfully!')
    setOldPin('')
    setNewPin('')
    setConfirmNewPin('')
    setTimeout(() => {
      setShowSettingsModal(false)
      setPinChangeSuccess('')
    }, 1500)
  }

  // Reset All handler
  const handleResetAll = () => {
    localStorage.removeItem(SECURE_STORAGE_KEYS.CODE_HASH)
    localStorage.removeItem(SECURE_STORAGE_KEYS.TASKS)
    localStorage.removeItem(SECURE_STORAGE_KEYS.NOTES)
    setHasCode(false)
    setIsUnlocked(false)
    setTasks(DEFAULT_TASKS)
    setNotes(DEFAULT_NOTES)
    setShowResetModal(false)
    setShowSettingsModal(false)
    setInputCode('')
    setConfirmCode('')
  }

  // Task Actions
  const handleAddTask = (e) => {
    if (e) e.preventDefault()
    if (!newTaskText.trim()) return

    const newTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      description: newTaskDesc.trim(),
      status: newTaskStatus, // 'todo' | 'in-progress' | 'done' | 'blocked'
      priority: newTaskPriority,
      category: newTaskCategory,
      completed: newTaskStatus === 'done',
      createdAt: new Date().toISOString(),
    }

    saveTasks([newTask, ...tasks])
    setNewTaskText('')
    setNewTaskDesc('')
    setNewTaskStatus('todo')
    setShowAddDesc(false)
  }

  const handleToggleTask = (id) => {
    saveTasks(tasks.map(t => {
      if (t.id === id) {
        const isDone = t.status === 'done' || t.completed
        const nextStatus = isDone ? 'todo' : 'done'
        return {
          ...t,
          status: nextStatus,
          completed: !isDone,
        }
      }
      return t
    }))
  }

  const handleStatusChange = (id, newStatus) => {
    saveTasks(tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: newStatus,
          completed: newStatus === 'done',
        }
      }
      return t
    }))
  }

  const handleDeleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id))
  }

  const handleClearCompleted = () => {
    saveTasks(tasks.filter(t => t.status !== 'done' && !t.completed))
  }

  // Note Actions
  const handleSaveNote = (e) => {
    if (e) e.preventDefault()
    if (!editingNote || !editingNote.title.trim()) return

    if (editingNote.id) {
      // Update existing
      saveNotes(notes.map(n => n.id === editingNote.id ? { ...editingNote, updatedAt: new Date().toISOString() } : n))
    } else {
      // Create new
      const newNote = {
        ...editingNote,
        id: Date.now().toString(),
        updatedAt: new Date().toISOString(),
      }
      saveNotes([newNote, ...notes])
    }
    setEditingNote(null)
  }

  const handleDeleteNote = (id) => {
    saveNotes(notes.filter(n => n.id !== id))
    if (editingNote && editingNote.id === id) {
      setEditingNote(null)
    }
  }

  const handleCopyNote = async (content, id) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedNoteId(id)
      setTimeout(() => setCopiedNoteId(null), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = content
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopiedNoteId(id)
      setTimeout(() => setCopiedNoteId(null), 2000)
    }
  }

  // Export / Import Handlers
  const handleExportJson = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      tasks,
      notes,
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `worktools_notes_backup_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleCopyExportJson = async () => {
    const backupData = { version: '1.0', tasks, notes }
    try {
      await navigator.clipboard.writeText(JSON.stringify(backupData, null, 2))
      setCopiedExport(true)
      setTimeout(() => setCopiedExport(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  const handleImportJson = () => {
    setImportError('')
    setImportSuccess('')
    try {
      const parsed = JSON.parse(importJson)
      if (!parsed || (!Array.isArray(parsed.tasks) && !Array.isArray(parsed.notes))) {
        setImportError('Invalid JSON format! Must contain a tasks or notes array.')
        return
      }
      if (Array.isArray(parsed.tasks)) saveTasks(parsed.tasks)
      if (Array.isArray(parsed.notes)) saveNotes(parsed.notes)
      setImportSuccess('Data restored successfully!')
      setTimeout(() => {
        setShowExportModal(false)
        setImportSuccess('')
        setImportJson('')
      }, 1500)
    } catch (err) {
      setImportError(`Failed to parse JSON: ${err.message}`)
    }
  }

  if (!isLoaded) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading Workspace...</div>
  }

  // ── VIEW 1: FIRST-TIME SETUP ──────────────────────────────────────────────
  if (!hasCode) {
    return (
      <div className="secure-wrapper">
        <div className="secure-lock-screen">
          <div className="secure-lock-card">
            <div className="secure-lock-icon">
              <ShieldCheckIcon />
            </div>
            <h2 className="secure-lock-title">Set Up Access Code</h2>
            <p className="secure-lock-desc">
              Create a PIN or passphrase to secure your private notes and to-do tasks in this browser.
            </p>

            <form onSubmit={handleSetupCode}>
              <div className="field-group" style={{ textAlign: 'left', marginBottom: '14px' }}>
                <label className="field-label" htmlFor="setupCode">
                  <span className="field-label-icon"><KeyIcon /></span>
                  Create Access Code (min. 4 characters)
                </label>
                <input
                  id="setupCode"
                  type={showCode ? 'text' : 'password'}
                  className="input"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="e.g. 1234 or a secret passphrase..."
                  autoComplete="new-password"
                  autoFocus
                />
              </div>

              <div className="field-group" style={{ textAlign: 'left', marginBottom: '18px' }}>
                <label className="field-label" htmlFor="confirmCode">
                  <span className="field-label-icon"><CheckIcon /></span>
                  Confirm Access Code
                </label>
                <input
                  id="confirmCode"
                  type={showCode ? 'text' : 'password'}
                  className="input"
                  value={confirmCode}
                  onChange={(e) => setConfirmCode(e.target.value)}
                  placeholder="Re-enter access code..."
                  autoComplete="new-password"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showCode}
                    onChange={(e) => setShowCode(e.target.checked)}
                  />
                  Show Characters
                </label>
              </div>

              {authError && (
                <div style={{ padding: '8px 12px', background: 'rgba(248, 81, 73, 0.15)', border: '1px solid rgba(248, 81, 73, 0.4)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-red)', fontSize: '0.8rem', marginBottom: '16px' }}>
                  {authError}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
                <ShieldCheckIcon /> Save & Unlock Workspace
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ── VIEW 2: LOCKED SCREEN ─────────────────────────────────────────────────
  if (!isUnlocked) {
    return (
      <div className="secure-wrapper">
        <div className="secure-lock-screen">
          <div className="secure-lock-card">
            <div className="secure-lock-icon">
              <LockIcon />
            </div>
            <h2 className="secure-lock-title">Workspace Locked</h2>
            <p className="secure-lock-desc">
              Enter your Access Code (PIN or passphrase) to unlock your notes and tasks.
            </p>

            <form onSubmit={handleUnlock}>
              <div style={{ position: 'relative', marginBottom: '14px' }}>
                <input
                  type={showCode ? 'text' : 'password'}
                  className="input"
                  style={{ textAlign: 'center', fontSize: '1.25rem', letterSpacing: showCode ? '2px' : '4px', fontWeight: 'bold' }}
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="••••"
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  title={showCode ? 'Hide' : 'Show'}
                >
                  <EyeIcon />
                </button>
              </div>

              {authError && (
                <div style={{ padding: '8px 12px', background: 'rgba(248, 81, 73, 0.15)', border: '1px solid rgba(248, 81, 73, 0.4)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-red)', fontSize: '0.8rem', marginBottom: '14px' }}>
                  {authError}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', marginBottom: '14px' }}>
                <UnlockIcon /> Unlock Workspace
              </button>

              {/* Quick Numeric Keypad for fast PIN entry */}
              <div className="pin-keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button
                    key={num}
                    type="button"
                    className="pin-key"
                    onClick={() => handleKeypadPress(num.toString())}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  className="pin-key action-key"
                  onClick={() => handleKeypadPress('clear')}
                  title="Clear All"
                >
                  C
                </button>
                <button
                  type="button"
                  className="pin-key"
                  onClick={() => handleKeypadPress('0')}
                >
                  0
                </button>
                <button
                  type="button"
                  className="pin-key action-key"
                  onClick={() => handleKeypadPress('backspace')}
                  title="Backspace"
                >
                  ⌫
                </button>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Forgot Access Code? Reset Workspace
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetModal && (
          <div className="modal-backdrop">
            <div className="modal-card">
              <div className="modal-header">
                <span className="modal-title" style={{ color: 'var(--accent-red)' }}>
                  <TrashIcon /> Reset Access Code?
                </span>
                <button type="button" className="btn-task-delete" onClick={() => setShowResetModal(false)}>✕</button>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                For security and privacy, resetting the access code will <strong>permanently delete all local notes and tasks</strong> stored in this browser.
              </p>
              <div className="modal-actions">
                <button type="button" className="btn btn-reset" onClick={() => setShowResetModal(false)}>Cancel</button>
                <button type="button" className="btn" style={{ background: 'var(--accent-red)', color: '#fff' }} onClick={handleResetAll}>
                  Yes, Delete & Reset All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── VIEW 3: UNLOCKED DASHBOARD ────────────────────────────────────────────
  const filteredTasks = tasks.filter(t => {
    const s = t.status || (t.completed ? 'done' : 'todo')
    if (taskFilter === 'todo') return s === 'todo'
    if (taskFilter === 'in-progress') return s === 'in-progress'
    if (taskFilter === 'done') return s === 'done'
    if (taskFilter === 'blocked') return s === 'blocked'
    return true
  })

  const todoCount = tasks.filter(t => (t.status === 'todo' || (!t.status && !t.completed))).length
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length
  const doneCount = tasks.filter(t => t.status === 'done' || t.completed).length
  const blockedCount = tasks.filter(t => t.status === 'blocked').length

  const filteredNotes = notes.filter(n => {
    const q = searchQuery.toLowerCase()
    return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || (n.tag && n.tag.toLowerCase().includes(q))
  })

  return (
    <div className="secure-wrapper">
      {/* Top Workspace Toolbar */}
      <div className="secure-toolbar">
        <div className="secure-tab-group">
          <button
            type="button"
            className={`secure-tab-btn ${tab === 'tasks' ? 'active' : ''}`}
            onClick={() => { setTab('tasks'); setEditingNote(null); }}
          >
            <CheckSquareIcon />
            Tasks ({tasks.filter(t => !t.completed && t.status !== 'done').length})
          </button>
          <button
            type="button"
            className={`secure-tab-btn ${tab === 'notes' ? 'active' : ''}`}
            onClick={() => setTab('notes')}
          >
            <StickyNoteIcon />
            Scratchpad Notes ({notes.length})
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-reset"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            onClick={() => setShowExportModal(true)}
            title="Backup & Restore JSON File"
          >
            <DownloadIcon /> JSON File
          </button>

          <button
            type="button"
            className="btn btn-reset"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            onClick={() => setShowSettingsModal(true)}
            title="Change PIN / Access Code"
          >
            <KeyIcon /> Change PIN
          </button>

          <button
            type="button"
            className="btn"
            style={{ background: 'rgba(248, 81, 73, 0.15)', color: 'var(--accent-red)', border: '1px solid rgba(248, 81, 73, 0.3)', fontSize: '0.78rem', padding: '6px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            onClick={handleLockNow}
            title="Lock Workspace Now"
          >
            <LockIcon /> Lock Now
          </button>
        </div>
      </div>

      {/* ── TAB 1: TASKS / TO-DO ── */}
      {tab === 'tasks' && (
        <div>
          {/* Add Task Panel */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '16px' }}>
            <form onSubmit={handleAddTask}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: showAddDesc ? '10px' : '6px' }}>
                <input
                  type="text"
                  className="input"
                  style={{ flex: '1 1 240px', padding: '8px 12px' }}
                  placeholder="Task title (e.g. Implement SSO Login, Fix migration bug)..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                />
                <select
                  className={`status-select ${newTaskStatus}`}
                  style={{ minWidth: '120px', height: '38px', padding: '0 8px' }}
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                  title="Initial status"
                >
                  <option value="todo">🔵 To Do</option>
                  <option value="in-progress">🟡 In Progress</option>
                  <option value="done">🟢 Done</option>
                  <option value="blocked">🔴 Blocked</option>
                </select>
                <select
                  className="select-input"
                  style={{ width: 'auto', minWidth: '105px' }}
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                >
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🔵 Low</option>
                </select>
                <select
                  className="select-input"
                  style={{ width: 'auto', minWidth: '110px' }}
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                >
                  <option value="Feature">Feature</option>
                  <option value="Bugfix">Bugfix</option>
                  <option value="Deploy">Deploy</option>
                  <option value="Review">Review</option>
                  <option value="Personal">Personal</option>
                </select>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', whiteSpace: 'nowrap' }}>
                  <PlusIcon /> Add Task
                </button>
              </div>

              {/* Collapsible / Expandable Description */}
              <div>
                {!showAddDesc ? (
                  <button
                    type="button"
                    onClick={() => setShowAddDesc(true)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', fontSize: '0.78rem', cursor: 'pointer', padding: '2px 0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <PlusIcon /> Add Description / Details (optional)
                  </button>
                ) : (
                  <div>
                    <textarea
                      className="textarea"
                      style={{ minHeight: '65px', padding: '8px 12px', fontSize: '0.82rem', marginBottom: '6px' }}
                      placeholder="Add detailed task notes, reproduction steps, pull request URL, etc..."
                      value={newTaskDesc}
                      onChange={(e) => setNewTaskDesc(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => { setShowAddDesc(false); setNewTaskDesc(''); }}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.72rem', cursor: 'pointer' }}
                    >
                      Hide description
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Filter & Counter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`preset-chip ${taskFilter === 'all' ? 'active' : ''}`}
                style={taskFilter === 'all' ? { borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' } : {}}
                onClick={() => setTaskFilter('all')}
              >
                All ({tasks.length})
              </button>
              <button
                type="button"
                className={`preset-chip ${taskFilter === 'todo' ? 'active' : ''}`}
                style={taskFilter === 'todo' ? { borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' } : {}}
                onClick={() => setTaskFilter('todo')}
              >
                To Do ({todoCount})
              </button>
              <button
                type="button"
                className={`preset-chip ${taskFilter === 'in-progress' ? 'active' : ''}`}
                style={taskFilter === 'in-progress' ? { borderColor: '#d29922', color: '#d29922' } : {}}
                onClick={() => setTaskFilter('in-progress')}
              >
                In Progress ({inProgressCount})
              </button>
              <button
                type="button"
                className={`preset-chip ${taskFilter === 'done' ? 'active' : ''}`}
                style={taskFilter === 'done' ? { borderColor: 'var(--accent-green)', color: 'var(--accent-green)' } : {}}
                onClick={() => setTaskFilter('done')}
              >
                Done ({doneCount})
              </button>
              {blockedCount > 0 && (
                <button
                  type="button"
                  className={`preset-chip ${taskFilter === 'blocked' ? 'active' : ''}`}
                  style={taskFilter === 'blocked' ? { borderColor: 'var(--accent-red)', color: 'var(--accent-red)' } : {}}
                  onClick={() => setTaskFilter('blocked')}
                >
                  Blocked ({blockedCount})
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {doneCount > 0 && (
                <button
                  type="button"
                  className="btn btn-reset"
                  style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                  onClick={handleClearCompleted}
                  title="Clear all done tasks"
                >
                  <TrashIcon /> Clear Done ({doneCount})
                </button>
              )}
              {tasks.length > 0 && (
                <button
                  type="button"
                  className="btn btn-reset"
                  style={{ fontSize: '0.72rem', padding: '4px 10px', color: 'var(--accent-red)', borderColor: 'rgba(248, 81, 73, 0.3)' }}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete all tasks?')) {
                      saveTasks([])
                    }
                  }}
                  title="Delete all tasks"
                >
                  <TrashIcon /> Delete All
                </button>
              )}
            </div>
          </div>

          {/* Task List */}
          {filteredTasks.length === 0 ? (
            <div className="empty-state-box">
              <CheckSquareIcon />
              <p style={{ marginTop: '6px', fontSize: '0.88rem' }}>No tasks found in this category.</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Type a task above and click "Add Task" to get started.</p>
            </div>
          ) : (
            <div>
              {filteredTasks.map(t => {
                const isDone = t.status === 'done' || t.completed
                const currentStatus = t.status || (t.completed ? 'done' : 'todo')

                return (
                  <div key={t.id} className={`task-item ${isDone ? 'completed' : ''}`}>
                    <div className="task-item-header">
                      <button
                        type="button"
                        className={`task-checkbox-btn ${isDone ? 'checked' : ''}`}
                        onClick={() => handleToggleTask(t.id)}
                        title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {isDone ? <CheckSquareIcon /> : <SquareIcon />}
                      </button>

                      <span className="task-text">{t.text}</span>

                      <div className="task-meta">
                        {/* Status Selector */}
                        <select
                          className={`status-select ${currentStatus}`}
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(t.id, e.target.value)}
                          title="Change task status"
                        >
                          <option value="todo">🔵 To Do</option>
                          <option value="in-progress">🟡 In Progress</option>
                          <option value="done">🟢 Done</option>
                          <option value="blocked">🔴 Blocked</option>
                        </select>

                        <span className={`priority-badge ${t.priority}`}>
                          {t.priority}
                        </span>

                        <span className="category-badge">
                          {t.category}
                        </span>

                        <button
                          type="button"
                          className="btn-task-delete"
                          onClick={() => handleDeleteTask(t.id)}
                          title="Delete this task"
                        >
                          <TrashIcon />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Task Description (if present) */}
                    {t.description && (
                      <div className="task-desc">
                        {t.description}
                      </div>
                    )}

                    {/* Task Date and Status Details */}
                    <div className="task-item-footer">
                      <span className="task-date-badge">
                        <CalendarIcon /> Created: {formatTaskDate(t.createdAt)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: SCRATCHPAD & NOTES ── */}
      {tab === 'notes' && (
        <div>
          {editingNote ? (
            /* Note Editor Form */
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <EditIcon />
                  {editingNote.id ? 'Edit Note' : 'Create New Note'}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {editingNote.id && (
                    <button
                      type="button"
                      className="btn btn-reset"
                      style={{ color: 'var(--accent-red)', borderColor: 'rgba(248, 81, 73, 0.3)' }}
                      onClick={() => handleDeleteNote(editingNote.id)}
                    >
                      <TrashIcon /> Delete
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-reset"
                    onClick={() => setEditingNote(null)}
                  >Cancel</button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveNote}
                  >
                    <CheckIcon /> Save Note
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label className="field-label" htmlFor="noteTitleInput">Note Title</label>
                  <input
                    id="noteTitleInput"
                    type="text"
                    className="input"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                    placeholder="e.g. Staging Secret Key, SQL Snippet, Deployment Checklist..."
                    autoFocus
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="noteTagInput">Tag / Category</label>
                  <input
                    id="noteTagInput"
                    type="text"
                    className="input"
                    value={editingNote.tag || ''}
                    onChange={(e) => setEditingNote({ ...editingNote, tag: e.target.value })}
                    placeholder="e.g. Deploy, Database, API"
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="noteContentInput">Note Content / Snippet</label>
                <textarea
                  id="noteContentInput"
                  className="textarea"
                  style={{ minHeight: '260px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.84rem' }}
                  value={editingNote.content}
                  onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                  placeholder="Paste code snippets, .env variables, SQL queries, or confidential memos here..."
                  spellCheck="false"
                />
              </div>
            </div>
          ) : (
            /* Notes Grid List */
            <div>
              {/* Search and Add Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ position: 'relative', flex: '1 1 240px' }}>
                  <input
                    type="text"
                    className="input"
                    style={{ paddingLeft: '34px' }}
                    placeholder="Search notes by title, tag, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <SearchIcon />
                  </span>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setEditingNote({ title: '', tag: 'General', content: '' })}
                >
                  <PlusIcon /> New Note
                </button>
              </div>

              {filteredNotes.length === 0 ? (
                <div className="empty-state-box">
                  <StickyNoteIcon />
                  <p style={{ marginTop: '6px', fontSize: '0.88rem' }}>
                    {searchQuery ? 'No notes matched your search query.' : 'No secure notes saved yet.'}
                  </p>
                  {!searchQuery && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Click "New Note" to save your secret keys, SQL queries, or personal memos.</p>
                  )}
                </div>
              ) : (
                <div className="notes-grid">
                  {filteredNotes.map(n => (
                    <div
                      key={n.id}
                      className="note-card"
                      onClick={() => setEditingNote(n)}
                    >
                      <div>
                        <div className="note-card-header">
                          <span className="note-title">{n.title}</span>
                          {n.tag && <span className="category-badge">{n.tag}</span>}
                        </div>
                        <div className="note-preview">
                          {n.content}
                        </div>
                      </div>

                      <div className="note-footer" onClick={(e) => e.stopPropagation()}>
                        <span>{new Date(n.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className={`btn-icon-copy ${copiedNoteId === n.id ? 'copied' : ''}`}
                            onClick={() => handleCopyNote(n.content, n.id)}
                            title="Copy note content"
                          >
                            {copiedNoteId === n.id ? <CheckIcon /> : <CopyIcon />}
                            {copiedNoteId === n.id ? 'Copied!' : 'Copy'}
                          </button>
                          <button
                            type="button"
                            className="btn-task-delete"
                            onClick={() => handleDeleteNote(n.id)}
                            title="Delete Note"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── MODAL 1: CHANGE PIN ── */}
      {showSettingsModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <span className="modal-title"><KeyIcon /> Change Access Code</span>
              <button type="button" className="btn-task-delete" onClick={() => setShowSettingsModal(false)}>✕</button>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="field-label" htmlFor="oldPin">Current Access Code</label>
              <input
                id="oldPin"
                type="password"
                className="input"
                value={oldPin}
                onChange={(e) => setOldPin(e.target.value)}
                placeholder="Enter current code..."
                autoFocus
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="field-label" htmlFor="newPin">New Access Code (min. 4 characters)</label>
              <input
                id="newPin"
                type="password"
                className="input"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Enter new code..."
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="field-label" htmlFor="confirmNewPin">Confirm New Access Code</label>
              <input
                id="confirmNewPin"
                type="password"
                className="input"
                value={confirmNewPin}
                onChange={(e) => setConfirmNewPin(e.target.value)}
                placeholder="Re-enter new code..."
              />
            </div>

            {pinChangeError && (
              <div style={{ padding: '8px 12px', background: 'rgba(248, 81, 73, 0.15)', border: '1px solid rgba(248, 81, 73, 0.4)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-red)', fontSize: '0.8rem', marginBottom: '14px' }}>
                {pinChangeError}
              </div>
            )}

            {pinChangeSuccess && (
              <div style={{ padding: '8px 12px', background: 'rgba(63, 185, 80, 0.15)', border: '1px solid rgba(63, 185, 80, 0.4)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-green)', fontSize: '0.8rem', marginBottom: '14px' }}>
                {pinChangeSuccess}
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="btn btn-reset" onClick={() => setShowSettingsModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleChangePin}>
                Save New Access Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: BACKUP & RESTORE ── */}
      {showExportModal && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <span className="modal-title"><DownloadIcon /> Backup & Restore Data</span>
              <button type="button" className="btn-task-delete" onClick={() => setShowExportModal(false)}>✕</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Download all your task and note data as a JSON file to keep it safe or transfer it to another computer.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" className="btn btn-primary" onClick={handleExportJson} style={{ fontSize: '0.82rem' }}>
                  <DownloadIcon /> Download Backup JSON File
                </button>
                <button type="button" className="btn btn-reset" onClick={handleCopyExportJson} style={{ fontSize: '0.82rem' }}>
                  {copiedExport ? <CheckIcon /> : <CopyIcon />} {copiedExport ? 'Copied!' : 'Copy JSON'}
                </button>
              </div>
            </div>

            <div className="section-divider" style={{ margin: '16px 0' }} />

            <div>
              <label className="field-label">Restore Data from JSON</label>
              <textarea
                className="textarea"
                style={{ minHeight: '110px', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', marginBottom: '10px' }}
                placeholder='Paste backup JSON content here {"version":"1.0","tasks":[...],"notes":[...]}'
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
              />

              {importError && (
                <div style={{ padding: '8px 12px', background: 'rgba(248, 81, 73, 0.15)', border: '1px solid rgba(248, 81, 73, 0.4)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-red)', fontSize: '0.8rem', marginBottom: '10px' }}>
                  {importError}
                </div>
              )}

              {importSuccess && (
                <div style={{ padding: '8px 12px', background: 'rgba(63, 185, 80, 0.15)', border: '1px solid rgba(63, 185, 80, 0.4)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-green)', fontSize: '0.8rem', marginBottom: '10px' }}>
                  {importSuccess}
                </div>
              )}

              <button
                type="button"
                className="btn btn-reset"
                style={{ width: '100%' }}
                onClick={handleImportJson}
                disabled={!importJson.trim()}
              >
                <UploadIcon /> Import JSON Data
              </button>
            </div>
          </div>
        </div>
      )}
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
                className={`nav-item-btn ${activeTool === 'secure-notes' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('secure-notes')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><ShieldCheckIcon /></span>
                Secure Notes & Tasks
                <span className="nav-badge" style={{ background: 'rgba(210, 153, 34, 0.15)', color: '#d29922' }}>Protected</span>
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
                    : activeTool === 'secure-notes'
                    ? { background: 'linear-gradient(135deg, #d29922, #9e6a03)', boxShadow: '0 2px 8px rgba(210, 153, 34, 0.35)' }
                    : {}
                }
              >
                {activeTool === 'hash-gen' ? <HashIcon /> : activeTool === 'secure-notes' ? <ShieldCheckIcon /> : <GitLabIcon />}
              </div>
              <div className="header-text">
                <h1>
                  {activeTool === 'hash-gen'
                    ? 'Hash:: Generator'
                    : activeTool === 'secure-notes'
                    ? 'Secure Dev Notes & Tasks'
                    : 'MR Description Generator'}
                </h1>
                <p>
                  {activeTool === 'hash-gen'
                    ? 'Generate Laravel Hash::make() compatible Bcrypt ($2y$) and Argon2id ($argon2id$) password hashes'
                    : activeTool === 'secure-notes'
                    ? 'Protected personal dev scratchpad & to-do tasks with access code lock'
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
                      Nyra Thread Link
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
          ) : activeTool === 'hash-gen' ? (
            <HashGeneratorTool />
          ) : (
            <SecureNotesTool />
          )}
        </main>

      </div>
    </div>
  )
}



