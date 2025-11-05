// Helper function to compute GCD using Euclidean algorithm
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Check if two numbers are coprime (GCD = 1)
function isRelativePrime(a, b) {
    return gcd(a, b) === 1;
}

// Convert get_pythag_by_corner from Python
function getPythagByCorner(paramCorner) {
    const corner = parseInt(paramCorner, 10);
    if (corner < 1) return [];

    const squares = [];
    let i = 1;
    let circuitBreaker = 50;

    while (squares.length <= 40 && circuitBreaker > 0) {
        const test = corner * (corner + 2 * i);
        const sqrt = Math.floor(Math.sqrt(test));
        if (sqrt * sqrt === test) {
            circuitBreaker--;
            const isPrimitive = isRelativePrime(corner, i);
            const a = sqrt;
            const b = i;
            const c = Math.floor(Math.sqrt(test + b * b));
            squares.push({ a, b, c, is_primitive: isPrimitive });
        }
        i++;
    }

    return squares;
}

// Convert find_layers from Python
function findLayers(c) {
    const result = [];
    let layerSum = 0;
    let layer = c * 2 - 1;

    while (layer > 5) {
        layerSum += layer;
        const sqRoot = Math.sqrt(layerSum);
        if (Number.isInteger(sqRoot)) {
            result.push(layerSum);
        }
        layer -= 2;
    }

    return result;
}

// Convert get_triples from Python
function getTriples(cList) {
    const data = [];
    for (const num of cList) {
        const aSquares = findLayers(num);
        const triples = [];
        if (aSquares.length > 0) {
            const used = [];
            let primes = 0;
            for (const aSquare of aSquares) {
                const a = Math.floor(Math.sqrt(aSquare));
                const c = num;
                const b = Math.floor(Math.sqrt(num * num - aSquare));
                if (!used.includes(a) && !used.includes(b)) {
                    const triple = { a, b, c };
                    if (isRelativePrime(a, b)) {
                        primes++;
                        triples.push({ ...triple, prime: true });
                    } else {
                        triples.push({ ...triple, prime: false });
                    }
                    used.push(a, b);
                }
            }
        }
        data.push({ num, a_squares: aSquares, triples });
    }

    return data;
}

module.exports = {
    pythagorean: (corner, otherSide) => {
        return Math.sqrt(corner * corner + otherSide * otherSide);
    },

    getPythagByCorner,
    findLayers,
    getTriples
};