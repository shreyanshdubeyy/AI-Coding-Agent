from tools.code_analyzer import analyze_code


def test_analyze_python_code():
    code = """
def hello():
    print("Hello World")
"""

    result = analyze_code(code)

    assert result is not None