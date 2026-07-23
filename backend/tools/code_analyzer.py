from llm import ask_llm
import json


def analyze_code(code: str):

    prompt = f"""
You are an expert software engineer and code reviewer.

Analyze the following code carefully.

Return ONLY valid JSON.
Do not use markdown.
Do not use ```json.
Do not add any explanation outside the JSON.

Use exactly this structure:

{{
    "summary": "Brief explanation of what the code does",
    "bugs": [
        {{
            "title": "Bug title",
            "description": "Explain the bug clearly",
            "severity": "High"
        }}
    ],
    "warnings": [
        {{
            "title": "Warning title",
            "description": "Explain the warning"
        }}
    ],
    "quality_score": 85,
    "complexity": "Low",
    "security": "Good",
    "suggestions": [
        "Suggestion 1",
        "Suggestion 2"
    ]
}}

Rules:

- quality_score must be a number from 0 to 100.
- complexity must be one of: Low, Medium, High.
- security must be one of: Good, Medium, Risky.
- bugs must be an array.
- warnings must be an array.
- suggestions must be an array.
- If there are no bugs, return an empty array.
- If there are no warnings, return an empty array.
- Be accurate and only report issues relevant to the code.

Code to analyze:

{code}
"""

    response = ask_llm(prompt)

    try:

        # Remove accidental markdown formatting
        response = response.strip()

        if response.startswith("```json"):
            response = response[7:]

        if response.startswith("```"):
            response = response[3:]

        if response.endswith("```"):
            response = response[:-3]

        response = response.strip()

        # Convert AI response to Python dictionary
        analysis = json.loads(response)

        return analysis

    except Exception as e:

        return {
            "summary": response,
            "bugs": [],
            "warnings": [],
            "quality_score": 0,
            "complexity": "Unknown",
            "security": "Unknown",
            "suggestions": [],
            "error": "AI returned an invalid analysis format"
        }