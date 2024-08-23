document
  .getElementById("runTestsButton")
  .addEventListener("click", function () {
    const functionInput = document.getElementById("functionInput").value;
    const testCasesInput = document.getElementById("testCasesInput").value;
    const resultsDiv = document.getElementById("results");

    // Clear previous results
    resultsDiv.innerHTML = "";

    try {
      // Evaluate the function input
      const userFunction = new Function(`return ${functionInput}`)();

      // Parse test cases
      const testCases = JSON.parse(testCasesInput);

      // Run test cases
      testCases.forEach((testCase, index) => {
        const { input, expected } = testCase;

        // Run the function with the provided input
        const result = userFunction(...input);

        // Check if the result matches the expected output
        const isPassing = JSON.stringify(result) === JSON.stringify(expected);

        // Display the result
        const resultDiv = document.createElement("div");
        resultDiv.className = isPassing ? "result-pass" : "result-fail";
        resultDiv.textContent =
          `Test Case ${index + 1}: ` +
          `Input: ${JSON.stringify(input)} | ` +
          `Expected: ${JSON.stringify(expected)} | ` +
          `Received: ${JSON.stringify(result)}`;
        resultsDiv.appendChild(resultDiv);
      });
    } catch (error) {
      // Display error if the function or test cases are invalid
      const errorDiv = document.createElement("div");
      errorDiv.className = "result-fail";
      errorDiv.textContent = `Error: ${error.message}`;
      resultsDiv.appendChild(errorDiv);
    }
  });
