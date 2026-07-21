import subprocess

def check_complexity(language, file_path):

    if language != "python":
        return {
            "success": False,
            "message": f"Complexity analysis is not supported for {language} yet."
        }

    try:
        result = subprocess.run(
            ["radon", "cc", file_path],
            capture_output=True,
            text=True
        )

        return {
            "success": True,
            "output": result.stdout
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }