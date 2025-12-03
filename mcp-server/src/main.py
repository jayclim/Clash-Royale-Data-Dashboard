import sys
import os

# Add project root to sys.path to allow imports from src
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from mcp.server.fastmcp import FastMCP
from src.tools.players import register_players_tools
from src.tools.cards import register_cards_tools
from src.tools.clans import register_clans_tools
from src.tools.rankings import register_ranking_tools
from src.tools.leaderboards import register_leaderboards_tools
from src.tools.analytics import register_analytics_tools

# Initialize FastMCP server
mcp = FastMCP(
    "Clash Royale MCP Server",
    dependencies=["requests", "python-dotenv"]
)

# Register tools
register_players_tools(mcp)
register_cards_tools(mcp)
register_clans_tools(mcp)
register_ranking_tools(mcp)
register_leaderboards_tools(mcp)
register_analytics_tools(mcp)

def main():
    mcp.run(transport="stdio")

if __name__ == "__main__":
    main()
