import io
import json
import traceback
from contextlib import redirect_stdout


def parse_event(event: dict) -> dict:
    return json.loads(event["body"]) if "body" in event else event


def check_task(event: dict, context: dict) -> dict[str, str]:
    event = parse_event(event)
    code = event["code"]
    test_cases = event["test_cases"]

    return test_code(code, test_cases)


def test_code(code: str, test_cases: list[dict[str, str]]) -> dict[str, str]:

    num_passed = 0

    for test_case in test_cases:
        io_redirect = io.StringIO()
        with redirect_stdout(io_redirect):
            inp = test_case["input"]
            output = test_case["output"]
            try:
                exec(code, {"inp": inp, "output": output})
            except Exception:
                error = traceback.format_exc()
                error = error.replace("<string>", "main.py")
                error = error.replace("<module>", "'task_checker'")
                lines = error.splitlines()[3:]
                error = "\n".join(lines)
                return {
                    "status": "ERROR",
                    "message": error,
                    "num_passed_tests": num_passed,
                }

        result = io_redirect.getvalue()
        if result.strip() == output:
            num_passed += 1
        else:
            return {
                "status": "WRONG_ANSWER",
                "message": f"Input: {inp}\nExpected: {output}\nGot: {result}",
                "num_passed_tests": num_passed,
            }

    assert num_passed == len(test_cases)

    return {
        "status": "ACCEPTED",
        "num_passed_tests": num_passed,
        "message": "All tests passed",
    }


if __name__ == "__main__":
    code = """def two_sum(nums, target):
    num_index_mapping = {}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_index_mapping:
            return [num_index_mapping[complement], i]
        num_index_mapping[num] = i

    return None

arr, target = inp.split("\\n")
arr = [int(num_str) for num_str in arr[1:-1].split(", ")]
target = int(target)
print(two_sum(arr, target))
    """

    test_cases = [
        {"input": "[2, 7, 11, 15]\n9", "output": "[0, 1]"},
        {"input": "[3, 2, 4]\n6", "output": "[1, 2]"},
    ]
    print(test_code(code, test_cases))
