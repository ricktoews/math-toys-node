const SQRT_5 = Math.sqrt(5);

function lucas(nth, a, b) {
    let result = a;
    for (let i = 1; i <= nth; i++) {
        result = a;
        [a, b] = [b, a + b];
    }
    return result;
}

function fib(nth) {
    let [a, b] = [1, 1];
    let result = a;
    for (let i = 1; i <= nth; i++) {
        result = a;
        [a, b] = [b, a + b];
    }
    return result;
}

function getPhi(max) {
    const rows = [];
    for (let i = 1; i <= max; i++) {
        const f = fib(i);
        const l = lucas(i, 1, 3);
        const phi = `(${f} √5 + ${l}) / 2`;
        const real = (f * SQRT_5 + l) / 2;
        const aSqrt5 = f * SQRT_5;
        const b = l;
        const diff = aSqrt5 - b;
        const row = {
            n: i,
            "phi^1": (SQRT_5 + 1) / 2,
            fraction: phi,
            "phi^n": real,
            "[a*√5, b]": [aSqrt5, b],
            diff: diff,
            "[a, b]": [f, l]
        };
        rows.push(row);
    }
    return rows;
}

function getPhiPower(power) {
    const rows = [];
    const f = fib(power);
    const l = lucas(power, 1, 3);
    const phi = `(${f} √5 + ${l}) / 2`;
    const real = (f * SQRT_5 + l) / 2;
    const aSqrt5 = f * SQRT_5;
    const b = l;
    const diff = aSqrt5 - b;
    const row = {
        power: power,
        "phi^1": (SQRT_5 + 1) / 2,
        fraction: phi,
        "phi^power": real,
        "[a*√5, b]": [aSqrt5, b],
        diff: diff,
        "[a, b]": [f, l]
    };
    rows.push(row);
    return rows;
}

function phiA(n) {
    if (n === 1) return 1;
    if (n === 2) return 3;
    return phiA(n - 2) + phiA(n - 1);
}

function phiFirstN(n) {
    const phiPowers = [];
    for (let p = 1; p <= n; p++) {
        const a = phiA(p);
        const b = fib(p);
        const phiStr = `(${a} + ${b} √5) / 2`;
        phiPowers.push(phiStr);
    }
    return phiPowers;
}

module.exports = {
    getPhi,
    getPhiPower,
};