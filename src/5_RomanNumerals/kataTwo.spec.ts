import { RomanNumeralConverter } from './kataTwo';

describe('Given a decimal number', () => {
  describe.each([
    {
      decimal: 1,
      roman: 'I',
    },
    {
      decimal: 2,
      roman: 'II',
    },
    {
      decimal: 3,
      roman: 'III',
    },
    {
      decimal: 4,
      roman: 'IV',
    },
    {
      decimal: 5,
      roman: 'V',
    },
    {
      decimal: 6,
      roman: 'VI',
    },
    {
      decimal: 7,
      roman: 'VII',
    },
    {
      decimal: 8,
      roman: 'VIII',
    },
    {
      decimal: 9,
      roman: 'IX',
    },
    {
      decimal: 10,
      roman: 'X',
    },
    {
      decimal: 11,
      roman: 'XI',
    },
    {
      decimal: 12,
      roman: 'XII',
    },
    {
      decimal: 13,
      roman: 'XIII',
    },
    {
      decimal: 39,
      roman: 'XXXIX',
    },
    {
      decimal: 40,
      roman: 'XL',
    },
    {
      decimal: 41,
      roman: 'XLI',
    },
    {
      decimal: 42,
      roman: 'XLII',
    },
    {
      decimal: 50,
      roman: 'L',
    },
    {
      decimal: 51,
      roman: 'LI',
    },
    {
      decimal: 52,
      roman: 'LII',
    },
    {
      decimal: 89,
      roman: 'LXXXIX',
    },
    {
      decimal: 90,
      roman: 'XC',
    },
    {
      decimal: 91,
      roman: 'XCI',
    },
    {
      decimal: 92,
      roman: 'XCII',
    },
    {
      decimal: 2999,
      roman: 'MMCMXCIX',
    },
  ])('When the number is %i', (mapped) => {
    //TODO
    it('Then it should return X', () => {
      const conversor = new RomanNumeralConverter();

      const result = conversor.toRoman(mapped.decimal);

      expect(result).toBe(mapped.roman);
    });
  });
});
