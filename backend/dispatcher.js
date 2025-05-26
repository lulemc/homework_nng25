const { getFibonacci, multiplyMatrices } = require("./apis/mathService");

async function dispatch(jsonInput) {
  if (!jsonInput.calls || !Array.isArray(jsonInput.calls)) {
    throw new Error("Invalid input: 'calls' must be an array.");
  }

  let result = [];

  for (const call of jsonInput.calls) {
    switch (call.service) {
      case "mathService":
        if (call.method === "Fibonacci") {
          const n = call.parameters;

          if (typeof n !== "number" || n < 0) {
            throw new Error(
              "Invalid input: 'n' must be a non-negative number."
            );
          }

          const fibonacci = await getFibonacci(call.parameters);
          result.push({ calledMethod: call.method, result: fibonacci });
        } else if (call.method === "multiplyMatrices") {
          const n = call.parameters;

          if (n.length !== 2 || !Array.isArray(n[0]) || !Array.isArray(n[1])) {
            throw new Error(
              "Invalid input: 'n' must be a two arrays with numbers."
            );
          }

          const matrices = await multiplyMatrices(call.parameters);
          result.push({ calledMethod: call.method, result: matrices });
        }
      case "userService":
        console.log("User service called");
        break;
      case "imageService":
        console.log("Image  service called");
        break;
      default:
        throw new Error("Invalid service: " + jsonInput.service);
    }
  }

  return result;
}

module.exports = { dispatch };
