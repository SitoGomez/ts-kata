import {
  Dice,
  PairCategory,
  Roll,
  SimpleCategory,
  ThreeOfAKindCategory,
  TwoPairsCategory,
  YahtzeeGame,
} from './kata';

describe('Yahtzee', () => {
  describe.each([
    {
      roll: [1, 3, 4, 5, 6],
      category: new SimpleCategory(1),
      expectedScore: 1,
    },
    {
      roll: [1, 1, 3, 4, 5],
      category: new SimpleCategory(1),
      expectedScore: 2,
    },
    {
      roll: [1, 1, 1, 3, 4],
      category: new SimpleCategory(1),
      expectedScore: 3,
    },
    {
      roll: [1, 1, 1, 1, 3],
      category: new SimpleCategory(1),
      expectedScore: 4,
    },
    {
      roll: [1, 1, 1, 1, 1],
      category: new SimpleCategory(1),
      expectedScore: 5,
    },
    {
      roll: [2, 3, 4, 5, 6],
      category: new SimpleCategory(2),
      expectedScore: 2,
    },
    {
      roll: [2, 2, 3, 4, 5],
      category: new SimpleCategory(2),
      expectedScore: 4,
    },
    {
      roll: [2, 2, 2, 3, 4],
      category: new SimpleCategory(2),
      expectedScore: 6,
    },
    {
      roll: [2, 2, 2, 2, 3],
      category: new SimpleCategory(2),
      expectedScore: 8,
    },
    {
      roll: [2, 2, 2, 2, 2],
      category: new SimpleCategory(2),
      expectedScore: 10,
    },
    {
      roll: [3, 4, 5, 6, 1],
      category: new SimpleCategory(3),
      expectedScore: 3,
    },
    {
      roll: [3, 3, 4, 5, 6],
      category: new SimpleCategory(3),
      expectedScore: 6,
    },
    {
      roll: [3, 3, 3, 5, 6],
      category: new SimpleCategory(3),
      expectedScore: 9,
    },
    {
      roll: [3, 3, 3, 3, 6],
      category: new SimpleCategory(3),
      expectedScore: 12,
    },
    {
      roll: [3, 3, 3, 3, 3],
      category: new SimpleCategory(3),
      expectedScore: 15,
    },
    {
      roll: [4, 5, 6, 6, 1],
      category: new SimpleCategory(4),
      expectedScore: 4,
    },
    {
      roll: [4, 4, 5, 6, 1],
      category: new SimpleCategory(4),
      expectedScore: 8,
    },
    {
      roll: [4, 4, 4, 6, 1],
      category: new SimpleCategory(4),
      expectedScore: 12,
    },
    {
      roll: [4, 4, 4, 4, 1],
      category: new SimpleCategory(4),
      expectedScore: 16,
    },
    {
      roll: [4, 4, 4, 4, 4],
      category: new SimpleCategory(4),
      expectedScore: 20,
    },
    {
      roll: [5, 1, 2, 3, 4],
      category: new SimpleCategory(5),
      expectedScore: 5,
    },
    {
      roll: [5, 5, 2, 3, 4],
      category: new SimpleCategory(5),
      expectedScore: 10,
    },
    {
      roll: [5, 5, 5, 3, 4],
      category: new SimpleCategory(5),
      expectedScore: 15,
    },
    {
      roll: [5, 5, 5, 5, 4],
      category: new SimpleCategory(5),
      expectedScore: 20,
    },
    {
      roll: [5, 5, 5, 5, 5],
      category: new SimpleCategory(5),
      expectedScore: 25,
    },
    {
      roll: [6, 1, 2, 3, 4],
      category: new SimpleCategory(6),
      expectedScore: 6,
    },
    {
      roll: [6, 6, 2, 3, 4],
      category: new SimpleCategory(6),
      expectedScore: 12,
    },
    {
      roll: [6, 6, 6, 3, 4],
      category: new SimpleCategory(6),
      expectedScore: 18,
    },
    {
      roll: [6, 6, 6, 6, 4],
      category: new SimpleCategory(6),
      expectedScore: 24,
    },
    {
      roll: [6, 6, 6, 6, 6],
      category: new SimpleCategory(6),
      expectedScore: 30,
    },
    {
      roll: [1, 1, 3, 4, 5],
      category: new PairCategory(),
      expectedScore: 2,
    },
    {
      roll: [2, 2, 3, 4, 5],
      category: new PairCategory(),
      expectedScore: 4,
    },
    {
      roll: [3, 3, 2, 4, 5],
      category: new PairCategory(),
      expectedScore: 6,
    },
    {
      roll: [4, 4, 2, 3, 5],
      category: new PairCategory(),
      expectedScore: 8,
    },
    {
      roll: [5, 5, 2, 3, 4],
      category: new PairCategory(),
      expectedScore: 10,
    },
    {
      roll: [6, 6, 2, 3, 4],
      category: new PairCategory(),
      expectedScore: 12,
    },
    {
      roll: [1, 1, 2, 2, 5],
      category: new TwoPairsCategory(),
      expectedScore: 6,
    },
    {
      roll: [1, 1, 3, 3, 5],
      category: new TwoPairsCategory(),
      expectedScore: 8,
    },
    {
      roll: [1, 1, 4, 4, 5],
      category: new TwoPairsCategory(),
      expectedScore: 10,
    },
    {
      roll: [1, 1, 5, 5, 2],
      category: new TwoPairsCategory(),
      expectedScore: 12,
    },
    {
      roll: [1, 1, 6, 6, 2],
      category: new TwoPairsCategory(),
      expectedScore: 14,
    },
    {
      roll: [2, 2, 3, 3, 4],
      category: new TwoPairsCategory(),
      expectedScore: 10,
    },
    {
      roll: [2, 2, 5, 5, 4],
      category: new TwoPairsCategory(),
      expectedScore: 14,
    },
    {
      roll: [2, 2, 6, 6, 4],
      category: new TwoPairsCategory(),
      expectedScore: 16,
    },
    {
      roll: [3, 3, 4, 4, 5],
      category: new TwoPairsCategory(),
      expectedScore: 14,
    },
    {
      roll: [3, 3, 5, 5, 4],
      category: new TwoPairsCategory(),
      expectedScore: 16,
    },
    {
      roll: [3, 3, 6, 6, 4],
      category: new TwoPairsCategory(),
      expectedScore: 18,
    },
    {
      roll: [4, 4, 5, 5, 6],
      category: new TwoPairsCategory(),
      expectedScore: 18,
    },
    {
      roll: [4, 4, 6, 6, 5],
      category: new TwoPairsCategory(),
      expectedScore: 20,
    },
    {
      roll: [5, 5, 6, 6, 4],
      category: new TwoPairsCategory(),
      expectedScore: 22,
    },
    {
      roll: [1, 1, 1, 2, 3],
      category: new ThreeOfAKindCategory(),
      expectedScore: 3,
    },
    {
      roll: [2, 2, 2, 3, 4],
      category: new ThreeOfAKindCategory(),
      expectedScore: 6,
    },
    {
      roll: [3, 3, 3, 2, 4],
      category: new ThreeOfAKindCategory(),
      expectedScore: 9,
    },
    {
      roll: [4, 4, 4, 2, 3],
      category: new ThreeOfAKindCategory(),
      expectedScore: 12,
    },
    {
      roll: [5, 5, 5, 2, 3],
      category: new ThreeOfAKindCategory(),
      expectedScore: 15,
    },
    {
      roll: [6, 6, 6, 2, 3],
      category: new ThreeOfAKindCategory(),
      expectedScore: 18,
    },
  ])(
    'Given a roll with $roll in $category.constructor.name category',
    ({ roll, category, expectedScore }) => {
      it(`then the score should be ${expectedScore}`, () => {
        const yahtzeeGame = new YahtzeeGame();

        yahtzeeGame.assignCategory(new Roll(...(roll as [Dice, Dice, Dice, Dice, Dice])), category);

        const score = yahtzeeGame.getScore();

        expect(score).toBe(expectedScore);
      });
    },
  );
});
