# Clash Royale Data Visualization Showcase

This project consists of two parts:
1. **MCP Server** (`mcp-server/`): A Python server that connects to the Clash Royale API. Based on the work by [Baighasan/Chat-Royale](https://github.com/Baighasan/Chat-Royale).
2. **Visualization Dashboard** (`viz-dashboard/`): A Next.js web application to display the data.

## Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- **Clash Royale API Key** (You have already set this up in `mcp-server/.env`)

---

## 1. Running the MCP Server
The MCP server exposes the Clash Royale data to AI assistants or MCP clients.

1. Open a terminal and navigate to the server directory:
   ```bash
   cd mcp-server
   ```

2. Create a virtual environment (recommended) and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the dependencies:
   ```bash
   pip install -e .
   ```

4. **Test the Server**:
   You can use the MCP Inspector to test the server interactively.
   ```bash
   npx @modelcontextprotocol/inspector python src/main.py
   ```
   This will open a web interface where you can try out tools like `get_player_info`.

---

## 2. Running the Visualization Dashboard
The dashboard is a web app where you can view the data.

1. Open a **new terminal window** and navigate to the dashboard directory:
   ```bash
   cd viz-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to: [http://localhost:3000](http://localhost:3000)

---

## Note on Data Connection
Currently, the **Dashboard uses mock data** for demonstration purposes. It does not yet automatically pull from the MCP server (as MCP is designed primarily for AI context). 

To see real data in the dashboard, we would typically build a direct API proxy in Next.js, but the MCP server is ready for your AI assistant to use!
