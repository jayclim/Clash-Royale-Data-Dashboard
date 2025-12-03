import logging
from .utils import make_api_request

logger = logging.getLogger(__name__)

def register_cards_tools(mcp):
    """
    Register all card-related tools with the MCP server.
    """
    
    @mcp.tool()
    def get_cards(limit: int = None) -> dict:
        """
        Get a list of available cards from the Clash Royale API.
        Returns basic info like name, id, elixir cost, rarity, etc.
        """
        endpoint = f"cards?limit={limit}" if limit else "cards"
        return make_api_request(endpoint)
