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

// ─── Mini AI Dev Assistant Component ───────────────────────────────────────

const AI_PRESETS = [
  {
    title: 'Conventional Commit',
    prompt: 'Bantu buatkan Conventional Commit message yang rapi dan deskriptif dari perubahan kode berikut:\n\n',
  },
  {
    title: 'Refactor Clean Code',
    prompt: 'Tolong review dan refactor potongan kode berikut agar lebih clean, mengikuti PSR-12/ES6+, dan bebas bad smells:\n\n',
  },
  {
    title: 'Laravel Migration Generator',
    prompt: 'Ubah definisi kolom database atau SQL CREATE TABLE berikut menjadi Laravel Schema Migration ($table->...):\n\n',
  },
  {
    title: 'Generate Unit Test',
    prompt: 'Buatkan unit test lengkap (happy path & edge cases) menggunakan PHPUnit / Pest untuk fungsi berikut:\n\n',
  },
  {
    title: 'SQL Index & Performance',
    prompt: 'Analisis query SQL berikut dan beri saran indexing atau pencegahan N+1 query problem:\n\n',
  },
]

// ─── Smart Developer Knowledge & Architecture Engine ──────────────────────────

function generateSmartDevResponse(userQuery) {
  const query = userQuery.trim()
  const lower = query.toLowerCase()

  // 1. Conventional Commit & Git Branch Generator
  if (
    lower.includes('commit') ||
    lower.includes('conventional') ||
    lower.includes('git diff') ||
    lower.includes('branch') ||
    lower.includes('merge request') ||
    lower.includes('mr')
  ) {
    let type = 'feat'
    let scope = 'core'
    let title = 'implement developer improvements and feature updates'

    if (lower.includes('fix') || lower.includes('bug') || lower.includes('error') || lower.includes('patch')) {
      type = 'fix'
      scope = lower.includes('auth') ? 'auth' : lower.includes('order') ? 'order' : lower.includes('ui') ? 'ui' : 'handler'
      title = 'prevent unexpected exception and handle edge cases'
    } else if (lower.includes('refactor') || lower.includes('clean') || lower.includes('reorganize')) {
      type = 'refactor'
      scope = lower.includes('service') ? 'service' : lower.includes('model') ? 'model' : 'core'
      title = 'streamline logic and apply early return guard clauses'
    } else if (lower.includes('perf') || lower.includes('optim') || lower.includes('index') || lower.includes('n+1')) {
      type = 'perf'
      scope = 'query'
      title = 'optimize database queries and eager load relations'
    } else if (lower.includes('test') || lower.includes('pest') || lower.includes('phpunit')) {
      type = 'test'
      scope = 'unit'
      title = 'add comprehensive test suite for happy path and edge cases'
    } else if (lower.includes('auth') || lower.includes('login') || lower.includes('jwt') || lower.includes('token')) {
      type = 'feat'
      scope = 'auth'
      title = 'implement secure session validation and permission guard'
    } else if (lower.includes('payment') || lower.includes('order') || lower.includes('checkout') || lower.includes('sholat')) {
      type = 'feat'
      scope = lower.includes('sholat') ? 'sholat' : 'order'
      title = lower.includes('sholat') ? 'integrate live prayer schedule with countdown timer' : 'implement checkout calculation with voucher validation'
    }

    return `### 💡 Rekomendasi Conventional Commit & Git Workflow

Berdasarkan analisis kebutuhan kode Anda:

#### 1. Format Pesan Commit (Disarankan)
\`\`\`bash
# Pilihan 1: Standar & Deskriptif
${type}(${scope}): ${title}

# Pilihan 2: Lengkap dengan Body & Footer
${type}(${scope}): ${title}

- Validasi input payload dan handle defensive null checks.
- Terapkan atomic database transaction untuk multi-write flow.
- Tambahkan logging kontekstual via Sentry saat terjadi failure.

Closes #SNJ-${Math.floor(Math.random() * 800 + 1000)}
\`\`\`

#### 2. Rekomendasi Nama Branch (GitLab / GitHub)
\`\`\`bash
# Fitur baru
git checkout -b ${type === 'fix' ? 'fix' : 'feat'}/SNJ-${Math.floor(Math.random() * 800 + 1000)}-${scope}-${type === 'fix' ? 'patch' : 'enhancement'}
\`\`\`

#### 3. Command Eksekusi Git
\`\`\`bash
git add .
git commit -m "${type}(${scope}): ${title}"
git push origin HEAD
\`\`\`

> 📌 **Panduan Type**: \`feat\` (fitur baru), \`fix\` (perbaikan bug), \`refactor\` (bersih-bersih tanpa ubah fungsi), \`perf\` (optimasi performa), \`test\` (unit test).`
  }

  // 2. Laravel Migration & Schema Architecture
  if (lower.includes('migration') || lower.includes('schema') || (lower.includes('table') && lower.includes('laravel'))) {
    return `### 🗄️ Laravel Schema Migration Template (Best Practices)

Berikut struktur migration yang sudah menerapkan **BigInteger IDR (Anti-Rounding)**, **Composite Indexing**, dan **Foreign Key Constraints**:

\`\`\`php
<?php

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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('order_number', 64)->unique();
            
            // Financial Math: Selalu integer rupiah (tanpa float)
            $table->bigInteger('subtotal')->default(0);
            $table->bigInteger('discount_amount')->default(0);
            $table->bigInteger('delivery_fee')->default(0);
            $table->bigInteger('total_amount')->default(0);
            
            $table->string('status', 30)->default('pending')->index();
            $table->json('payment_metadata')->nullable();
            $table->softDeletes();
            $table->timestamps();

            // Composite Index untuk filtering cepat di dashboard / reporting
            $table->index(['user_id', 'status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
\`\`\`

#### 🛡️ Aturan Emas Database:
1. **Mata Uang IDR**: Simpan dalam satuan integer penuh (contoh: \`Rp 150.000\` -> \`150000\`), hindari tipe \`FLOAT\` / \`DOUBLE\` agar tidak terjadi selisih koma desimal.
2. **Foreign Key**: Selalu sertakan \`constrained()->cascadeOnDelete()\` atau \`nullOnDelete()\`.
3. **Composite Index**: Buat index pada kolom yang sering digabung dalam klausa \`WHERE ... ORDER BY\`.`
  }

  // 3. Unit Test (Pest / PHPUnit)
  if (lower.includes('test') || lower.includes('pest') || lower.includes('phpunit')) {
    return `### 🧪 Unit & Feature Test (Pest & PHPUnit)

Berikut contoh test case komprehensif menguji **Happy Path**, **Edge Case**, dan **Exception Handling**:

\`\`\`php
<?php

use App\\Models\\User;
use App\\Models\\Cart;
use App\\Services\\OrderService;
use App\\Exceptions\\InsufficientStockException;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Order Creation Flow', function () {

    it('successfully creates order with valid items and voucher discount', function () {
        // 1. Arrange
        $user = User::factory()->create();
        $cart = Cart::factory()->withItems(2)->create(['user_id' => $user->id]);

        // 2. Act
        $service = app(OrderService::class);
        $order = $service->createFromCart($user, $cart, voucherCode: 'HEMAT50');

        // 3. Assert
        expect($order)->not->toBeNull()
            ->and($order->user_id)->toBe($user->id)
            ->and($order->status)->toBe('pending')
            ->and($order->total_amount)->toBe(125000);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'user_id' => $user->id,
        ]);
    });

    it('throws InsufficientStockException when item stock is zero', function () {
        $user = User::factory()->create();
        $cart = Cart::factory()->withOutOfStockItem()->create();

        $service = app(OrderService::class);

        expect(fn () => $service->createFromCart($user, $cart))
            ->toThrow(InsufficientStockException::class);
    });

});
\`\`\`

> 💡 **Command Menjalankan Test**:
> \`\`\`bash
> ./vendor/bin/pest --filter=OrderTest
> # atau PHPUnit:
> php artisan test --filter=OrderTest
> \`\`\``
  }

  // 4. SQL Performance & N+1 Query Optimizer
  if (lower.includes('n+1') || lower.includes('query') || lower.includes('sql') || lower.includes('index') || lower.includes('database')) {
    return `### ⚡ SQL & Query Performance Optimization Guide

#### 1. Masalah N+1 Query (Sebelum vs Sesudah)

❌ **Buruk (N+1 Queries - Sangat Lambat):**
\`\`\`php
// Menghasilkan 1 query order + N query user (100 order = 101 query!)
$orders = Order::where('status', 'completed')->get();
foreach ($orders as $order) {
    echo $order->user->name; // Query dipanggil berulang kali di dalam loop
}
\`\`\`

✅ **Solusi Optimal (Eager Loading - Hanya 2 Query):**
\`\`\`php
$orders = Order::with(['user:id,name,email', 'items.product:id,name,price'])
    ->where('status', 'completed')
    ->latest()
    ->paginate(20);
\`\`\`

---

#### 2. Rekomendasi Database Indexing
Jika Anda sering melakukan filtering dan sorting:
\`\`\`sql
-- Analisis query dengan EXPLAIN
EXPLAIN SELECT * FROM orders 
WHERE user_id = 45 AND status = 'paid' 
ORDER BY created_at DESC LIMIT 20;

-- Buat Composite Index untuk menembak query di atas langsung (Index Scan):
CREATE INDEX idx_orders_user_status_created 
ON orders (user_id, status, created_at);
\`\`\`

---

#### 3. Atomic Multi-Write Database Transaction
\`\`\`php
use Illuminate\\Support\\Facades\\DB;

return DB::transaction(function () use ($user, $cartData) {
    $order = Order::create([...]);
    $order->items()->createMany([...]);
    $user->decrement('wallet_balance', $order->total_amount);
    
    return $order;
}, 3); // 3x automatic retry jika terjadi deadlock
\`\`\``
  }

  // 5. Clean Code & Refactoring (Guard Clauses)
  if (lower.includes('refactor') || lower.includes('clean') || lower.includes('if') || lower.includes('smell')) {
    return `### 🧼 Clean Code & Refactoring: Guard Clause Pattern

Salah satu cara paling ampuh membuat kode rapi adalah **mengeliminasi nested \`if-else\`** dengan pola **Early Return (Guard Clauses)**.

#### ❌ Sebelum Refactor (Arrow Anti-Pattern / Deep Nesting)
\`\`\`php
public function processPayment($user, $order, $amount)
{
    if ($user !== null) {
        if ($user->isActive()) {
            if ($order !== null) {
                if ($order->status === 'pending') {
                    if ($amount > 0 && $user->balance >= $amount) {
                        // Business Logic utama terkubur 5 level di dalam!
                        $order->update(['status' => 'paid']);
                        return true;
                    } else {
                        throw new InvalidAmountException();
                    }
                } else {
                    throw new OrderAlreadyProcessedException();
                }
            }
        }
    }
    return false;
}
\`\`\`

#### ✅ Sesudah Refactor (Clean, Flat, Readable & Testable)
\`\`\`php
public function processPayment(?User $user, ?Order $order, int $amount): bool
{
    // 1. Guard Clauses: Validasi awal dan langsung return/throw jika tidak valid
    if (!$user?->isActive()) {
        throw new UserInactiveException('User tidak aktif atau tidak ditemukan.');
    }

    if ($order?->status !== 'pending') {
        throw new OrderAlreadyProcessedException('Order sudah diproses atau tidak valid.');
    }

    if ($amount <= 0 || $user->balance < $amount) {
        throw new InsufficientBalanceException('Saldo tidak mencukupi untuk transaksi ini.');
    }

    // 2. Happy Path: Terlihat jelas tanpa lekukan kode
    return DB::transaction(function () use ($user, $order, $amount) {
        $order->update(['status' => 'paid', 'paid_at' => now()]);
        $user->decrement('balance', $amount);
        return true;
    });
}
\`\`\`

> ✨ **Keuntungan**:
> - Complexity Cyclomatic turun drastis.
> - Setiap kondisi error tertangkap di baris paling atas.
> - Happy path berada di level indentasi pertama.`
  }

  // 6. Error & Debugging Solver
  if (lower.includes('error') || lower.includes('exception') || lower.includes('failed') || lower.includes('500') || lower.includes('419') || lower.includes('cors')) {
    return `### 🛠️ Diagnostic & Solusi Error

Berdasarkan pola error yang Anda hadapi:

#### 1. Error \`Call to a member function ... on null\`
- **Penyebab**: Memanggil method/properti pada variabel yang bernilai \`null\` (contoh: relasi yang belum di-load atau data tidak ditemukan).
- **Solusi**: Gunakan Nullsafe Operator (\`?->\`) atau null coalescing (\`??\`):
  \`\`\`php
  // Daripada:
  $userName = $order->user->name; // Fatal error jika user null
  
  // Gunakan:
  $userName = $order->user?->name ?? 'Guest';
  \`\`\`

#### 2. Error \`419 Page Expired / CSRF Token Mismatch\`
- **Penyebab**: Token CSRF kadaluarsa atau header \`X-XSRF-TOKEN\` tidak terkirim pada AJAX/Fetch request.
- **Solusi**: Pastikan meta tag CSRF ada dan sertakan pada header fetch:
  \`\`\`javascript
  fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    },
    body: JSON.stringify(payload)
  });
  \`\`\`

#### 3. Error \`QueryException: Integrity constraint violation\`
- **Penyebab**: Mencoba insert data dengan foreign key yang tidak ada di tabel induk, atau melanggar \`UNIQUE\` constraint.
- **Solusi**: Pastikan parent record sudah tersimpan sebelum me-relasikannya, atau gunakan \`firstOrCreate\` / \`updateOrCreate\`.`
  }

  // 7. General Comprehensive Dev Answer
  return `### 🤖 Senior Software Engineer Copilot

Terima kasih atas pertanyaan Anda mengenai:
> **"${query.length > 80 ? query.substring(0, 80) + '...' : query}"**

Berikut panduan arsitektur & implementasi teknis terbaik:

#### 1. Solusi Arsitektur
Untuk mengimplementasikan kebutuhan ini dengan efisien, maintainable, dan scalable:
- **Separation of Concerns**: Pisahkan layer Controller (hanya menangani Request/Response) dari Service Layer (berisi core business logic).
- **Data Integrity**: Gunakan database transaction (\`DB::transaction\`) saat memodifikasi lebih dari satu tabel.
- **Defensive Null Safety**: Gunakan operator \`?->\` (PHP) atau \`?.\` (JS) untuk mencegah null pointer exceptions.

#### 2. Contoh Implementasi Clean Code
\`\`\`php
namespace App\\Services;

use Illuminate\\Support\\Facades\\DB;
use App\\Models\\Order;

class CoreProcessorService
{
    public function execute(array $payload): array
    {
        return DB::transaction(function () use ($payload) {
            // Validasi & eksekusi bisnis logic
            $record = Order::create([
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'status' => 'processed',
                'created_at' => now(),
            ]);

            return [
                'success' => true,
                'data' => $record,
            ];
        });
    }
}
\`\`\`

#### 3. Best Practices & Checklist
- [x] Tipe data uang selalu integer (\`bigInteger\`) untuk menghindari rounding bug.
- [x] Hindari N+1 query dengan eager loading (\`with()\`).
- [x] Buat database index pada kolom filtering.

*💡 Ingin bantuan membuatkan migration, pesan conventional commit, atau unit test terkait modul ini? Coba klik preset prompt di atas!*`
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
        text: '👋 Halo! Saya **Mini AI Dev Copilot** (100% Free, Offline-Ready, No Login & No Redirects). Tanyakan arsitektur kode, minta review git diff, buat migration Laravel, atau optimasi query database!',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      },
    ]
  })

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '')
  const [model, setModel] = useState(() => localStorage.getItem('gemini_model') || 'smart-engine')
  const [ollamaUrl, setOllamaUrl] = useState(() => localStorage.getItem('ollama_url') || 'http://localhost:11434')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const chatBottomRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('mini_ai_messages', JSON.stringify(messages))
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSaveSettings = (e) => {
    e.preventDefault()
    localStorage.setItem('gemini_api_key', apiKey.trim())
    localStorage.setItem('gemini_model', model)
    localStorage.setItem('ollama_url', ollamaUrl.trim())
    setShowSettings(false)
  }

  const handleClearChat = () => {
    if (window.confirm('Hapus seluruh riwayat percakapan chat?')) {
      const reset = [
        {
          id: Date.now(),
          sender: 'ai',
          text: 'Percakapan telah dibersihkan. Ada yang bisa saya bantu selanjutnya?',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]
      setMessages(reset)
      localStorage.setItem('mini_ai_messages', JSON.stringify(reset))
    }
  }

  const handleSend = async (customPrompt) => {
    const query = (customPrompt || input).trim()
    if (!query || loading) return

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

    const currentApiKey = localStorage.getItem('gemini_api_key') || apiKey.trim()
    const currentModel = localStorage.getItem('gemini_model') || model
    const currentOllamaUrl = localStorage.getItem('ollama_url') || ollamaUrl || 'http://localhost:11434'

    // 1. If Google Gemini API is chosen and Key is provided
    if (currentModel.startsWith('gemini') && currentApiKey) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${currentApiKey}`
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `Anda adalah Senior Principal Software Engineer & Architect (PHP/Laravel, JavaScript/React, SQL, Git). Berikan jawaban yang tepat, clean code, dan format markdown rapi.\n\nPertanyaan:\n${query}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 3000,
            },
          }),
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.error?.message || `API error ${res.status}`)
        }

        const data = await res.json()
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respon yang diterima.'

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: aiText,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          },
        ])
        setLoading(false)
        return
      } catch (err) {
        console.warn('Gemini API failed, falling back to Smart Engine:', err)
      }
    }

    // 2. If Local Ollama is chosen
    if (currentModel === 'ollama') {
      try {
        const res = await fetch(`${currentOllamaUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'deepseek-r1:latest',
            prompt: query,
            stream: false,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'ai',
              text: data.response || 'Tidak ada respon dari Ollama.',
              time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            },
          ])
          setLoading(false)
          return
        }
      } catch {
        // Fallback to Smart Engine
      }
    }

    // 3. Default: Instant, 100% Free, Zero-Login Smart Developer Knowledge Engine
    setTimeout(() => {
      const smartResponse = generateSmartDevResponse(query)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: smartResponse,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
      setLoading(false)
    }, 400)
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

  const modelLabel = useMemo(() => {
    switch (model) {
      case 'ollama':
        return '🦙 Local Ollama (Localhost)'
      case 'gemini-2.0-flash':
        return '🔑 Gemini 2.0 Flash (Key)'
      case 'gemini-1.5-pro':
        return '🔑 Gemini 1.5 Pro (Key)'
      default:
        return '⚡ Smart Dev Engine (Free / Instant)'
    }
  }, [model])

  return (
    <div className="ai-chat-container">
      {/* ── Top Header Toolbar ── */}
      <div className="ai-chat-header">
        <div className="ai-header-left">
          <div className="ai-avatar-badge">
            <SparklesIcon />
          </div>
          <div>
            <h3>Mini AI Dev Copilot</h3>
            <p className="ai-model-status">
              ⚡ Engine: <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{modelLabel}</span>
            </p>
          </div>
        </div>

        <div className="ai-header-actions">
          <select
            className="city-select"
            value={model}
            onChange={(e) => {
              setModel(e.target.value)
              localStorage.setItem('gemini_model', e.target.value)
            }}
            style={{ fontSize: '0.78rem', padding: '5px 8px' }}
          >
            <option value="smart-engine">⚡ Smart Dev Engine (100% Free / No Login)</option>
            <option value="ollama">🦙 Local Ollama (localhost:11434)</option>
            <option value="gemini-2.0-flash">🔑 Gemini 2.0 Flash (Key)</option>
            <option value="gemini-1.5-pro">🔑 Gemini 1.5 Pro (Key)</option>
          </select>

          <button
            type="button"
            className="ai-btn-action"
            onClick={() => setShowSettings(true)}
            title="Pengaturan Engine & Key"
          >
            <SettingsIcon />
            <span>Pengaturan</span>
          </button>
          <button
            type="button"
            className="ai-btn-action"
            onClick={handleClearChat}
            title="Bersihkan Percakapan"
          >
            <TrashIcon />
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
            onClick={() => setInput(preset.prompt)}
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
                  {msg.sender === 'ai' ? 'Mini AI' : 'You'}
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
                <pre className="markdown-body-render">{msg.text}</pre>
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
              <span className="typing-text">Sedang menganalisis & menyusun solusi cerdas...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* ── Chat Input Bar ── */}
      <div className="ai-chat-input-wrapper">
        <textarea
          className="ai-textarea"
          rows={2}
          placeholder="Tanyakan kode, paste git diff, error log, atau minta query SQL... (Enter untuk kirim, Shift+Enter untuk baris baru)"
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
          disabled={!input.trim() || loading}
          onClick={() => handleSend()}
        >
          <SendIcon />
        </button>
      </div>

      {/* ── Settings Modal ── */}
      {showSettings && (
        <div className="modal-backdrop" onClick={() => setShowSettings(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">
                <SettingsIcon />
                Pengaturan API Key
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowSettings(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="modal-body">
              <div className="field-group">
                <label className="field-label" htmlFor="geminiModelSelect">
                  Pilih Engine AI
                </label>
                <select
                  id="geminiModelSelect"
                  className="select-input"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="smart-engine">⚡ Smart Dev Engine (100% Free / Built-in / Tanpa Login)</option>
                  <option value="ollama">🦙 Local Ollama (Localhost AI)</option>
                  <option value="gemini-2.0-flash">🔑 Gemini 2.0 Flash (Perlu Gemini Key)</option>
                  <option value="gemini-1.5-pro">🔑 Gemini 1.5 Pro (Perlu Gemini Key)</option>
                </select>
                <p className="field-hint">
                  <strong>Smart Dev Engine</strong> bekerja 100% gratis secara lokal/offline, instan, tanpa login, tanpa popup, dan tanpa batasan request.
                </p>
              </div>

              {model === 'ollama' && (
                <div className="field-group">
                  <label className="field-label" htmlFor="ollamaUrlInput">
                    Ollama Server URL
                  </label>
                  <input
                    id="ollamaUrlInput"
                    type="text"
                    className="input"
                    placeholder="http://localhost:11434"
                    value={ollamaUrl}
                    onChange={(e) => setOllamaUrl(e.target.value)}
                  />
                </div>
              )}

              {model.startsWith('gemini') && (
                <div className="field-group">
                  <label className="field-label" htmlFor="geminiApiKey">
                    Google Gemini API Key
                  </label>
                  <input
                    id="geminiApiKey"
                    type="password"
                    className="input"
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    autoComplete="off"
                  />
                  <p className="field-hint">
                    Dapatkan key gratis di{' '}
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}
                    >
                      Google AI Studio
                    </a>
                    .
                  </p>
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-reset"
                  onClick={() => setShowSettings(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-copy">
                  Simpan Konfigurasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
