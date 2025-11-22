import { RomanNumberConverter } from './kata';

describe('Given a decimal number', () => {
  describe('When the number is 1', () => {
    it('then it should return I', () => {
      const decimalNumber = 1;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('I');
    });
  });

  describe('When the number is 2', () => {
    it('then it should return II', () => {
      const decimalNumber = 2;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('II');
    });
  });

  describe('When the number is 3', () => {
    it('then it should return III', () => {
      const decimalNumber = 3;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('III');
    });
  });

  describe('When the number is 4', () => {
    it('then it should return IV', () => {
      const decimalNumber = 4;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('IV');
    });
  });

  describe('When the number is 5', () => {
    it('then it should return V', () => {
      const decimalNumber = 5;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('V');
    });
  });

  describe('When the number is 6', () => {
    it('then it should return VI', () => {
      const decimalNumber = 6;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('VI');
    });
  });

  describe('When the number is 7', () => {
    it('then it should return VII', () => {
      const decimalNumber = 7;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('VII');
    });
  });

  describe('When the number is 8', () => {
    it('then it should return VIII', () => {
      const decimalNumber = 8;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('VIII');
    });
  });

  describe('When the number is 9', () => {
    it('then it should return IX', () => {
      const decimalNumber = 9;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('IX');
    });
  });

  describe('When the number is 10', () => {
    it('then it should return X', () => {
      const decimalNumber = 10;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('X');
    });
  });

  describe('When the number is 11', () => {
    it('then it should return XI', () => {
      const decimalNumber = 11;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('XI');
    });
  });

  describe('When the number is 12', () => {
    it('then it should return XII', () => {
      const decimalNumber = 12;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('XII');
    });
  });

  describe('When the number is 13', () => {
    it('then it should return XIII', () => {
      const decimalNumber = 13;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('XIII');
    });
  });

  describe('When the number is 14', () => {
    it('then it should return XIV', () => {
      const decimalNumber = 14;
      const instance = new RomanNumberConverter();

      const romanNumeral = instance.toRoman(decimalNumber);

      expect(romanNumeral).toBe('XIV');
    });
  });
});
