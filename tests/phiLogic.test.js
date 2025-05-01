const phiLogic = require('../src/utils/phiLogic');

describe('phiLogic', () => {
/*
    test('getPhiPower for power=3', () => {
        const result = phiLogic.getPhiPower(3);
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            power: 3,
            "phi^1": expect.closeTo(1.618033988749895, 10),
            fraction: "(2 √5 + 7) / 2",
            "phi^power": expect.closeTo(2.618033988749895, 10)
        });
    });
*/
    test('getPhi for max=2', () => {
        const result = phiLogic.getPhi(2);
        expect(result).toHaveLength(2);
        expect(result[1].n).toBe(2);
        expect(result[1]["phi^n"]).toBeCloseTo(2.618033988749895, 10);
    });
});
