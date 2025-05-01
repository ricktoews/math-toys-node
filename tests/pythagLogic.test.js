const pythagLogic = require('../src/utils/pythagLogic');

describe('phiLogic', () => {
    test('Pythagorean triples for c-b=2', () => {
        const result = pythagLogic.getPythagByCorner(2);
        expect(result[2].a).toBe(8);
        expect(result[2].b).toBe(15);
        expect(result[2].c).toBe(17);
    });
});
