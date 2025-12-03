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
    {
      roll: [4, 5, 6, 6, 1],
      category: 'Fours',
      expectedScore: 4,
    },
    {
      roll: [4, 4, 5, 6, 1],
      category: 'Fours',
      expectedScore: 8,
    },
    {
      roll: [4, 4, 4, 6, 1],
      category: 'Fours',
      expectedScore: 12,
    },
    {
      roll: [4, 4, 4, 4, 1],
      category: 'Fours',
      expectedScore: 16,
    },
    {
      roll: [4, 4, 4, 4, 4],
      category: 'Fours',
      expectedScore: 20,
    },
    {
      roll: [5, 1, 2, 3, 4],
      category: 'Fives',
      expectedScore: 5,
    },
    {
      roll: [5, 5, 2, 3, 4],
      category: 'Fives',
      expectedScore: 10,
    },
    {
      roll: [5, 5, 5, 3, 4],
      category: 'Fives',
      expectedScore: 15,
    },
    {
      roll: [5, 5, 5, 5, 4],
      category: 'Fives',
      expectedScore: 20,
    },
    {
      roll: [5, 5, 5, 5, 5],
      category: 'Fives',
      expectedScore: 25,
    },
    {
      roll: [6, 1, 2, 3, 4],
      category: 'Sixes',
      expectedScore: 6,
    },
    {
      roll: [6, 6, 2, 3, 4],
      category: 'Sixes',
      expectedScore: 12,
    },
    {
      roll: [6, 6, 6, 3, 4],
      category: 'Sixes',
      expectedScore: 18,
    },
    {
      roll: [6, 6, 6, 6, 4],
      category: 'Sixes',
      expectedScore: 24,
    },
    {
      roll: [6, 6, 6, 6, 6],
      category: 'Sixes',
      expectedScore: 30,
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
