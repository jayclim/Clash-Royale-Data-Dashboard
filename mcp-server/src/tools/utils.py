import os
import requests
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Try to load environment variables from .env file
# Look for .env in the mcp-server root
dotenvPath = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
load_dotenv(dotenvPath)

CR_API_BASE = "https://proxy.royaleapi.dev/v1"
CR_API_KEY = os.getenv("CR_PROXY_API_KEY")

def get_api_key():
    return os.getenv("CR_PROXY_API_KEY")

def make_api_request(endpoint: str) -> dict:
    """
    Make an API request to the Clash Royale API.
    
    Args:
        endpoint: The API endpoint to call
        
    Returns:
        JSON response from the API
    """
    api_key = get_api_key()
    if not api_key:
        raise ValueError("CR_API_KEY environment variable is not set. Please create a .env file with your API key.")

    url = f"{CR_API_BASE}/{endpoint}"
    
    logger.info(f"Making API request to: {url}")
        
    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        logger.error(f"API request failed. Status: {response.status_code}, Response: {response.text}")
        # Return a helpful error message structure instead of crashing
        return {
            "error": True,
            "status": response.status_code,
            "message": response.text,
            "details": str(e)
        }
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return {
            "error": True,
            "message": "Unexpected error occurred",
            "details": str(e)
        }

def encode_tag(tag: str) -> str:
    """
    Encode player/clan tag for URL.
    Removes '#' if present and ensures it's properly formatted.
    """
    if not tag:
        return ""
    clean_tag = tag.upper().replace('#', '')
    return f"%23{clean_tag}"

def build_query_string(params: dict) -> str:
    """
    Build a URL query string from a dictionary of parameters.
    
    Args:
        params: Dictionary where keys are parameter names and values are parameter values
        
    Returns:
        A formatted query string (without the leading '?') with parameters 
        joined by '&' symbols (e.g., "limit=10&before=abc123")
    """
    query_parts = []
    for key, value in params.items():
        query_parts.append(f"{key}={value}")
    
    return "&".join(query_parts)
