import { PrimeFactorsCalculator } from './kata';

describe('Given an integer to get its prime factors', () => {
  describe('When the integer is 1', () => {
    it('Then the result should be an empty array', () => {
      const primeFactorsCalculator = new PrimeFactorsCalculator();

      const result = primeFactorsCalculator.getFrom(1);

      expect(result).toEqual([]);
    });
  });

  describe('When the number is not an integer', () => {
    it('Then the result should fail', () => {
      const primeFactorsCalculator = new PrimeFactorsCalculator();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      expect(() => primeFactorsCalculator.getFrom(1.5)).toThrow('Input must be a positive integer');
    });
  });
});
