from tools.language_detector import detect_language


def test_detect_python():
    result = detect_language("test.py")
    assert result == "python"


def test_detect_javascript():
    result = detect_language("app.js")
    assert result == "javascript"


def test_detect_cpp():
    result = detect_language("main.cpp")
    assert result == "cpp"