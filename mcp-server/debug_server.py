#!/usr/bin/env python
"""Debug script to check if tools are registered correctly."""

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

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

# Debug: Check what's registered
print("=" * 50)
print("MCP Server Debug Information")
print("=" * 50)

# Check tool manager
if hasattr(mcp, '_tool_manager'):
    tools = mcp._tool_manager._tools if hasattr(mcp._tool_manager, '_tools') else {}
    print(f"\nRegistered Tools via _tool_manager ({len(tools)}):")
    for name in tools.keys():
        print(f"  - {name}")
    if len(tools) == 0:
        print("  ⚠️  No tools registered!")
else:
    print("\n⚠️  No '_tool_manager' attribute found")

# Check resource manager
if hasattr(mcp, '_resource_manager'):
    resources = mcp._resource_manager._resources if hasattr(mcp._resource_manager, '_resources') else {}
    print(f"\nRegistered Resources via _resource_manager ({len(resources)}):")
    for name in resources.keys():
        print(f"  - {name}")
    if len(resources) == 0:
        print("  ⚠️  No resources registered")
else:
    print("\n⚠️  No '_resource_manager' attribute found")

# Check prompt manager
if hasattr(mcp, '_prompt_manager'):
    prompts = mcp._prompt_manager._prompts if hasattr(mcp._prompt_manager, '_prompts') else {}
    print(f"\nRegistered Prompts via _prompt_manager ({len(prompts)}):")
    for name in prompts.keys():
        print(f"  - {name}")
    if len(prompts) == 0:
        print("  ⚠️  No prompts registered")
else:
    print("\n⚠️  No '_prompt_manager' attribute found")

print("\n" + "=" * 50)

# Print all attributes to understand FastMCP structure
print("\nFastMCP attributes:")
for attr in dir(mcp):
    if not attr.startswith('__'):
        print(f"  - {attr}")

print("\n" + "=" * 50)
print("Testing MCP Protocol Methods")
print("=" * 50)

# Test list_tools
import asyncio

async def test_protocol():
    print("\nTesting list_tools():")
    try:
        tools_result = await mcp.list_tools()
        # Check if it's a list or object
        if isinstance(tools_result, list):
            print(f"  ✓ list_tools() returned a list with {len(tools_result)} tools:")
            for tool in tools_result:
                print(f"    - {tool}")
        elif hasattr(tools_result, 'tools'):
            print(f"  ✓ list_tools() returned {len(tools_result.tools)} tools:")
            for tool in tools_result.tools:
                print(f"    - {tool.name}: {tool.description}")
        else:
            print(f"  ? list_tools() returned unknown type: {type(tools_result)}")
            print(f"    Result: {tools_result}")
    except Exception as e:
        print(f"  ✗ Error calling list_tools(): {e}")
        import traceback
        traceback.print_exc()
    
    print("\nTesting list_resources():")
    try:
        resources_result = await mcp.list_resources()
        if isinstance(resources_result, list):
            print(f"  ✓ list_resources() returned a list with {len(resources_result)} resources")
        elif hasattr(resources_result, 'resources'):
            print(f"  ✓ list_resources() returned {len(resources_result.resources)} resources")
        else:
            print(f"  ? list_resources() returned unknown type: {type(resources_result)}")
    except Exception as e:
        print(f"  ✗ Error calling list_resources(): {e}")
    
    print("\nTesting list_prompts():")
    try:
        prompts_result = await mcp.list_prompts()
        if isinstance(prompts_result, list):
            print(f"  ✓ list_prompts() returned a list with {len(prompts_result)} prompts")
        elif hasattr(prompts_result, 'prompts'):
            print(f"  ✓ list_prompts() returned {len(prompts_result.prompts)} prompts")
        else:
            print(f"  ? list_prompts() returned unknown type: {type(prompts_result)}")
    except Exception as e:
        print(f"  ✗ Error calling list_prompts(): {e}")

asyncio.run(test_protocol())
