from tools.linter import run_linter


def test_linter_returns_result(tmp_path):
    code_file = tmp_path / "test.py"

    code_file.write_text(
        """
def hello():
    print("Hello World")
"""
    )

    result = run_linter(
        "python",
        str(code_file)
    )

    assert result is not None
    assert "success" in result