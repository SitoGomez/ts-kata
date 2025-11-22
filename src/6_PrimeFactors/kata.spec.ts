import { PrimeFactorsCalculator } from './kata';

describe('Given an integer to get its prime factors', () => {
  describe('When the number is not an integer', () => {
    it('Then the result should fail', () => {
      const primeFactorsCalculator = new PrimeFactorsCalculator();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      expect(() => primeFactorsCalculator.getFrom(1.5)).toThrow('Input must be a positive integer');
    });
  });

  describe.each([
    {
      inputInteger: 1,
      expectedResult: '[]',
    },
    {
      inputInteger: 2,
      expectedResult: '[2]',
    },
    {
      inputInteger: 3,
      expectedResult: '[3]',
    },
    {
      inputInteger: 4,
      expectedResult: '[2,2]',
    },
    {
      inputInteger: 5,
      expectedResult: '[5]',
    },
  ])('When the integer is $inputInteger', ({ inputInteger, expectedResult }) => {
    it(`Then the result should be ${expectedResult}`, () => {
      const primeFactorsCalculator = new PrimeFactorsCalculator();

      const result = primeFactorsCalculator.getFrom(inputInteger);
      expect(result).toBe(expectedResult);
    });
  });
});
