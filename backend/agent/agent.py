from agent.planner import plan
from agent.executor import execute
from agent.report_generator import generate_report
from agent.tool_planner import decide_tools

def run_agent(task, language, file_path):

    # Step 1
    from agent.tool_planner import decide_tools

    tools = decide_tools(task)

    print("Selected Tools:", tools)

    # Step 2
    tool_results = execute(tools, language, file_path)

    # Step 3: Combine outputs
    combined_output = ""

    for item in tool_results:
        if item["success"]:
            result = item["result"]

            if isinstance(result, dict):
                combined_output += f"\n### {item['tool'].upper()}\n"

                if "output" in result:
                    combined_output += result["output"] + "\n"

    # Step 4
    ai_report = generate_report(
        task,
        combined_output
    )

    return {
        "task": task,
        "tools_used": tools,
        "tool_results": tool_results,
        "ai_report": ai_report
    }