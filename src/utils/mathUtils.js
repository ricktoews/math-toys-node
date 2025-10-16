const primes = require('./primes');
const decimalLogic = require('./decimalLogic');
const pythagLogic = require('./pythagLogic');

const mathUtils = {
    primes: primes,

    // Divide constant by denominator (e.g., 1/denominator)
    reciprocal: (denominator) => {
        return decimalLogic.getSingleExpansion(1, denominator);
    },

    getExpansions: decimalLogic.getExpansions,

    // Pythagorean theorem: √(corner² + otherSide²)
    pythagorean: (corner) => {
        return pythagLogic.getPythagByCorner(corner);
    },

    // Compute powers of phi (golden ratio, ≈1.618) from 0 to n
    phiPowers: (n) => {
        const phi = (1 + Math.sqrt(5)) / 2; // ≈ 1.618
        const results = [];
        for (let i = 0; i <= n; i++) {
            results.push(Math.pow(phi, i));
        }
        return results;
    },

    factors: (n) => {
        const factors = [];
        for (const p of primes) {
            if (p > n / 2) break; // no factor can exceed n/2 (except n itself)
            if (n % p === 0) factors.push(p);
        }
        return factors;
    }

};

module.exports = mathUtils;
