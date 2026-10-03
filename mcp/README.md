# PRD Studio MCP Server

Zero-dependency MCP server for the **PRD & Kanban Studio** tool.

## Quick Setup

### Option A: Zero-Clone (Cloud / NPX) - Recommended
Tidak perlu clone repo atau install apapun, langsung gunakan:
```json
{
  "mcpServers": {
    "prd-studio": {
      "command": "npx",
      "args": ["-y", "github:pajarrrs/mr-template"]
    }
  }
}
```

### Option B: Local Repository
```json
{
  "mcpServers": {
    "prd-studio": {
      "command": "node",
      "args": ["D:/code/prdin/mr-template/mcp/server.js"]
    }
  }
}
```

## Cara Pasang di Berbagai AI Agent / Editor

### 1. Google Antigravity
- **Global:** Tambahkan ke `~/.gemini/config/mcp_config.json` (Windows: `%USERPROFILE%\.gemini\config\mcp_config.json`).
- **Per Project:** Buat file `.agents/mcp_config.json` di root workspace project Anda.
- Buka menu **Additional Options (...) > MCP Servers** untuk memastikan server `prd-studio` aktif.

### 2. Cursor Editor
- Buat file `.cursor/mcp.json` di root project Anda, atau buka **Cursor Settings → Features → MCP**.

### 3. Claude Desktop
- Buka **Settings → Developer → Edit Config** (`claude_desktop_config.json`), paste di dalam object `mcpServers`.

### 4. VS Code (Cline / Roo Code)
- Klik icon **MCP Servers** di sidebar Cline/Roo Code → **Edit MCP Settings**.

## Flow Penggunaan

1. Buka web app PRD Studio (lokal via `npm run dev` atau di Vercel: `https://dev-worktools.vercel.app`).
2. Masukkan ide aplikasi / import dokumen PRD dari PDF → Klik **Generate PRD**.
3. Di tab **MCP**, download file `project.json` lalu simpan di root folder project koding Anda.
4. Buka AI Chat (Antigravity / Cursor / Claude / Cline) dan jalankan instruksi:
   > *"Gunakan MCP server prd-studio. Pertama panggil get_next_task untuk melihat tugas yang harus dikerjakan. Ubah statusnya ke in_progress menggunakan update_task_status. Kemudian buat atau ubah kode sesuai acceptance criteria dan desain database yang ada di PRD. Setelah selesai dan teruji, ubah statusnya ke done dengan catatan file yang Anda ubah. Ulangi untuk tugas berikutnya."*
5. Kartu di Kanban board akan bergerak otomatis secara real-time!

## Tools

| Tool | Purpose |
|---|---|
| `get_prd` | Full PRD markdown |
| `get_db_schema` | ERD (Mermaid), SQL DDL, JSON tables |
| `list_tasks` | Tasks filtered by status / phase |
| `get_task` | One task + linked feature acceptance criteria |
| `get_next_task` | Next task to work on |
| `update_task_status` | Move card (`backlog` / `todo` / `in_progress` / `done`) + note |
| `add_task_note` | Append implementation note |

Resources: `prd://document`, `prd://erd`, `prd://project.json`.

## Custom Location

Set env `PRD_FILE=/abs/path/project.json` jika ingin mengarahkan MCP server ke file path tertentu. Secara default, MCP server otomatis mendeteksi `project.json` atau `.prd/project.json` di working directory tempat editor dibuka.
