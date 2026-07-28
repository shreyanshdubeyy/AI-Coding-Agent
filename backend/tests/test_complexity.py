from tools.complexity import check_complexity


def test_complexity_returns_result(tmp_path):
    code_file = tmp_path / "test.py"

    code_file.write_text(
        """
def check_number(x):
    if x > 10:
        return True
    else:
        return False
"""
    )

    result = check_complexity(
        "python",
        str(code_file)
    )

    assert result is not None
    assert "success" in result