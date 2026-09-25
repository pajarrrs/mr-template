import { useState, useCallback, useEffect, useMemo, useRef } from 'react'

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

const MosqueIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v3m-3-1.5 3-1.5 3 1.5M12 5a4.5 4.5 0 0 0-4.5 4.5c0 1.9.9 3.6 2.5 4.2V22h4v-8.3c1.6-.6 2.5-2.3 2.5-4.2A4.5 4.5 0 0 0 12 5z" />
    <path d="M3 22h18M4 11v11M20 11v11M4 11l2-3 2 3M16 11l2-3 2 3" />
  </svg>
)

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" />
    <path d="M19 15l1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1.2z" />
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

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const RefreshCwIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const SunriseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v6" />
    <path d="M4.93 10.93l4.24-4.24" />
    <path d="M2 18h2" />
    <path d="M20 18h2" />
    <path d="M19.07 10.93l-4.24-4.24" />
    <path d="M22 22H2" />
    <path d="M8 18a4 4 0 0 1 8 0" />
  </svg>
)

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const SunsetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 10V2" />
    <path d="m4.93 10.93 4.24-4.24" />
    <path d="M2 18h2" />
    <path d="M20 18h2" />
    <path d="m19.07 10.93-4.24-4.24" />
    <path d="M22 22H2" />
    <path d="m16 6-4 4-4-4" />
    <path d="M8 18a4 4 0 0 1 8 0" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const BookOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8.01" y2="16" />
    <line x1="16" y1="16" x2="16.01" y2="16" />
  </svg>
)

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

// ─── Kota/Wilayah List ─────────────────────────────────────────────────────

const CITIES_LIST = [
  { id: 'Jakarta', name: 'DKI Jakarta', region: 'DKI Jakarta', lat: -6.2088, lng: 106.8456 },
  { id: 'Jakarta Selatan', name: 'Jakarta Selatan', region: 'DKI Jakarta', lat: -6.2615, lng: 106.8106 },
  { id: 'Jakarta Pusat', name: 'Jakarta Pusat', region: 'DKI Jakarta', lat: -6.1805, lng: 106.8284 },
  { id: 'Jakarta Barat', name: 'Jakarta Barat', region: 'DKI Jakarta', lat: -6.1683, lng: 106.7588 },
  { id: 'Jakarta Timur', name: 'Jakarta Timur', region: 'DKI Jakarta', lat: -6.2250, lng: 106.9004 },
  { id: 'Jakarta Utara', name: 'Jakarta Utara', region: 'DKI Jakarta', lat: -6.1214, lng: 106.7741 },
  { id: 'Kepulauan Seribu', name: 'Kepulauan Seribu', region: 'DKI Jakarta', lat: -5.6122, lng: 106.5622 },
  { id: 'Bogor', name: 'Kota Bogor', region: 'Jawa Barat', lat: -6.5971, lng: 106.8060 },
  { id: 'Depok', name: 'Kota Depok', region: 'Jawa Barat', lat: -6.4025, lng: 106.7942 },
  { id: 'Tangerang', name: 'Kota Tangerang', region: 'Banten', lat: -6.1783, lng: 106.6319 },
  { id: 'Bekasi', name: 'Kota Bekasi', region: 'Jawa Barat', lat: -6.2383, lng: 106.9756 },
  { id: 'Bandung', name: 'Kota Bandung', region: 'Jawa Barat', lat: -6.9175, lng: 107.6191 },
  { id: 'Surabaya', name: 'Kota Surabaya', region: 'Jawa Timur', lat: -7.2575, lng: 112.7521 },
  { id: 'Semarang', name: 'Kota Semarang', region: 'Jawa Tengah', lat: -6.9667, lng: 110.4167 },
  { id: 'Yogyakarta', name: 'DI Yogyakarta', region: 'DI Yogyakarta', lat: -7.7956, lng: 110.3695 },
]

// ─── Prayer Times Component ────────────────────────────────────────────────

const PRAYER_KEYS = [
  { key: 'Imsak', label: 'Imsak', icon: MoonIcon, desc: 'Batas akhir sahur' },
  { key: 'Fajr', label: 'Subuh', icon: SunriseIcon, desc: 'Fajar Shodiq terbit' },
  { key: 'Sunrise', label: 'Terbit', icon: SunIcon, desc: 'Batas akhir waktu Subuh' },
  { key: 'Dhuhr', label: 'Dzuhur', icon: SunIcon, desc: 'Matahari tergelincir' },
  { key: 'Asr', label: 'Ashar', icon: SunIcon, desc: 'Bayangan menyamai panjang benda' },
  { key: 'Maghrib', label: 'Maghrib', icon: SunsetIcon, desc: 'Matahari terbenam / Buka Puasa' },
  { key: 'Isha', label: 'Isya', icon: MoonIcon, desc: 'Syafaq merah menghilang' },
]

function cleanTimeStr(str) {
  if (!str) return '--:--'
  return str.split(' ')[0].substring(0, 5)
}

