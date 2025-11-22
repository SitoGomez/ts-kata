import { LeapYearCalculator } from './kata';

describe('Given a year to determined is its leap year', () => {
  describe('When the year is 1', () => {
    it('then the year is not a leap year', () => {
      const instance = new LeapYearCalculator(1);

      const result = instance.calculate();

      expect(result).toBe(false);
    });
  });

  describe('When the year is 4', () => {
    it('then the year is a leap year', () => {
      const instance = new LeapYearCalculator(4);

      const result = instance.calculate();

      expect(result).toBe(true);
    });
  });

  describe('When the year is 8', () => {
    it('then the year is a leap year', () => {
      const instance = new LeapYearCalculator(8);

      const result = instance.calculate();

      expect(result).toBe(true);
    });
  });

  describe('When the year is 12', () => {
    it('then the year is a leap year', () => {
      const instance = new LeapYearCalculator(12);

      const result = instance.calculate();

      expect(result).toBe(true);
    });
  });

  describe.each([4, 8, 12])('When the year (%i) is divisible by 4)', (year: number) => {
    it('then the year is a leap year', () => {
      const instance = new LeapYearCalculator(year);

      const result = instance.calculate();

      expect(result).toBe(true);
    });
  });

  describe.each([100, 200, 300])('When the year (%i) is divisible by 100', (year: number) => {
    it('then the year is not a leap year', () => {
      const instance = new LeapYearCalculator(year);

      const result = instance.calculate();

      expect(result).toBe(false);
    });
  });

  describe.each([400, 800, 1200])('When the year (%i) is divisible by 400', (year: number) => {
    it('then the year is a leap year', () => {
      const instance = new LeapYearCalculator(year);

      const result = instance.calculate();

      expect(result).toBe(true);
    });
  });
});
