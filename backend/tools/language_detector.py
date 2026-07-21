import os

def detect_language(filename: str):

    extension = os.path.splitext(filename)[1].lower()

    language_map = {
        ".py": "python",
        ".js": "javascript",
        ".jsx": "javascript",
        ".ts": "typescript",
        ".tsx": "typescript",
        ".java": "java",
        ".cpp": "cpp",
        ".cc": "cpp",
        ".cxx": "cpp",
        ".c": "c",
        ".cs": "csharp",
        ".go": "go",
        ".php": "php",
        ".rb": "ruby",
        ".rs": "rust",
        ".kt": "kotlin",
        ".swift": "swift",
        ".html": "html",
        ".css": "css",
        ".json": "json",
        ".sql": "sql"
    }

    return language_map.get(extension, "unknown")