import logging
from collections import Counter
from .utils import make_api_request, encode_tag

logger = logging.getLogger(__name__)

# Define Win Conditions for Archetype Classification
WIN_CONDITIONS = {
    "Beatdown": [
        "Golem", "Lava Hound", "Giant", "Electro Giant", "Goblin Giant", "Royal Giant", "Elixir Golem"
    ],
    "Siege": [
        "X-Bow", "Mortar"
    ],
    "Control": [
        "Miner", "Graveyard", "Goblin Barrel", "Wall Breakers", "Skeleton Barrel"
    ],
    "Cycle": [
        "Hog Rider", "Royal Hogs", "Ram Rider", "Battle Ram"
    ],
    "Bridge Spam": [
        "P.E.K.K.A", "Mega Knight", "Elite Barbarians", "Royal Recruits"
    ],
    "Air": [
        "Balloon"
    ],
    "Three Musketeers": [
        "Three Musketeers"
    ]
}

def register_analytics_tools(mcp):
    """
    Register analytics-related tools with the MCP server.
    
    Args:
        mcp: The FastMCP server instance
    """
    
    @mcp.tool()
    def get_meta_snapshot(player_limit: int = 5, battle_limit: int = 5) -> dict:
        """
        Analyze the current meta by aggregating data from top Path of Legends players.
        
        This tool fetches the top players, analyzes their recent battle logs, and returns:
        1. Most used cards (card usage stats)
        2. Most common card synergies (pairs of cards played together)
        3. Archetype distribution based on win conditions
        
        Args:
            player_limit: Number of top players to analyze (default: 5, max recommended: 10 to avoid rate limits)
            battle_limit: Number of recent battles per player to analyze (default: 5)
            
        Returns:
            A dictionary containing meta insights: top_cards, top_synergies, and archetypes.
        """
        logger.info(f"get_meta_snapshot called with player_limit={player_limit}, battle_limit={battle_limit}")
        
        # 1. Fetch Top Players
        # Use global location (57000000) for Path of Legends
        endpoint = f"locations/global/pathoflegend/players?limit={player_limit}"
        try:
            top_players_data = make_api_request(endpoint)
            top_players = top_players_data.get("items", [])
        except Exception as e:
            logger.error(f"Failed to fetch top players: {e}")
            return {"error": "Failed to fetch top players", "details": str(e)}
            
        logger.info(f"Fetched {len(top_players)} top players. Starting analysis...")
        
        # Data structures for aggregation
        card_counts = Counter()
        synergy_counts = Counter()
        archetype_counts = Counter()
        total_decks_analyzed = 0
        
        # 2. Analyze Battles for each player
        for player in top_players:
            tag = player.get("tag")
            if not tag:
                continue
                
            encoded_tag = encode_tag(tag)
            battle_endpoint = f"players/{encoded_tag}/battlelog"
            
            try:
                battles = make_api_request(battle_endpoint)
                
                # Filter and analyze recent battles
                count = 0
                for battle in battles:
                    if count >= battle_limit:
                        break
                        
                    # Only analyze PvP or Path of Legends battles
                    game_type = battle.get("type")
                    if game_type not in ["PvP", "pathOfLegend"]:
                        continue
                        
                    # Get the player's deck (team[0] is always the player in battle log context)
                    # Note: In battle log, 'team' is a list. Usually index 0 is the player.
                    # We need to verify which side matches the player tag, but usually the API returns the requested player as team[0]
                    # Let's just assume team[0] for simplicity as per standard API behavior for player endpoints
                    if not battle.get("team"):
                        continue
                        
                    player_deck = battle["team"][0].get("cards", [])
                    if not player_deck:
                        continue
                        
                    # Extract card names
                    card_names = [card["name"] for card in player_deck]
                    
                    # Update Card Counts
                    card_counts.update(card_names)
                    
                    # Update Synergy Counts (all unique pairs)
                    # Sort pairs to ensure (Log, Hog) is same as (Hog, Log)
                    sorted_cards = sorted(card_names)
                    for i in range(len(sorted_cards)):
                        for j in range(i + 1, len(sorted_cards)):
                            pair = f"{sorted_cards[i]} + {sorted_cards[j]}"
                            synergy_counts[pair] += 1
                            
                    # Determine Archetype
                    detected_archetype = "Unknown"
                    for archetype, win_cons in WIN_CONDITIONS.items():
                        if any(wc in card_names for wc in win_cons):
                            detected_archetype = archetype
                            break # Assign first matching archetype (simple logic)
                    
                    archetype_counts[detected_archetype] += 1
                    total_decks_analyzed += 1
                    count += 1
                    
            except Exception as e:
                logger.warning(f"Failed to fetch battles for player {tag}: {e}")
                continue
                
        # 3. Format Results
        return {
            "meta_summary": {
                "total_players_analyzed": len(top_players),
                "total_decks_analyzed": total_decks_analyzed,
                "timestamp": "Now"
            },
            "top_cards": [
                {"card": card, "count": count, "usage_rate": f"{(count/total_decks_analyzed)*100:.1f}%"}
                for card, count in card_counts.most_common(10)
            ],
            "top_synergies": [
                {"pair": pair, "count": count}
                for pair, count in synergy_counts.most_common(10)
            ],
            "archetypes": [
                {"archetype": arch, "count": count, "share": f"{(count/total_decks_analyzed)*100:.1f}%"}
                for arch, count in archetype_counts.most_common()
            ]
        }
