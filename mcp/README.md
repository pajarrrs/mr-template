# PRD Studio MCP Server

Zero-dependency MCP server for the **PRD & Kanban Studio** tool.

## Flow

1. `npm run dev` → open **PRD & Kanban Studio** in the sidebar.
2. Type a request (e.g. `buatkan prd membuat aplikasi chat`) → **Generate PRD**.
3. The project is auto-saved to `.prd/project.json` (+ rendered `.prd/PRD.md`).
4. Add the MCP server to your AI agent (copy-ready config is in the **MCP** tab):

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

5. Tell the agent: *"Pakai MCP prd-studio, ambil get_next_task dan kerjakan."*
   Cards on the Kanban board move automatically (UI polls every 3s).

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

## Custom location

Set `PRD_FILE=/abs/path/project.json` for both `npm run dev` and the MCP server
(e.g. to keep the PRD inside the repo you are building).
