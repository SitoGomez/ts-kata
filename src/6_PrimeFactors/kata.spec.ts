import { PrimeFactorsCalculator } from './kata';

describe('Given an integer to get its prime factors', () => {
  describe('When the number is not an integer', () => {
    it('Then the result should fail', () => {
      const primeFactorsCalculator = new PrimeFactorsCalculator();
      expect(() => primeFactorsCalculator.getFrom(1.5)).toThrow('Input must be a positive integer');
    });
  });

  describe.each([
    {
      inputInteger: 1,
      expectedResult: [],
    },
    {
      inputInteger: 2,
      expectedResult: [2],
    },
    {
      inputInteger: 3,
      expectedResult: [3],
    },
    {
      inputInteger: 4,
      expectedResult: [2, 2],
    },
    {
      inputInteger: 5,
      expectedResult: [5],
    },
    {
      inputInteger: 6,
      expectedResult: [2, 3],
    },
    {
      inputInteger: 7,
      expectedResult: [7],
    },
    {
      inputInteger: 8,
      expectedResult: [2, 2, 2],
    },
    {
      inputInteger: 9,
      expectedResult: [3, 3],
    },
    {
      inputInteger: 13,
      expectedResult: [13],
    },
    {
      inputInteger: 17,
      expectedResult: [17],
    },
    {
      inputInteger: 19,
      expectedResult: [19],
    },
  ])('When the integer is $inputInteger', ({ inputInteger, expectedResult }) => {
    it(`Then the result should be ${expectedResult.toString()}`, () => {
      const primeFactorsCalculator = new PrimeFactorsCalculator();

      const result = primeFactorsCalculator.getFrom(inputInteger);
      expect(result).toEqual(expectedResult);
    });
  });
});
