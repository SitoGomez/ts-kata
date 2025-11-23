import { ABCBlocksBag } from './kata';

describe('Given a set of ABC blocks', () => {
  describe('When I try to form the word "A"', () => {
    it('Then I can', () => {
      const blocksBag = new ABCBlocksBag();

      expect(blocksBag.canMakeWord('A')).toBe(true);
    });
  });
});
