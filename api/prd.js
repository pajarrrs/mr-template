// Vercel Serverless Function for /api/prd with Long-Polling support
let memoryStore = null
const subscribers = new Set()

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`)
  const since = url.searchParams.get('since')
  const longpoll = url.searchParams.get('longpoll')

  if (req.method === 'GET') {
    // If long polling is requested and memoryStore hasn't been updated since 'since'
    if (longpoll && since && memoryStore && (memoryStore.updatedAt || '') <= since) {
      let timer = null
      const onUpdate = (proj) => {
        if (timer) clearTimeout(timer)
        res.status(200).json({
          available: true,
          isCloud: true,
          file: 'Cloud Session (Vercel)',
          project: proj,
          message: 'Update diterima via live long-polling.'
        })
      }

      subscribers.add(onUpdate)

      // Long-polling timeout set to 15 seconds
      timer = setTimeout(() => {
        subscribers.delete(onUpdate)
        res.status(200).json({
          available: true,
          isCloud: true,
          file: 'Cloud Session (Vercel)',
          project: memoryStore,
          timeout: true
        })
      }, 15000)

      req.on('close', () => {
        if (timer) clearTimeout(timer)
        subscribers.delete(onUpdate)
      })
      return
    }

    return res.status(200).json({
      available: true,
      isCloud: true,
      file: 'Cloud Session (Vercel)',
      project: memoryStore,
      message: 'PRD Studio Cloud API aktif di Vercel.'
    })
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || null)
      memoryStore = body

      // Flush all waiting long-poll connections immediately!
      for (const sub of subscribers) {
        try {
          sub(memoryStore)
        } catch {}
      }
      subscribers.clear()

      return res.status(200).json({
        available: true,
        isCloud: true,
        file: 'Cloud Session (Vercel)',
        project: memoryStore,
        message: 'PRD berhasil disinkronkan ke Vercel API.'
      })
    } catch (err) {
      return res.status(400).json({ error: err.message || 'Invalid JSON' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
