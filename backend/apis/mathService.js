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

    if (!Array.isArray(a[0]) && !Array.isArray(b[0])) {
      if (a.length !== b.length) {
        return reject(new Error("Vector lengths do not match."));
      }

      const result = a.reduce((sum, val, i) => sum + val * b[i], 0);
      return resolve(result);
    }

    const aCols = a[0].length;
    const bRows = b.length;
    const bCols = b[0].length;

    if (aCols !== bRows) {
      return reject(
        new Error("Matrix dimensions do not align for multiplication.")
      );
    }

    const result = Array.from({ length: a.length }, () =>
      Array.from({ length: bCols }, () => 0)
    );

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < bCols; j++) {
        for (let k = 0; k < aCols; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }

    resolve(result);
  });
}

module.exports = {
  getFibonacci,
  multiplyMatrices,
};
