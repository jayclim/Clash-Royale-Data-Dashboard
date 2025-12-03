import logging
from .utils import make_api_request, encode_tag

logger = logging.getLogger(__name__)

def register_players_tools(mcp):
    """
    Register all player-related tools with the MCP server.
    """
    
    @mcp.tool()
    def get_player_info(player_tag: str) -> dict:
        """
        Fetch player info from the Clash Royale API.
        
        Args:
            player_tag: The player tag to look up (e.g. #ABCDEF or ABCDEF).
        """
        logger.info(f"get_player_info called with player_tag: {player_tag}")
        
        encoded_tag = encode_tag(player_tag)
        endpoint = f"players/{encoded_tag}"
        
        return make_api_request(endpoint)

    @mcp.tool()
    def get_player_battle_log(player_tag: str) -> dict:
        """
        Fetch battle log for a player from the Clash Royale API.
        
        Args:
            player_tag: The player tag to look up.
        """
        logger.info(f"get_player_battle_log called with player_tag: {player_tag}")
        
        encoded_tag = encode_tag(player_tag)
        endpoint = f"players/{encoded_tag}/battlelog"
        
        return make_api_request(endpoint)
