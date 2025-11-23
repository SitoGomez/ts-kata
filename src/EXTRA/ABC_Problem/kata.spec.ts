import { ABCBlocksBag } from './kata';

describe('Given a set of ABC blocks', () => {
  describe('When I try to form the word "A"', () => {
    it('Then I can', () => {
      const blocksBag = new ABCBlocksBag();

      expect(blocksBag.canMakeWord('A')).toBe(true);
    });
  });

  describe('When I try to form the word "BOOK"', () => {
    it('Then I cannot', () => {
      const blocksBag = new ABCBlocksBag();

      expect(blocksBag.canMakeWord('BOOK')).toBe(false);
    });
  });

  describe('When I try to form the word "COMMON"', () => {
    it('Then I cannot', () => {
      const blocksBag = new ABCBlocksBag();

      expect(blocksBag.canMakeWord('COMMON')).toBe(false);
    });
  });

  describe('When I try to form the word "JAZZ"', () => {
    it('Then I cannot', () => {
      const blocksBag = new ABCBlocksBag();

      expect(blocksBag.canMakeWord('JAZZ')).toBe(false);
    });
  });
});
