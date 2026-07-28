from tools.code_analyzer import analyze_code


def test_analyze_python_code(monkeypatch):

    mock_response = """
    {
        "summary": "This code prints Hello World.",
        "bugs": [],
        "warnings": [],
        "quality_score": 95,
        "complexity": "Low",
        "security": "Good",
        "suggestions": []
    }
    """

    def mock_ask_llm(prompt):
        return mock_response

    monkeypatch.setattr(
        "llm.ask_llm",
        mock_ask_llm
    )

    code = """
def hello():
    print("Hello World")
"""

    result = analyze_code(code)

    assert result is not None
    assert result["summary"] == "This code prints Hello World."
    assert result["quality_score"] == 95
    assert result["complexity"] == "Low"
    assert result["security"] == "Good"
    assert result["bugs"] == []
    assert result["warnings"] == []
    assert result["suggestions"] == []