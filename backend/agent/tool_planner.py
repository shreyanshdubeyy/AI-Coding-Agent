from llm import ask_llm
import json

AVAILABLE_TOOLS = [
    "linter",
    "complexity",
    "tester"
]

def decide_tools(task: str):

    prompt = f"""
You are an AI Coding Agent.

Available tools:

- linter → Find syntax, formatting and style issues
- complexity → Analyze code complexity
- tester → Run tests

User request:
{task}

Rules:
- If the user asks to "review", "analyze", or "check my code", use ALL three tools.
- If the user only asks for bugs, use linter.
- If the user only asks for tests, use tester.
- If the user only asks for complexity, use complexity.

Return ONLY valid JSON.

Examples:

User: Review my code
{{"tools":["linter","complexity","tester"]}}

User: Find bugs
{{"tools":["linter"]}}

User: Run tests
{{"tools":["tester"]}}
"""

    response = ask_llm(prompt)

    try:
        data = json.loads(response)
        return data["tools"]

    except:
        return ["linter"]