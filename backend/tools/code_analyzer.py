from llm import ask_llm

def analyze_code(code: str):

    prompt = f"""
You are an expert software engineer.

Analyze the following code.

Provide:

1. What this code does
2. Any bugs
3. Code quality
4. Suggestions for improvement

Code:

{code}
"""

    return ask_llm(prompt)