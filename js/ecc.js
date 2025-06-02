function modInv(a, p) {
  let [t, newT] = [0, 1];
  let [r, newR] = [p, a % p];
  while (newR !== 0) {
    let q = Math.floor(r / newR);
    [t, newT] = [newT, t - q * newT];
    [r, newR] = [newR, r - q * newR];
  }
  return (t + p) % p;
}

function ecAdd(P, Q) {
  if (!P) return Q;
  if (!Q) return P;

  const [x1, y1] = P;
  const [x2, y2] = Q;

  if (x1 === x2 && (y1 + y2) % p === 0) return null;

  let m;
  if (x1 === x2 && y1 === y2) {
    m = (3 * x1 * x1 + a) * modInv(2 * y1, p) % p;
  } else {
    m = (y2 - y1) * modInv((x2 - x1 + p) % p, p) % p;
  }

  const x3 = (m * m - x1 - x2 + p) % p;
  const y3 = (m * (x1 - x3) - y1 + p * p) % p;
  return [x3, y3];
}

function ecMult(k, P) {
  let result = null;
  let addend = P;

  while (k > 0) {
    if (k & 1) result = ecAdd(result, addend);
    addend = ecAdd(addend, addend);
    k >>= 1;
  }

  return result;
}