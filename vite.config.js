import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readProject, writeProject, getPrdFile } from './mcp/store.js'

const MCP_SERVER_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), 'mcp', 'server.js')

// Dev-only sync API so the browser UI and MCP server share project.json on disk
function prdSyncPlugin() {
  return {
    name: 'prd-sync',
    configureServer(server) {
      server.middlewares.use('/api/prd', (req, res) => {
        const send = (status, body) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify(body))
        }

        try {
          if (req.method === 'GET') {
            return send(200, { file: getPrdFile(), mcpServer: MCP_SERVER_PATH, project: readProject() })
          }

          if (req.method === 'PUT' || req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', () => {
              try {
                const saved = writeProject(JSON.parse(body))
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
