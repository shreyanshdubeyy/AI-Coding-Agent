from tools.linter import run_linter
from tools.tester import run_tests
from tools.complexity import check_complexity

TOOLS = {
    "linter": run_linter,
    "tester": run_tests,
    "complexity": check_complexity,
}