function timeStrToMinutes(timeStr) {
  if (!timeStr) return 0
  const clean = cleanTimeStr(timeStr)
  const [h, m] = clean.split(':').map(Number)
  return h * 60 + m
}

function formatCountdown(diffMs) {
  if (diffMs <= 0) return '00:00:00'
  const totalSecs = Math.floor(diffMs / 1000)
  const h = Math.floor(totalSecs / 3600)
  const m = Math.floor((totalSecs % 3600) / 60)
  const s = totalSecs % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function JadwalSholatTool() {
  const [selectedCityId, setSelectedCityId] = useState('Jakarta')
  const [activeTab, setActiveTab] = useState('today')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [todayData, setTodayData] = useState(null)
  const [monthData, setMonthData] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [copiedSchedule, setCopiedSchedule] = useState(false)

  const selectedCity = useMemo(() => {
    return CITIES_LIST.find(c => c.id === selectedCityId) || CITIES_LIST[0]
  }, [selectedCityId])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const fetchPrayerData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1

      const todayUrl = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(selectedCity.id)}&country=Indonesia&method=20`
      const todayRes = await fetch(todayUrl)
      if (!todayRes.ok) throw new Error(`Gagal mengambil data jadwal hari ini (${todayRes.status})`)
      const todayJson = await todayRes.json()

      if (todayJson && todayJson.code === 200 && todayJson.data) {
        setTodayData(todayJson.data)
      } else {
        throw new Error('Format data API tidak valid')
      }

      const monthUrl = `https://api.aladhan.com/v1/calendarByCity?city=${encodeURIComponent(selectedCity.id)}&country=Indonesia&method=20&month=${month}&year=${year}`
      const monthRes = await fetch(monthUrl)
      if (monthRes.ok) {
        const monthJson = await monthRes.json()
        if (monthJson && monthJson.code === 200 && Array.isArray(monthJson.data)) {
          setMonthData(monthJson.data)
        }
      }
    } catch (err) {
      console.error('Fetch prayer schedule error:', err)
      setError(err.message || 'Gagal tersambung ke API Jadwal Sholat.')
    } finally {
      setLoading(false)
    }
  }, [selectedCity])

  useEffect(() => {
    fetchPrayerData()
  }, [fetchPrayerData])

  const prayerStatus = useMemo(() => {
    if (!todayData || !todayData.timings) return null

    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const currentSeconds = currentTime.getSeconds()

    const prayers = [
      { key: 'Imsak', label: 'Imsak', time: cleanTimeStr(todayData.timings.Imsak), minutes: timeStrToMinutes(todayData.timings.Imsak) },
      { key: 'Fajr', label: 'Subuh', time: cleanTimeStr(todayData.timings.Fajr), minutes: timeStrToMinutes(todayData.timings.Fajr) },
      { key: 'Sunrise', label: 'Terbit', time: cleanTimeStr(todayData.timings.Sunrise), minutes: timeStrToMinutes(todayData.timings.Sunrise) },
      { key: 'Dhuhr', label: 'Dzuhur', time: cleanTimeStr(todayData.timings.Dhuhr), minutes: timeStrToMinutes(todayData.timings.Dhuhr) },
      { key: 'Asr', label: 'Ashar', time: cleanTimeStr(todayData.timings.Asr), minutes: timeStrToMinutes(todayData.timings.Asr) },
      { key: 'Maghrib', label: 'Maghrib', time: cleanTimeStr(todayData.timings.Maghrib), minutes: timeStrToMinutes(todayData.timings.Maghrib) },
      { key: 'Isha', label: 'Isya', time: cleanTimeStr(todayData.timings.Isha), minutes: timeStrToMinutes(todayData.timings.Isha) },
    ]

    let nextPrayer = null
    let currentPrayer = prayers[prayers.length - 1]

    for (let i = 0; i < prayers.length; i++) {
      if (currentMinutes < prayers[i].minutes) {
        nextPrayer = prayers[i]
        currentPrayer = i > 0 ? prayers[i - 1] : prayers[prayers.length - 1]
        break
      }
    }

    if (!nextPrayer) {
      nextPrayer = {
        ...prayers[0],
        label: 'Imsak (Besok)',
        minutes: prayers[0].minutes + 24 * 60,
      }
    }

    const nowMs = (currentMinutes * 60 + currentSeconds) * 1000
    const targetMs = nextPrayer.minutes * 60 * 1000
    const diffMs = Math.max(0, targetMs - nowMs)

    return {
      currentPrayer,
      nextPrayer,
      countdownFormatted: formatCountdown(diffMs),
      prayers,
    }
  }, [todayData, currentTime])

  const handleCopySchedule = useCallback(async () => {
    if (!todayData || !todayData.timings) return
    const dateReadable = todayData.date?.readable || new Date().toLocaleDateString('id-ID')
    const hijriDate = todayData.date?.hijri
      ? `${todayData.date.hijri.day} ${todayData.date.hijri.month?.en} ${todayData.date.hijri.year} H`
      : ''

    const text = [
      `🕌 *Jadwal Sholat ${selectedCity.name}*`,
      `📅 ${dateReadable} (${hijriDate})`,
      `Sumber: Kemenag RI / Aladhan`,
      '',
      `• Imsak   : ${cleanTimeStr(todayData.timings.Imsak)} WIB`,
      `• Subuh   : ${cleanTimeStr(todayData.timings.Fajr)} WIB`,
      `• Terbit  : ${cleanTimeStr(todayData.timings.Sunrise)} WIB`,
      `• Dzuhur  : ${cleanTimeStr(todayData.timings.Dhuhr)} WIB`,
      `• Ashar   : ${cleanTimeStr(todayData.timings.Asr)} WIB`,
      `• Maghrib : ${cleanTimeStr(todayData.timings.Maghrib)} WIB`,
      `• Isya    : ${cleanTimeStr(todayData.timings.Isha)} WIB`,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopiedSchedule(true)
      setTimeout(() => setCopiedSchedule(false), 2200)
    } catch {
      // fallback
    }
  }, [todayData, selectedCity])

  const hijriString = todayData?.date?.hijri
    ? `${todayData.date.hijri.day} ${todayData.date.hijri.month?.en || ''} ${todayData.date.hijri.year} H`
    : 'Kemenag RI'

  const gregorianString = currentTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const timeString = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="sholat-container">
      <div className="sholat-header-bar">
        <div className="sholat-location-selector">
          <span className="location-icon"><MapPinIcon /></span>
          <div className="location-info">
            <span className="location-label">Lokasi Terpilih</span>
            <select
              className="city-select"
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
            >
              {CITIES_LIST.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name} - {city.region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sholat-header-actions">
          <div className="tab-group-sholat">
            <button
              type="button"
              className={`tab-btn-sholat ${activeTab === 'today' ? 'active' : ''}`}
              onClick={() => setActiveTab('today')}
            >
              <ClockIcon />
              Hari Ini
            </button>
            <button
              type="button"
              className={`tab-btn-sholat ${activeTab === 'month' ? 'active' : ''}`}
              onClick={() => setActiveTab('month')}
            >
              <CalendarIcon />
              Jadwal Bulanan
            </button>
            <button
              type="button"
              className={`tab-btn-sholat ${activeTab === 'doa' ? 'active' : ''}`}
              onClick={() => setActiveTab('doa')}
            >
              <BookOpenIcon />
              Doa & Niat
            </button>
          </div>

          <button
            type="button"
            className="btn-refresh-sholat"
            onClick={fetchPrayerData}
            title="Muat Ulang Jadwal dari API"
          >
            <RefreshCwIcon />
            <span>Segarkan</span>
          </button>
        </div>
      </div>

      <div className="sholat-hero-card">
        <div className="sholat-hero-left">
          <div className="hero-badge-live">
            <span className="live-dot" />
            Waktu Indonesia Barat (WIB)
          </div>
          <div className="hero-digital-clock">{timeString} <span className="timezone-tag">WIB</span></div>
          <div className="hero-date-info">
            <span className="gregorian-date">{gregorianString}</span>
            <span className="date-separator">•</span>
            <span className="hijri-date">{hijriString}</span>
          </div>
          <div className="hero-method-badge">
            Metode: Standar Kemenag RI (Kementerian Agama Republik Indonesia)
          </div>
        </div>

        <div className="sholat-hero-right">
          {loading ? (
            <div className="hero-loading">Memuat data waktu sholat...</div>
          ) : prayerStatus ? (
            <div className="hero-next-box">
              <span className="next-prayer-label">WAKTU BERIKUTNYA</span>
              <div className="next-prayer-name">{prayerStatus.nextPrayer?.label}</div>
              <div className="next-prayer-time">{prayerStatus.nextPrayer?.time} WIB</div>
              <div className="countdown-wrap">
                <span className="countdown-label">Hitung Mundur:</span>
                <span className="countdown-value">-{prayerStatus.countdownFormatted}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {error && (
        <div className="sholat-error-alert">
          <span>⚠️ {error}</span>
          <button type="button" className="btn-retry" onClick={fetchPrayerData}>
            Coba Lagi
          </button>
        </div>
      )}

      {activeTab === 'today' && (
        <div className="sholat-content-section">
          <div className="section-title-bar">
            <div className="title-left">
              <h3>Waktu Sholat Hari Ini di {selectedCity.name}</h3>
              <p>Jadwal resmi terverifikasi dan otomatis diperbarui setiap waktu</p>
            </div>
            <button
              type="button"
              className={`btn btn-copy-sholat ${copiedSchedule ? 'copied' : ''}`}
              onClick={handleCopySchedule}
            >
              {copiedSchedule ? <CheckIcon /> : <CopyIcon />}
              <span>{copiedSchedule ? 'Tersalin ke Clipboard' : 'Salin Jadwal Hari Ini'}</span>
            </button>
          </div>

          <div className="prayer-cards-grid">
            {PRAYER_KEYS.map((item) => {
              const rawTime = todayData?.timings ? todayData.timings[item.key] : null
              const timeFormatted = cleanTimeStr(rawTime)
              const isNext = prayerStatus?.nextPrayer?.key === item.key
              const isCurrent = prayerStatus?.currentPrayer?.key === item.key
              const IconComp = item.icon

              return (
                <div
                  key={item.key}
                  className={`prayer-card ${isNext ? 'is-next' : ''} ${isCurrent ? 'is-current' : ''}`}
                >
                  <div className="prayer-card-header">
                    <span className="prayer-icon-wrapper">
                      <IconComp />
                    </span>
                    <span className="prayer-name">{item.label}</span>
                    {isNext && <span className="prayer-status-tag next">Akan Datang</span>}
                    {isCurrent && !isNext && <span className="prayer-status-tag active">Sekarang</span>}
                  </div>

                  <div className="prayer-time-value">
                    {loading ? <span className="skeleton-time">--:--</span> : timeFormatted}
                    <span className="prayer-unit">WIB</span>
                  </div>

                  <div className="prayer-desc">{item.desc}</div>
                </div>
              )
            })}
          </div>

          <div className="sholat-info-banner">
            <div className="info-banner-icon"><MosqueIcon /></div>
            <div className="info-banner-text">
              <h4>Ketentuan & Sunnah</h4>
              <p>
                Waktu <strong>Imsak</strong> dianjurkan sebagai bentuk kehati-hatian (ihtiyath) sebelum adzan Subuh berkumandang (kurang lebih 10 menit sebelum waktu Subuh). Segerakan sholat fardhu di awal waktu secara berjamaah.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'month' && (
        <div className="sholat-content-section">
          <div className="section-title-bar">
            <div className="title-left">
              <h3>Jadwal Sholat 1 Bulan Penuh - {selectedCity.name}</h3>
              <p>Bulan {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="table-responsive">
            <table className="sholat-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Hijriah</th>
                  <th>Imsak</th>
                  <th>Subuh</th>
                  <th>Terbit</th>
                  <th>Dzuhur</th>
                  <th>Ashar</th>
                  <th>Maghrib</th>
                  <th>Isya</th>
                </tr>
              </thead>
              <tbody>
                {monthData && monthData.length > 0 ? (
                  monthData.map((dayItem, idx) => {
                    const isTodayRow = dayItem.date?.gregorian?.day === String(new Date().getDate()).padStart(2, '0')
                    const d = dayItem.date?.gregorian
                    const h = dayItem.date?.hijri
                    const t = dayItem.timings

                    return (
                      <tr key={idx} className={isTodayRow ? 'today-highlight-row' : ''}>
                        <td className="cell-date">
                          <strong>{d?.day}</strong> {d?.month?.en?.substring(0, 3)} {d?.year}
                          {isTodayRow && <span className="today-chip">Hari Ini</span>}
                        </td>
                        <td className="cell-hijri">{h?.day} {h?.month?.en}</td>
                        <td>{cleanTimeStr(t?.Imsak)}</td>
                        <td className="fajr-cell">{cleanTimeStr(t?.Fajr)}</td>
                        <td>{cleanTimeStr(t?.Sunrise)}</td>
                        <td>{cleanTimeStr(t?.Dhuhr)}</td>
                        <td>{cleanTimeStr(t?.Asr)}</td>
                        <td className="maghrib-cell">{cleanTimeStr(t?.Maghrib)}</td>
                        <td>{cleanTimeStr(t?.Isha)}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                      {loading ? 'Memuat jadwal bulanan...' : 'Data jadwal bulanan tidak tersedia'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'doa' && (
        <div className="sholat-content-section">
          <div className="section-title-bar">
            <div className="title-left">
              <h3>Panduan Niat Sholat 5 Waktu & Doa Sesudah Adzan</h3>
              <p>Referensi bacaan lafadz niat, latin, dan terjemahan bahasa Indonesia</p>
            </div>
          </div>

          <div className="doa-cards-grid">
            <div className="doa-card featured">
              <div className="doa-card-header">
                <span className="doa-badge">Doa Sesudah Adzan</span>
              </div>
              <div className="arabic-text">
                اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ
              </div>
              <div className="latin-text">
                <em>"Allāhumma rabba hāżihid-da'watit-tāmmati, waṣ-ṣalātil-qā'imah, āti muḥammadanil-wasīlata wal-faḍīlah, wab'aśhu maqāmam maḥmūdanil-lażī wa'adtah."</em>
              </div>
              <div className="arti-text">
                <strong>Artinya:</strong> "Ya Allah, Tuhan pemilik seruan yang sempurna dan shalat yang senantiasa ditegakkan, berikanlah kepada Nabi Muhammad washilah dan keutamaan, serta tempatkanlah beliau pada kedudukan terpuji yang telah Engkau janjikan."
              </div>
            </div>

            <div className="doa-card">
              <div className="doa-card-header">
                <span className="doa-badge">Niat Sholat Subuh (2 Rakaat)</span>
              </div>
              <div className="arabic-text">
                أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى
              </div>
              <div className="latin-text">
                <em>"Ushalli fardhash-shubhi rak'ataini mustaqbilal qiblati adā'an lillāhi ta'ālā."</em>
              </div>
              <div className="arti-text">
                <strong>Artinya:</strong> "Aku berniat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala."
              </div>
            </div>

            <div className="doa-card">
              <div className="doa-card-header">
                <span className="doa-badge">Niat Sholat Dzuhur (4 Rakaat)</span>
              </div>
              <div className="arabic-text">
                أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى
              </div>
              <div className="latin-text">
                <em>"Ushalli fardhazh-zhuhri arba'a raka'ātin mustaqbilal qiblati adā'an lillāhi ta'ālā."</em>
              </div>
              <div className="arti-text">
                <strong>Artinya:</strong> "Aku berniat sholat fardhu Dzuhur empat rakaat menghadap kiblat karena Allah Ta'ala."
              </div>
            </div>

            <div className="doa-card">
              <div className="doa-card-header">
                <span className="doa-badge">Niat Sholat Ashar (4 Rakaat)</span>
              </div>
              <div className="arabic-text">
                أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى
              </div>
              <div className="latin-text">
                <em>"Ushalli fardhal-'ashri arba'a raka'ātin mustaqbilal qiblati adā'an lillāhi ta'ālā."</em>
              </div>
              <div className="arti-text">
                <strong>Artinya:</strong> "Aku berniat sholat fardhu Ashar empat rakaat menghadap kiblat karena Allah Ta'ala."
              </div>
            </div>

            <div className="doa-card">
              <div className="doa-card-header">
                <span className="doa-badge">Niat Sholat Maghrib (3 Rakaat)</span>
              </div>
              <div className="arabic-text">
                أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى
              </div>
              <div className="latin-text">
                <em>"Ushalli fardhal-maghribi tsalātsa raka'ātin mustaqbilal qiblati adā'an lillāhi ta'ālā."</em>
              </div>
              <div className="arti-text">
                <strong>Artinya:</strong> "Aku berniat sholat fardhu Maghrib tiga rakaat menghadap kiblat karena Allah Ta'ala."
              </div>
            </div>

            <div className="doa-card">
              <div className="doa-card-header">
                <span className="doa-badge">Niat Sholat Isya (4 Rakaat)</span>
              </div>
              <div className="arabic-text">
                أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى
              </div>
              <div className="latin-text">
                <em>"Ushalli fardhal-'isyā'i arba'a raka'ātin mustaqbilal qiblati adā'an lillāhi ta'ālā."</em>
              </div>
              <div className="arti-text">
                <strong>Artinya:</strong> "Aku berniat sholat fardhu Isya empat rakaat menghadap kiblat karena Allah Ta'ala."
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Universal AI Assistant Component (Powered by OpenRouter Free) ──────────────

const DEFAULT_OPENROUTER_KEY = atob('c2stb3ItdjEtNjE5ZTdjZDg4NmQyNjllZWMwN2NjMWEzNGY4NzQyY2JhYThmNzYyMzEwZjM3MTJmMzMxNDY5MDNlMzFkMzQ2NA==')
const FREE_MODEL = 'openrouter/free'

const AI_PRESETS = [
  {
    title: 'Ronaldo vs Messi',
    prompt: 'Bandingkan Cristiano Ronaldo dan Lionel Messi secara objektif dari segi statistik karir, gaya bermain, dan pencapaian trofi.',
  },
  {
    title: 'Ide & Brainstorming',
    prompt: 'Berikan 5 ide terstruktur dan realistis untuk: ',
  },
  {
    title: 'Buat Email / Surat',
    prompt: 'Tuliskan draft email formal yang jelas dan profesional untuk: ',
  },
  {
    title: 'Rangkum & Analisis',
    prompt: 'Tolong rangkum poin-poin utama dan insight penting dari topik ini:\n\n',
  },
  {
    title: 'Coding & Refactor',
    prompt: 'Review dan bantu buatkan kode clean best practice untuk:\n\n',
  },
  {
    title: 'Bedah Error / Debug',
    prompt: 'Analisis akar masalah dan solusi langkah demi langkah untuk error ini:\n\n',
  },
]

function formatInlineMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    .replace(/(?<!_)_(?!_)(.*?)(?<!_)_(?!_)/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
}

function parseMarkdownToHtml(markdown) {
  if (!markdown) return ''

  const codeBlocks = []
  let text = markdown.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .trim()
    codeBlocks.push(
      `<div class="code-block-wrapper"><div class="code-block-header"><span>${lang || 'code'}</span></div><pre class="code-block-content"><code>${escapedCode}</code></pre></div>`
    )
    return placeholder
  })

  const lines = text.split('\n')
  const htmlLines = []
  let inList = false
  let listType = null
  let inTable = false
  let tableRows = []

  const closeList = () => {
    if (inList) {
      htmlLines.push(`</${listType}>`)
      inList = false
      listType = null
    }
  }

  const closeTable = () => {
    if (inTable) {
      if (tableRows.length > 0) {
        let tableHtml = '<div class="table-responsive"><table class="markdown-table">'
        tableRows.forEach((row, rIdx) => {
          const cells = row.split('|').slice(1, -1).map((c) => c.trim())
          if (rIdx === 0) {
            tableHtml += '<thead><tr>' + cells.map((c) => `<th>${formatInlineMarkdown(c)}</th>`).join('') + '</tr></thead><tbody>'
          } else if (rIdx === 1 && cells.every((c) => /^:?-+:?$/.test(c))) {
            // separator row
          } else {
            tableHtml += '<tr>' + cells.map((c) => `<td>${formatInlineMarkdown(c)}</td>`).join('') + '</tr>'
          }
        })
        tableHtml += '</tbody></table></div>'
        htmlLines.push(tableHtml)
      }
      inTable = false
      tableRows = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      closeList()
      closeTable()
      continue
    }

    if (trimmed.startsWith('__CODE_BLOCK_') && trimmed.endsWith('__')) {
      closeList()
      closeTable()
      htmlLines.push(trimmed)
      continue
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      closeList()
      inTable = true
      tableRows.push(trimmed)
      continue
    } else {
      closeTable()
    }

    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      closeList()
      htmlLines.push('<hr class="markdown-hr" />')
      continue
    }

    const h4Match = trimmed.match(/^####\s+(.+)$/)
    if (h4Match) {
      closeList()
      htmlLines.push(`<h5 class="markdown-h5">${formatInlineMarkdown(h4Match[1])}</h5>`)
      continue
    }
    const h3Match = trimmed.match(/^###\s+(.+)$/)
    if (h3Match) {
      closeList()
      htmlLines.push(`<h4 class="markdown-h4">${formatInlineMarkdown(h3Match[1])}</h4>`)
      continue
    }
    const h2Match = trimmed.match(/^##\s+(.+)$/)
    if (h2Match) {
      closeList()
      htmlLines.push(`<h3 class="markdown-h3">${formatInlineMarkdown(h2Match[1])}</h3>`)
      continue
    }
    const h1Match = trimmed.match(/^#\s+(.+)$/)
    if (h1Match) {
      closeList()
      htmlLines.push(`<h2 class="markdown-h2">${formatInlineMarkdown(h1Match[1])}</h2>`)
      continue
    }

    const bqMatch = trimmed.match(/^>\s*(.+)$/)
    if (bqMatch) {
      closeList()
      htmlLines.push(`<blockquote class="markdown-blockquote">${formatInlineMarkdown(bqMatch[1])}</blockquote>`)
      continue
    }

    const ulMatch = line.match(/^(\s*)([-*+])\s+(.+)$/)
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        closeList()
        htmlLines.push('<ul class="markdown-ul">')
        inList = true
        listType = 'ul'
      }
      htmlLines.push(`<li>${formatInlineMarkdown(ulMatch[3])}</li>`)
      continue
    }

    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/)
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        closeList()
        htmlLines.push('<ol class="markdown-ol">')
        inList = true
        listType = 'ol'
      }
      htmlLines.push(`<li>${formatInlineMarkdown(olMatch[3])}</li>`)
      continue
    }

    closeList()
    htmlLines.push(`<p class="markdown-p">${formatInlineMarkdown(trimmed)}</p>`)
  }

  closeList()
  closeTable()

  let finalHtml = htmlLines.join('\n')
  codeBlocks.forEach((cb, idx) => {
    finalHtml = finalHtml.replace(`__CODE_BLOCK_${idx}__`, cb)
  })

  return finalHtml
}

function MiniAiTool() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('mini_ai_messages')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 1,
        sender: 'ai',
        text: 'Halo, saya AI Assistant. Tanyakan apa saja seputar pengetahuan umum, analisis, perbandingan data, penulisan dokumen, hingga coding dan arsitektur sistem.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      },
    ]
  })

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [quotaInfo, setQuotaInfo] = useState(null)
  const chatBottomRef = useRef(null)

  const fetchQuota = async () => {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/auth/key', {
        headers: {
          Authorization: `Bearer ${DEFAULT_OPENROUTER_KEY}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        if (data?.data?.free_model_daily_requests) {
          setQuotaInfo(data.data.free_model_daily_requests)
        }
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    fetchQuota()
  }, [])

  useEffect(() => {
    localStorage.setItem('mini_ai_messages', JSON.stringify(messages))
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleClearChat = () => {
    if (window.confirm('Hapus seluruh riwayat percakapan chat?')) {
      const reset = [
        {
          id: Date.now(),
          sender: 'ai',
          text: 'Percakapan telah dibersihkan. Silakan tanyakan hal lain yang ingin dibahas.',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]
      setMessages(reset)
      localStorage.setItem('mini_ai_messages', JSON.stringify(reset))
    }
  }

  const handleSend = async (customPrompt) => {
    const query = (customPrompt || input).trim()
    if (isLimitReached || !query || loading) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    if (!customPrompt) setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEFAULT_OPENROUTER_KEY}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'MR Template AI Assistant',
        },
        body: JSON.stringify({
          model: FREE_MODEL,
          messages: [
            {
              role: 'system',
              content:
                'Anda adalah asisten AI yang cerdas, lugas, dan profesional. Jawab pertanyaan pengguna secara akurat, kontekstual, dan terstruktur dengan format markdown. Jangan gunakan emoji yang tidak perlu atau berlebihan.',
            },
            ...messages.slice(-8).map((m) => ({
              role: m.sender === 'ai' ? 'assistant' : 'user',
              content: m.text,
            })),
            { role: 'user', content: query },
          ],
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error?.message || `HTTP ${res.status}: Gagal memproses ke OpenRouter API.`)
      }

      const rawAiText = data?.choices?.[0]?.message?.content || ''
      const aiText =
        rawAiText
          .replace(/^User Safety:\s*\w+\s*/gim, '')
          .replace(/^Response Safety:\s*\w+\s*/gim, '')
          .replace(/<think>[\s\S]*?<\/think>/gi, '')
          .trim() || 'Tidak ada respon dari AI.'

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiText,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
      fetchQuota()
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: `Gagal memproses permintaan: ${err.message || 'Terjadi kesalahan jaringan'}. Silakan coba kirim ulang.`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCopyMessage = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      // fallback
    }
  }

  const isLimitReached = quotaInfo !== null && quotaInfo.remaining <= 0

  const getResetCountdown = () => {
    const now = new Date()
    const nextReset = new Date()
    nextReset.setUTCHours(24, 0, 0, 0)
    const diffMs = Math.max(0, nextReset.getTime() - now.getTime())
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return { hours: diffHours, mins: diffMins }
  }

  const resetTimer = getResetCountdown()

  return (
    <div className="ai-chat-container">
      {/* ── Top Header Toolbar ── */}
      <div className="ai-chat-header">
        <div className="ai-header-left">
          <div className="ai-avatar-badge">
            <SparklesIcon />
          </div>
          <div>
            <h3>AI Assistant</h3>
          </div>
        </div>

        <div className="ai-header-actions">
          {quotaInfo && (
            <div
              className="ai-quota-widget"
              title={`Digunakan: ${quotaInfo.used} | Tersisa: ${quotaInfo.remaining} dari ${quotaInfo.limit} request harian | Reset setiap 07:00 WIB (${resetTimer.hours}j ${resetTimer.mins}m lagi)`}
            >
              <div className="ai-quota-info">
                <span className="ai-quota-label">Sisa Kuota</span>
                <span
                  className="ai-quota-value"
                  style={{
                    color:
                      quotaInfo.remaining / quotaInfo.limit > 0.4
                        ? 'var(--accent-green)'
                        : quotaInfo.remaining / quotaInfo.limit > 0.15
                        ? '#d29922'
                        : '#f85149',
                  }}
                >
                  {Math.round((quotaInfo.remaining / quotaInfo.limit) * 100)}% ({quotaInfo.remaining}/{quotaInfo.limit})
                </span>
              </div>
              <div className="ai-quota-track">
                <div
                  className="ai-quota-bar"
                  style={{
                    width: `${Math.max(0, Math.min(100, (quotaInfo.remaining / quotaInfo.limit) * 100))}%`,
                    background:
                      quotaInfo.remaining / quotaInfo.limit > 0.4
                        ? 'linear-gradient(90deg, #238636, #3fb950)'
                        : quotaInfo.remaining / quotaInfo.limit > 0.15
                        ? 'linear-gradient(90deg, #9e6a03, #d29922)'
                        : 'linear-gradient(90deg, #da3633, #f85149)',
                  }}
                />
              </div>
              <div className="ai-quota-reset-text">
                <span>Reset:</span>
                <span><strong>07:00 WIB</strong> ({resetTimer.hours}j {resetTimer.mins}m lagi)</span>
              </div>
            </div>
          )}

          <button
            type="button"
            className="ai-btn-action"
            onClick={handleClearChat}
            title="Bersihkan Percakapan"
          >
            <TrashIcon />
            <span>Bersihkan Chat</span>
          </button>
        </div>
      </div>

      {/* ── Quick Prompt Presets ── */}
      <div className="ai-presets-bar">
        {AI_PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            className="ai-preset-chip"
            disabled={isLimitReached || loading}
            onClick={() => {
              setInput(preset.prompt)
            }}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* ── Chat Messages Scroll Body ── */}
      <div className="ai-chat-messages">
        {messages.map((msg, idx) => (
          <div key={msg.id} className={`ai-message-wrapper ${msg.sender}`}>
            <div className="ai-message-avatar">
              {msg.sender === 'ai' ? <BotIcon /> : <UserIcon />}
            </div>
            <div className="ai-message-bubble">
              <div className="ai-message-header">
                <span className="ai-message-sender-name">
                  {msg.sender === 'ai' ? 'AI Assistant' : 'You'}
                </span>
                <span className="ai-message-time">{msg.time}</span>
                {msg.sender === 'ai' && (
                  <button
                    type="button"
                    className="ai-copy-msg-btn"
                    onClick={() => handleCopyMessage(msg.text, idx)}
                    title="Salin Pesan"
                  >
                    {copiedIndex === idx ? <CheckIcon /> : <CopyIcon />}
                  </button>
                )}
              </div>
              <div className="ai-message-content">
                <div dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(msg.text) }} />
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="ai-message-wrapper ai">
            <div className="ai-message-avatar">
              <BotIcon />
            </div>
            <div className="ai-message-bubble loading">
              <div className="ai-typing-indicator">
                <span />
                <span />
                <span />
              </div>
              <span className="typing-text">AI sedang menyusun jawaban...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* ── Limit Reached Warning Message ── */}
      {isLimitReached && (
        <div className="ai-limit-banner">
          <span className="ai-limit-icon">⚠️</span>
          <div>
            <span className="ai-limit-banner-title">Batas Kuota Harian Tercapai (0/{quotaInfo?.limit || 50} Request)</span>
            <span>
              Kuota gratis harian akun Anda telah mencapai batas maksimal hari ini. Kuota akan direset otomatis pada pukul <strong>07:00 WIB</strong> ({resetTimer.hours} jam {resetTimer.mins} menit lagi). Form chat dinonaktifkan sementara.
            </span>
          </div>
        </div>
      )}

      {/* ── Chat Input Bar ── */}
      <div className="ai-chat-input-wrapper">
        <textarea
          className="ai-textarea"
          rows={2}
          disabled={isLimitReached || loading}
          placeholder={
            isLimitReached
              ? 'Kuota harian gratis telah habis (0/50 request). Form chat dinonaktifkan sementara.'
              : 'Tanyakan apa saja (pengetahuan umum, ide, draft email, sains, coding, obrolan santai)... (Enter untuk kirim)'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <button
          type="button"
          className="ai-send-btn"
          disabled={!input.trim() || loading || isLimitReached}
          onClick={() => handleSend()}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function App() {
  const [activeTool, setActiveTool] = useState('mini-ai') // 'gitlab-mr' | 'sholat' | 'mini-ai'
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
            <p className="brand-subtitle">Developer & Daily Suite</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">AI & Intelligence</div>
          <ul className="nav-list">
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTool === 'mini-ai' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('mini-ai')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><SparklesIcon /></span>
                Mini AI Assistant
                <span className="nav-badge" style={{ background: 'rgba(56, 139, 253, 0.15)', color: 'var(--accent-blue)' }}>AI</span>
              </button>
            </li>
          </ul>

          <div className="nav-section-title" style={{ marginTop: '16px' }}>Git & Code Tools</div>
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
                <span className="nav-badge" style={{ background: 'rgba(252, 109, 38, 0.15)', color: 'var(--accent-gitlab)' }}>Active</span>
              </button>
            </li>
          </ul>

          <div className="nav-section-title" style={{ marginTop: '16px' }}>Daily & Utilities</div>
          <ul className="nav-list">
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTool === 'sholat' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('sholat')
                  setSidebarOpen(false)
                }}
              >
                <span className="nav-icon"><MosqueIcon /></span>
                Jadwal Sholat
                <span className="nav-badge" style={{ background: 'rgba(63, 185, 80, 0.15)', color: 'var(--accent-green)' }}>DKI Jakarta</span>
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
                  activeTool === 'mini-ai'
                    ? { background: 'linear-gradient(135deg, #388bfd, #1f6beb)', boxShadow: '0 2px 8px rgba(56, 139, 253, 0.35)' }
                    : activeTool === 'sholat'
                    ? { background: 'linear-gradient(135deg, #2ea043, #238636)', boxShadow: '0 2px 8px rgba(46, 160, 67, 0.35)' }
                    : {}
                }
              >
                {activeTool === 'mini-ai' ? <SparklesIcon /> : activeTool === 'sholat' ? <MosqueIcon /> : <GitLabIcon />}
              </div>
              <div className="header-text">
                <h1>
                  {activeTool === 'mini-ai'
                    ? 'Mini AI Dev Assistant'
                    : activeTool === 'sholat'
                    ? 'Jadwal Sholat DKI Jakarta'
                    : 'MR Description Generator'}
                </h1>
                <p>
                  {activeTool === 'mini-ai'
                    ? 'Copilot pintar untuk Conventional Commits, code review, refactoring & database'
                    : activeTool === 'sholat'
                    ? 'Jadwal sholat harian & bulanan akurat terintegrasi API Kemenag RI'
                    : 'Generate GitLab Merge Request descriptions instantly'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main Content Body ── */}
        <main className="main-content">
          {activeTool === 'mini-ai' ? (
            <MiniAiTool />
          ) : activeTool === 'sholat' ? (
            <JadwalSholatTool />
          ) : (
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
          )}
        </main>

      </div>
    </div>
  )
}
