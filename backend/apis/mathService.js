async function getFibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 0,
    b = 1,
    c;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return c;
}

async function multiplyMatrices(params) {
  const a = params[0];
  const b = params[1];
  if (a.length !== b.length) {
    throw new Error("Invalid matrices: cannot multiply these matrices.");
  }

  let result = Array.from({ length: a.length }, () => 0);

  for (let i = 0; i < a.length; i++) {
    result[i] += a[i] * b[i];
  }

  return result;
}
module.exports = {
  getFibonacci,
  multiplyMatrices,
};
