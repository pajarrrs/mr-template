import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readProject, writeProject, getPrdFile } from './mcp/store.js'

const MCP_SERVER_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), 'mcp', 'server.js')

// Dev-only sync API with Long-Polling support so the browser UI and MCP server stay in real-time sync
function prdSyncPlugin() {
  return {
    name: 'prd-sync',
    configureServer(server) {
      const subscribers = new Set()

      const notifySubscribers = (proj) => {
        const payload = {
          file: getPrdFile(),
          mcpServer: MCP_SERVER_PATH,
          project: proj || readProject(),
          timestamp: new Date().toISOString(),
        }
        for (const sub of subscribers) {
          try {
            sub(payload)
          } catch {}
        }
        subscribers.clear()
      }

      // Watch directory for file changes made by external MCP processes
      try {
        const file = getPrdFile()
        const dir = path.dirname(file)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        fs.watch(dir, (eventType, filename) => {
          if (filename && filename.endsWith('.json')) {
            notifySubscribers()
          }
        })
      } catch {}

      server.middlewares.use('/api/prd', (req, res) => {
        const send = (status, body) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify(body))
        }

        try {
          const url = new URL(req.url, 'http://localhost')
          const since = url.searchParams.get('since')
          const longpoll = url.searchParams.get('longpoll')

          if (req.method === 'GET') {
            const current = readProject()
            const hasNewUpdate = current && current.updatedAt && current.updatedAt > (since || '')

            // If client asks for long polling and there are no newer updates, hold the connection for 15 seconds
            if (longpoll && !hasNewUpdate) {
              let timer = null
              const onUpdate = (payload) => {
                if (timer) clearTimeout(timer)
                send(200, payload)
              }
              subscribers.add(onUpdate)

              // 15s timeout
              timer = setTimeout(() => {
                subscribers.delete(onUpdate)
                send(200, { file: getPrdFile(), mcpServer: MCP_SERVER_PATH, project: current, timeout: true })
              }, 15000)

              req.on('close', () => {
                if (timer) clearTimeout(timer)
                subscribers.delete(onUpdate)
              })
              return
            }

            return send(200, { file: getPrdFile(), mcpServer: MCP_SERVER_PATH, project: current })
          }

          if (req.method === 'PUT' || req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', () => {
              try {
                const saved = writeProject(JSON.parse(body))
                notifySubscribers(saved)
                send(200, { file: getPrdFile(), project: saved })
              } catch (err) {
                send(400, { error: err.message })
              }
            })
            return
          }

          send(405, { error: 'Method not allowed' })
        } catch (err) {
          send(500, { error: err.message })
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), prdSyncPlugin()],
})
