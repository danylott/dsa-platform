'use strict';

/**
 * Tests the provided code against test cases.
 * @param {string} code - The user-submitted code to test.
 * @param {Array<Object>} testCases - An array of test cases.
 * @returns {Object} - The test result.
 */
function testCode(code, testCases) {
    let numPassed = 0;
    let totalRuntimeMs = 0;

    for (let testCase of testCases) {
        const input = testCase.input;
        const expectedOutput = testCase.output;

        // Capture the output by overriding console.log
        let capturedOutput = '';
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            capturedOutput += args.join(' ') + '\n';
        };

        try {
            const completeCode = 'const inp = `' + input + '`;\n'  + code;
            const startTime = Date.now();
            eval(completeCode);
            const endTime = Date.now();
            console.log = originalConsoleLog; // Restore console.log
            const runtimeMs = endTime - startTime;
            totalRuntimeMs += runtimeMs;

            if (capturedOutput.trim() === expectedOutput || expectedOutput === "None" && capturedOutput.trim() === "null") {
                numPassed++;
            } else {
                return {
                    status: "WRONG_ANSWER",
                    message: `Input: ${input}\nExpected: ${expectedOutput}\nGot: ${capturedOutput}`,
                    numPassedTests: numPassed,
                    runtime: totalRuntimeMs,
                };
            }
        } catch (error) {
            console.log = originalConsoleLog;
            return {
                status: "ERROR",
                message: `Input: ${input}\nError:\n${error.toString()}`,
                numPassedTests: numPassed,
                runtime: totalRuntimeMs,
            };
        }
    }

    return {
        status: "ACCEPTED",
        numPassedTests: numPassed,
        message: "All tests passed",
        runtime: totalRuntimeMs,
    };
}

exports.http = (request, response) => {
    const event = request.body;
    const code = event.code;
    const testCases = event.test_cases;

    const result = testCode(code, testCases);

    response.status(200).send(result);
};

exports.event = (event, callback) => {
    const result = testCode(event.code, event.testCases);
    callback(null, result);
};

// Example usage
if (require.main === module) {
    const code = `
function twoSum(nums, target) {
    const numIndexMapping = {};
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;
        if (complement in numIndexMapping) {
            return [numIndexMapping[complement], i];
        }
        numIndexMapping[num] = i;
    }
    return null;
}

const [arrStr, targetStr] = inp.trim().split("\\n");
const arr = JSON.parse(arrStr);
const target = parseInt(targetStr);
const result = twoSum(arr, target);
if (result) {
  console.log('[' + result.join(', ') + ']');
} else {
  console.log(JSON.stringify(result));
}
`;

    const testCases = [
      {"input": "[2, 7, 11, 15]\r\n9", "output": "[0, 1]"},
      {"input": "[2, 700, 1112, 155, 1234]\r\n893", "output": "None"},
      {"input": "[3, 2, 4]\r\n6", "output": "[1, 2]"},
    ];

    console.log(testCode(code, testCases));
}