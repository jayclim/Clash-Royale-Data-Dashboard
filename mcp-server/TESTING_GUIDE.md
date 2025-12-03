# MCP Server Testing Guide

## Current Status

✅ **Your MCP server is correctly configured!**

The debug script confirms that 4 tools are properly registered:
- `get_player_info`
- `get_player_battle_log`
- `get_cards`
- `get_clan_info`

## Testing with MCP Inspector

### Starting the Inspector

```bash
npx @modelcontextprotocol/inspector python src/main.py
```

The Inspector should open at: `http://localhost:6274` (or similar port)

### Troubleshooting Empty Tools/Resources/Prompts

If the Inspector shows empty lists, try these solutions:

#### Solution 1: Refresh the Connection

1. In the MCP Inspector browser window, look for a **"Reconnect"** or **"Refresh"** button
2. Click it to re-establish the connection
3. The tools should appear after reconnecting

#### Solution 2: Restart the Inspector

1. Stop the current Inspector (Ctrl+C in terminal)
2. Restart it: `npx @modelcontextprotocol/inspector python src/main.py`
3. The browser should auto-open, or manually navigate to the provided URL

#### Solution 3: Check Browser Console

1. Open browser DevTools (F12 or right-click → Inspect)
2. Check the Console tab for any errors
3. Look for WebSocket connection issues or CORS errors

#### Solution 4: Hard Refresh

1. In the Inspector browser window, do a hard refresh:
   - Mac: `Cmd + Shift + R`
   - Windows/Linux: `Ctrl + Shift + R`

### Testing Tools Manually

Once tools appear in the Inspector:

1. **Click on a tool** (e.g., `get_cards`)
2. **Fill in parameters** if required (limit is optional for get_cards)
3. **Click "Execute"** or "Run"
4. **view the response** in the output panel

### Example Test Cases

#### Test 1: Get Cards (No Parameters)
- Tool: `get_cards`
- Parameters: leave empty or set limit to 10
- Expected: Returns list of Clash Royale cards

#### Test 2: Get Player Info
- Tool: `get_player_info`
- Parameters: `player_tag` = `#2PP` (or any valid player tag)
- Expected: Returns player statistics and profile

#### Test 3: Get Player Battle Log
- Tool: `get_player_battle_log`
- Parameters: `player_tag` = `#2PP`
- Expected: Returns recent battles for the player

#### Test 4: Get Clan Info
- Tool: `get_clan_info`
- Parameters: `clan_tag` = `#2PPPP` (or any valid clan tag)
- Expected: Returns clan information

## Direct Connection Test

You can also test if the server is working by running the debug script:

```bash
./venv/bin/python debug_server.py
```

This will show:
- How many tools are registered
- The MCP protocol can communicate with them
- Details about each tool

## Common Issues

### Issue: "CR_API_KEY environment variable is not set"

**Solution:**  
Create a `.env` file in the `mcp-server` directory with:
```
CR_API_KEY=your_api_key_here
```

### Issue: "403 Forbidden" or API errors

**Solution:**
- Verify your API key is valid
- Check that you're using valid player/clan tags
- Ensure your API key has the correct permissions

### Issue: Tools show in debug but not in Inspector

**Solution:**
- The Inspector connected before tools were loaded
- Try reconnecting or restarting the Inspector
- Check browser console for WebSocket errors

## Technical Details

### How Tool Registration Works

1. `main.py` initializes FastMCP
2. `register_*_tools()` functions are called
3. Each uses `@mcp.tool()` decorator to register tools
4. Tools are stored in `mcp._tool_manager._tools`
5. When Inspector connects, `mcp.list_tools()` returns the registered tools

### MCP Protocol Flow

1. Inspector starts a proxy server
2. Proxy server spawns your MCP server via STDIO
3. Inspector sends JSON-RPC messages to proxy
4. Proxy forwards to your server via STDIO
5. Your server responds with tool/resource/prompt lists
6. Inspector displays them in the UI
