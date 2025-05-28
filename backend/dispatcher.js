const { getImageByName } = require("./apis/imageService");
const { getFibonacci, multiplyMatrices } = require("./apis/mathService");
const { getUserProfile } = require("./apis/userService");

async function dispatch(jsonInput) {
  if (!jsonInput.calls || !Array.isArray(jsonInput.calls)) {
    throw new Error("Invalid input: 'calls' must be an array.");
  }

  let result = [];

  for (const call of jsonInput.calls) {
    if (call.service === "mathService") {
      if (call.method === "Fibonacci") {
        const n = call.parameters;

        if (typeof n !== "number" || n < 0) {
          throw new Error("Invalid input: 'n' must be a non-negative number.");
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
    }

    if (call.service === "imageService") {
      const n = call.parameters;
      console.log(typeof call.parameters);

      if (typeof n !== "string") {
        throw new Error("Invalid input: 'n' must be a string.");
      }

      const path = await getImageByName(call.parameters);
      result.push({ calledMethod: call.method, result: path });
    }

    if (call.service === "userService") {
      const n = call.parameters;

      if (typeof n !== "number") {
        throw new Error("Invalid input: 'n' must be a number.");
      }

      const path = await getUserProfile(call.parameters);
      result.push({ calledMethod: call.method, result: path });
    }
  }

  return result;
}

module.exports = { dispatch };
