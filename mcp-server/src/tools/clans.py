import logging
from .utils import make_api_request, encode_tag

logger = logging.getLogger(__name__)

def register_clans_tools(mcp):
    """
    Register all clan-related tools with the MCP server.
    """
    
    @mcp.tool()
    def get_clan_info(clan_tag: str) -> dict:
        """
        Fetch clan info from the Clash Royale API.
        
        Args:
            clan_tag: The clan tag to look up.
        """
        logger.info(f"get_clan_info called with clan_tag: {clan_tag}")
        
        encoded_tag = encode_tag(clan_tag)
        endpoint = f"clans/{encoded_tag}"
        
        return make_api_request(endpoint)
