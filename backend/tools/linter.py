import subprocess

def run_linter(language: str, file_path: str):

    if language == "python":
        command = ["flake8", file_path]

    elif language == "javascript":
        command = ["eslint", file_path]

    elif language == "typescript":
        command = ["eslint", file_path]

    elif language == "java":
        command = ["checkstyle", file_path]

    elif language == "cpp":
        command = ["clang-tidy", file_path]

    else:
        return {
            "success": False,
            "message": f"Linting not supported for {language}"
        }

    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True
        )

        output = result.stdout if result.stdout else result.stderr

        return {
            "success": True,
            "language": language,
            "output": output if output else "No linting issues found."
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }