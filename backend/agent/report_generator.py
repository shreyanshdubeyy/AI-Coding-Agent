from llm import ask_llm

def generate_report(task, lint_output):

    prompt = f"""
You are a senior software engineer.

The user asked:

{task}

The linter produced:

{lint_output}

Explain:

1. What each issue means.
2. Why it matters.
3. How to fix it.
4. Give corrected code if appropriate.

Respond in clear beginner-friendly English.
"""

    return ask_llm(prompt)