// backend/apis/mathService.js

function getFibonacci(n) {
  return new Promise((resolve, reject) => {
    if (n < 0) return reject(new Error("Negative input not allowed."));
    if (n === 0) return resolve(0);
    if (n === 1) return resolve(1);

    let a = 0,
      b = 1,
      c;
    for (let i = 2; i <= n; i++) {
      c = a + b;
      a = b;
      b = c;
    }
    resolve(c);
  });
}

function multiplyMatrices(params) {
  return new Promise((resolve, reject) => {
    const a = params[0];
    const b = params[1];

    if (!Array.isArray(a) || !Array.isArray(b)) {
      return reject(new Error("Inputs must be arrays."));
    }

    const aCols = a.length;
    const bRows = b.length;

    if (aCols !== bRows) {
      return reject(
        new Error("Matrix dimensions do not align for multiplication.")
      );
    }

    let result = Array.from({ length: a.length }, () => 0);

    for (let i = 0; i < a.length; i++) {
      result[i] += a[i] * b[i];
    }

    resolve(result);
  });
}

module.exports = {
  getFibonacci,
  multiplyMatrices,
};
