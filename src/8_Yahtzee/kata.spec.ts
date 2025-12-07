import { Category, CategoryType, Dice, Roll, YahtzeeGame } from './kata';

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
    {
      roll: [1, 1, 3, 4, 5],
      category: 'Pair',
      expectedScore: 2,
    },
    {
      roll: [2, 2, 3, 4, 5],
      category: 'Pair',
      expectedScore: 4,
    },
    {
      roll: [3, 3, 2, 4, 5],
      category: 'Pair',
      expectedScore: 6,
    },
    {
      roll: [4, 4, 2, 3, 5],
      category: 'Pair',
      expectedScore: 8,
    },
    {
      roll: [5, 5, 2, 3, 4],
      category: 'Pair',
      expectedScore: 10,
    },
    {
      roll: [6, 6, 2, 3, 4],
      category: 'Pair',
      expectedScore: 12,
    },
    {
      roll: [1, 1, 2, 2, 5],
      category: 'TwoPairs',
      expectedScore: 6,
    },
    {
      roll: [1, 1, 3, 3, 5],
      category: 'TwoPairs',
      expectedScore: 8,
    },
    {
      roll: [1, 1, 4, 4, 5],
      category: 'TwoPairs',
      expectedScore: 10,
    },
    {
      roll: [1, 1, 5, 5, 2],
      category: 'TwoPairs',
      expectedScore: 12,
    },
    {
      roll: [1, 1, 6, 6, 2],
      category: 'TwoPairs',
      expectedScore: 14,
    },
    {
      roll: [2, 2, 3, 3, 4],
      category: 'TwoPairs',
      expectedScore: 10,
    },
    {
      roll: [2, 2, 5, 5, 4],
      category: 'TwoPairs',
      expectedScore: 14,
    },
    {
      roll: [2, 2, 6, 6, 4],
      category: 'TwoPairs',
      expectedScore: 16,
    },
    {
      roll: [3, 3, 4, 4, 5],
      category: 'TwoPairs',
      expectedScore: 14,
    },
    {
      roll: [3, 3, 5, 5, 4],
      category: 'TwoPairs',
      expectedScore: 16,
    },
    {
      roll: [3, 3, 6, 6, 4],
      category: 'TwoPairs',
      expectedScore: 18,
    },
    {
      roll: [4, 4, 5, 5, 6],
      category: 'TwoPairs',
      expectedScore: 18,
    },
    {
      roll: [4, 4, 6, 6, 5],
      category: 'TwoPairs',
      expectedScore: 20,
    },
    {
      roll: [5, 5, 6, 6, 4],
      category: 'TwoPairs',
      expectedScore: 22,
    },
    {
      roll: [1, 1, 1, 2, 3],
      category: 'ThreeOfAKind',
      expectedScore: 3,
    },
    {
      roll: [2, 2, 2, 3, 4],
      category: 'ThreeOfAKind',
      expectedScore: 6,
    },
    {
      roll: [3, 3, 3, 2, 4],
      category: 'ThreeOfAKind',
      expectedScore: 9,
    },
    {
      roll: [4, 4, 4, 2, 3],
      category: 'ThreeOfAKind',
      expectedScore: 12,
    },
    {
      roll: [5, 5, 5, 2, 3],
      category: 'ThreeOfAKind',
      expectedScore: 15,
    },
    {
      roll: [6, 6, 6, 2, 3],
      category: 'ThreeOfAKind',
      expectedScore: 18,
    },
    {
      roll: [6, 6, 6, 6, 3],
      category: 'FourOfAKind',
      expectedScore: 24,
    },
  ])(
    'Given a roll with $roll in $category.constructor.name category',
    ({ roll, category, expectedScore }) => {
      it(`then the score should be ${expectedScore}`, () => {
        const yahtzeeGame = new YahtzeeGame();

        yahtzeeGame.assignCategory(
          new Roll(...(roll as [Dice, Dice, Dice, Dice, Dice])),
          new Category(category as CategoryType),
        );

        const score = yahtzeeGame.getScore();

        expect(score).toBe(expectedScore);
      });
    },
  );
});
