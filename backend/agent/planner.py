def plan(task):

    task = task.lower()

    tools = []

    if "bug" in task or "lint" in task:
        tools.append("linter")

    if "test" in task:
        tools.append("tester")

    if "complexity" in task:
        tools.append("complexity")

    if "review" in task:
        tools = [
            "linter",
            "complexity",
            "tester"
        ]

    return tools