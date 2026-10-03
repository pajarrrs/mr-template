// Vercel Serverless Function for /api/prd
let memoryStore = null

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

  if (req.method === 'GET') {
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
