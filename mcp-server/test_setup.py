import os
import sys
from dotenv import load_dotenv
import requests

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

def test_environment():
    print("Testing environment...")
    
    # Load env
    dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
    print(f"Loading .env from: {dotenv_path}")
    load_dotenv(dotenv_path)
    
    api_key = os.getenv("CR_API_KEY")
    if not api_key:
        print("❌ CR_API_KEY not found in environment")
        return False
    
    print(f"✅ CR_API_KEY found (starts with: {api_key[:10]}...)")
    
    # Test API
    print("\nTesting API connection...")
    url = "https://api.clashroyale.com/v1/players/%232J8J2PLLP"
    headers = {"Authorization": f"Bearer {api_key}"}
    
    try:
        response = requests.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API Success! Found player: {data.get('name')}")
            return True
        else:
            print(f"❌ API Failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return False

if __name__ == "__main__":
    success = test_environment()
    sys.exit(0 if success else 1)
