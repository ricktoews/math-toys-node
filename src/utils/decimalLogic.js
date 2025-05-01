const primes = require('./primes');

function digitsToExpansion(digits, ndx) {
    const periodDigits = digits.slice(ndx) + digits.slice(0, ndx);
    return periodDigits;
}

function divide(num, denom) {
    const BASE = 10;
    const digits = [];
    const numerators = new Map();
    let position = 1;

    while (num > 0 && !numerators.has(num)) {
        numerators.set(num, position);
        position++;
        const digit = Math.floor((num * BASE) / denom);
        digits.push(digit);
        num = num * BASE - digit * denom;
    }

    const beginRepeat = num > 0 ? numerators.get(num) : -1;

    return {
        expansion: digits.join(''),
        expansionNumerators: Object.fromEntries(numerators),
        beginRepeat: beginRepeat
    };
}

function getExpansions(denom) {
    const isPrime = primes.includes(denom); // Assumes primes is an array of prime numbers
    const byNumerator = {};
    const byExpansion = {};

    for (let num = 1; num < denom; num++) {
        // Check if numerator has already been calculated
        if (byNumerator[num]) {
            byNumerator[num].expansion = digitsToExpansion(
                byNumerator[num].expansion,
                byNumerator[num].position - 1
            );
            continue;
        }

        // Calculate the expansion
        const result = divide(num, denom);
        const expansion = result.expansion || '';
        const expansionNumerators = result.expansionNumerators || {};

        byNumerator[num] = {
            expansion,
            position: expansionNumerators[num],
            beginRepeat: result.beginRepeat || -1
        };

        if (!byExpansion[expansion]) {
            byExpansion[expansion] = [];
        }

        byExpansion[expansion].push({
            numerator: num,
            position: expansionNumerators[num],
            beginRepeat: result.beginRepeat || -1
        });

        // This block is only for prime numbers
        if (!isPrime) {
            continue;
        }

        for (let n in expansionNumerators) {
            n = parseInt(n);
            if (n === num) {
                continue;
            }

            byExpansion[expansion].push({
                numerator: n,
                position: expansionNumerators[n],
                beginRepeat: 1
            });

            byNumerator[n] = {
                expansion,
                position: expansionNumerators[n],
                beginRepeat: 1
            };
        }
    }

    return { byExpansion, byNumerator };
}

function getSingleExpansion(num, denom) {
    const result = divide(num, denom);
    result.expansionLength = result.expansion ? result.expansion.length : 0;
    return result;
}

const decimalLogic = {
    getSingleExpansion,
    getExpansions,
};

module.exports = decimalLogic;
