from tools.registry import TOOLS

def execute(tool_names, language, file_path):

    results = []

    for tool_name in tool_names:

        if tool_name not in TOOLS:

            results.append({
                "tool": tool_name,
                "success": False,
                "message": "Tool not found"
            })

            continue

        tool = TOOLS[tool_name]

        try:

            result = tool(language, file_path)

            results.append({
                "tool": tool_name,
                "success": True,
                "result": result
            })

        except Exception as e:

            results.append({
                "tool": tool_name,
                "success": False,
                "message": str(e)
            })

    return results