import { ABCBlocksBag } from './kata';

describe('Given a set of ABC blocks', () => {
  describe.each([
    { word: 'A', expected: true },
    { word: 'AA', expected: true },
    {
      word: 'JJ',
      expected: false,
    },
    {
      word: 'WW',
      expected: false,
    },
    {
      word: 'HH',
      expected: false,
    },
    {
      word: 'UU',
      expected: false,
    },
    {
      word: 'VV',
      expected: false,
    },
    {
      word: 'II',
      expected: false,
    },
    {
      word: 'LL',
      expected: false,
    },
    {
      word: 'YY',
      expected: false,
    },
    {
      word: 'ZZ',
      expected: false,
    },
    {
      word: 'MM',
      expected: false,
    },
  ])('When I try to form the word "$word"', ({ word, expected }) => {
    it(`Then I ${expected ? 'can' : 'cannot'}`, () => {
      const blocksBag = new ABCBlocksBag();

      expect(blocksBag.canMakeWord(word)).toBe(expected);
    });
  });
});
