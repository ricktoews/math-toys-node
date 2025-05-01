const decimalLogic = require('../src/utils/decimalLogic');

describe('decimalLogic', () => {
    // Existing test for /dc/13 (if present)
    test('getExpansions for denominator=13', () => {
        const result = decimalLogic.getExpansions(13);
        const expected = {
            byExpansion: {
                '153846': [
                    { numerator: 2, position: 1, beginRepeat: 1 },
                    { numerator: 5, position: 3, beginRepeat: 1 },
                    { numerator: 6, position: 5, beginRepeat: 1 },
                    { numerator: 7, position: 2, beginRepeat: 1 },
                    { numerator: 8, position: 6, beginRepeat: 1 },
                    { numerator: 11, position: 4, beginRepeat: 1 }
                ],
                '076923': [
                    { numerator: 1, position: 1, beginRepeat: 1 },
                    { numerator: 3, position: 5, beginRepeat: 1 },
                    { numerator: 4, position: 6, beginRepeat: 1 },
                    { numerator: 9, position: 3, beginRepeat: 1 },
                    { numerator: 10, position: 2, beginRepeat: 1 },
                    { numerator: 12, position: 4, beginRepeat: 1 }
                ]
            },
            byNumerator: {
                '1': { expansion: '076923', position: 1, beginRepeat: 1 },
                '2': { expansion: '153846', position: 1, beginRepeat: 1 },
                '3': { expansion: '230769', position: 5, beginRepeat: 1 },
                '4': { expansion: '307692', position: 6, beginRepeat: 1 },
                '5': { expansion: '384615', position: 3, beginRepeat: 1 },
                '6': { expansion: '461538', position: 5, beginRepeat: 1 },
                '7': { expansion: '538461', position: 2, beginRepeat: 1 },
                '8': { expansion: '615384', position: 6, beginRepeat: 1 },
                '9': { expansion: '692307', position: 3, beginRepeat: 1 },
                '10': { expansion: '769230', position: 2, beginRepeat: 1 },
                '11': { expansion: '846153', position: 4, beginRepeat: 1 },
                '12': { expansion: '923076', position: 4, beginRepeat: 1 }
            }
        };
        expect(result).toEqual(expected);
    });

    // New test for /recip/17
    test('reciprocal for denominator=17', () => {
        const result = decimalLogic.getSingleExpansion(1,17);
        const expected = {
            expansion: '0588235294117647',
            expansionNumerators: {
                '1': 1,
                '2': 11,
                '3': 12,
                '4': 5,
                '5': 8,
                '6': 6,
                '7': 10,
                '8': 15,
                '9': 7,
                '10': 2,
                '11': 14,
                '12': 16,
                '13': 13,
                '14': 4,
                '15': 3,
                '16': 9
            },
            beginRepeat: 1,
            expansionLength: 16
        };
        expect(result).toEqual(expected);
    });
});
