const mathUtils = require('../utils/mathUtils');
const decimalLogic = require('../utils/decimalLogic');
const phiLogic = require('../utils/phiLogic');

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
    }
};

module.exports = mathController;
