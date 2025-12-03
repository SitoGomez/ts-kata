import { CategoryType, Dice, Roll, YahtzeeGame } from './kata';

describe('Yahtzee', () => {
  describe.each([
    {
      roll: [1, 3, 4, 5, 6],
      category: 'Ones',
      expectedScore: 1,
    },
    {
      roll: [1, 1, 3, 4, 5],
      category: 'Ones',
      expectedScore: 2,
    },
    {
      roll: [1, 1, 1, 3, 4],
      category: 'Ones',
      expectedScore: 3,
    },
    {
      roll: [1, 1, 1, 1, 3],
      category: 'Ones',
      expectedScore: 4,
    },
    {
      roll: [1, 1, 1, 1, 1],
      category: 'Ones',
      expectedScore: 5,
    },
    {
      roll: [2, 3, 4, 5, 6],
      category: 'Twos',
      expectedScore: 2,
    },
    {
      roll: [2, 2, 3, 4, 5],
      category: 'Twos',
      expectedScore: 4,
    },
    {
      roll: [2, 2, 2, 3, 4],
      category: 'Twos',
      expectedScore: 6,
    },
    {
      roll: [2, 2, 2, 2, 3],
      category: 'Twos',
      expectedScore: 8,
    },
    {
      roll: [2, 2, 2, 2, 2],
      category: 'Twos',
      expectedScore: 10,
    },
    {
      roll: [3, 4, 5, 6, 1],
      category: 'Threes',
      expectedScore: 3,
    },
    {
      roll: [3, 3, 4, 5, 6],
      category: 'Threes',
      expectedScore: 6,
    },
    {
      roll: [3, 3, 3, 5, 6],
      category: 'Threes',
      expectedScore: 9,
    },
    {
      roll: [3, 3, 3, 3, 6],
      category: 'Threes',
      expectedScore: 12,
    },
    {
      roll: [3, 3, 3, 3, 3],
      category: 'Threes',
      expectedScore: 15,
    },
  ])('Given a roll with $roll in $category category', ({ roll, category, expectedScore }) => {
    it(`then the score should be ${expectedScore}`, () => {
      const yahtzeeGame = new YahtzeeGame();

      yahtzeeGame.assignCategory(
        new Roll(...(roll as [Dice, Dice, Dice, Dice, Dice])),
        category as CategoryType,
      );

      const score = yahtzeeGame.getScore();

      expect(score).toBe(expectedScore);
    });
  });
});
