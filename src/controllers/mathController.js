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

        res.json({ result });
    },

    handleDc: (req, res) => {
        const denominator = parseFloat(req.params.denominator);
        if (isNaN(denominator) || denominator === 0) {
            return res.status(400).json({ error: 'Valid non-zero denominator required' });
        }
        const result = mathUtils.getExpansions(denominator);
        res.json({ result });
    },

    pythagorean: (req, res) => {
        const corner = parseFloat(req.params.corner);
        if (isNaN(corner) || corner <= 0) {
            return res.status(400).json({ error: 'Valid positive corner length required' });
        }
        const result = mathUtils.pythagorean(corner); // Assume other side = 1
        res.json({ result });
    },

    phiPowers: (req, res) => {
        const powers = parseInt(req.params.powers, 10);
        if (isNaN(powers) || powers < 0) {
            return res.status(400).json({ error: 'Valid non-negative powers required' });
        }
        const result = phiLogic.getPhi(powers);
        res.json({ result });
    }
};

module.exports = mathController;
