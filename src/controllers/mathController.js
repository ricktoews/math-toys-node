const mathUtils = require('../utils/mathUtils');
const decimalLogic = require('../utils/decimalLogic');
const phiLogic = require('../utils/phiLogic');
const calendarLogic = require('../utils/calendarLogic');

const mathController = {
    handleRecip: (req, res) => {
        const denominator = parseFloat(req.params.denominator);
        if (isNaN(denominator) || denominator === 0) {
            return res.status(400).json({ error: 'Valid non-zero denominator required' });
        }

        const result = decimalLogic.getSingleExpansion(1, denominator);

        res.json({ description: `Get the reciprocal of ${denominator}.`, data: result });
    },

    handleDc: (req, res) => {
        const denominator = parseFloat(req.params.denominator);
        if (isNaN(denominator) || denominator === 0) {
            return res.status(400).json({ error: 'Valid non-zero denominator required' });
        }
        const result = mathUtils.getExpansions(denominator);
        res.json({ description: `Get the decimal expansions for denominator ${denominator}.`, data: result });
    },

    pythagorean: (req, res) => {
        const corner = parseFloat(req.params.corner);
        if (isNaN(corner) || corner <= 0) {
            return res.status(400).json({ error: 'Valid positive corner length required' });
        }
        const result = mathUtils.pythagorean(corner); // Assume other side = 1
        res.json({ description: `Get pythagorean triples where c minus b is ${corner}.`, data: result });
    },

    phiPowers: (req, res) => {
        const powers = parseInt(req.params.powers, 10);
        if (isNaN(powers) || powers < 0) {
            return res.status(400).json({ error: 'Valid non-negative powers required' });
        }
        const result = phiLogic.getPhi(powers);
        res.json({ description: `Get phi powers from 1 to ${powers}.`, data: result });
    },

    fibonacci: (req, res) => {
        const howMany = parseInt(req.params.howmany, 10) || 100;
        let [a, b] = [1n, 1n];
        const result = { '1': a.toString(), '2': b.toString() };
        for (let i = 3; i <= howMany; i++) {
            [a, b] = [b, a + b];
            result[i.toString()] = b.toString();
        }
        res.json({ description: `First ${howMany} Fibonacci numbers.`, data: result });
    },

    // Controller method: return the nth Fibonacci number as a decimal string.
    // Uses fast-doubling with BigInt for exact results, O(log n) time.
    // Identities used:
    //   F_{2k}   = F_k * (2*F_{k+1} - F_k)
    //   F_{2k+1} = F_{k+1}^2 + F_k^2
    nthFibonacci: (req, res) => {
        const nth = parseInt(req.params.nth, 10);
        function dbl(k) {
            if (k === 0n) return [0n, 1n];
            const [a, b] = dbl(k >> 1n); // a=F(k), b=F(k+1) 
            const c = a * (2n * b - a); // F(2k) 
            const d = a * a + b * b; // F(2k+1)
            return (k & 1n) ? [d, c + d] : [c, d];
        }
        const result = dbl(BigInt(nth))[0];
        res.json({ description: `Fibonacci number ${nth}`, data: result.toString() })
    },

    calendar: (req, res) => {
        const year = parseInt(req.params.year, 10);
        const year12Digit = calendarLogic.calc12DigitYear(year).join('');
        res.json({ description: `Calendar for ${year}`, data: year12Digit });
    },

    century: (req, res) => {
        const cent = parseInt(req.params.cent, 10);
        const century = calendarLogic.century(cent);
        res.json({ description: `Calendars for century ${cent}`, data: century });
    }

};

module.exports = mathController;
