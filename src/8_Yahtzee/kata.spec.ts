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
      roll: [2, 2, 5, 5, 4],
      category: 'Pair',
      expectedScore: 10,
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
      roll: [1, 1, 1, 1, 4],
      category: 'FourOfAKind',
      expectedScore: 4,
    },
    {
      roll: [2, 2, 2, 2, 6],
      category: 'FourOfAKind',
      expectedScore: 8,
    },
    {
      roll: [3, 3, 3, 3, 5],
      category: 'FourOfAKind',
      expectedScore: 12,
    },
    {
      roll: [4, 4, 4, 4, 1],
      category: 'FourOfAKind',
      expectedScore: 16,
    },
    {
      roll: [5, 5, 5, 5, 2],
      category: 'FourOfAKind',
      expectedScore: 20,
    },
    {
      roll: [6, 6, 6, 6, 3],
      category: 'FourOfAKind',
      expectedScore: 24,
    },
    {
      roll: [1, 2, 3, 4, 5],
      category: 'SmallStraight',
      expectedScore: 15,
    },
    {
      roll: [2, 3, 4, 5, 6],
      category: 'LargeStraight',
      expectedScore: 20,
    },
    {
      roll: [1, 1, 1, 5, 5],
      category: 'FullHouse',
      expectedScore: 25,
    },
    {
      roll: [2, 2, 2, 6, 6],
      category: 'FullHouse',
      expectedScore: 25,
    },
    {
      roll: [3, 3, 3, 1, 1],
      category: 'FullHouse',
      expectedScore: 25,
    },
    {
      roll: [4, 4, 4, 2, 2],
      category: 'FullHouse',
      expectedScore: 25,
    },
    {
      roll: [5, 5, 5, 6, 6],
      category: 'FullHouse',
      expectedScore: 25,
    },
    {
      roll: [6, 6, 6, 1, 1],
      category: 'FullHouse',
      expectedScore: 25,
    },
    {
      roll: [1, 1, 1, 1, 1],
      category: 'Yahtzee',
      expectedScore: 50,
    },
    {
      roll: [2, 2, 2, 2, 2],
      category: 'Yahtzee',
      expectedScore: 50,
    },
    {
      roll: [3, 3, 3, 3, 3],
      category: 'Yahtzee',
      expectedScore: 50,
    },
    {
      roll: [4, 4, 4, 4, 4],
      category: 'Yahtzee',
      expectedScore: 50,
    },
    {
      roll: [5, 5, 5, 5, 5],
      category: 'Yahtzee',
      expectedScore: 50,
    },
    {
      roll: [6, 6, 6, 6, 6],
      category: 'Yahtzee',
      expectedScore: 50,
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

  describe('When the same category is assigned twice', () => {
    it('then the second assignment score should be 0', () => {
      const yahtzeeGame = new YahtzeeGame();

      const roll1 = new Roll(1, 1, 2, 3, 4);
      const category = new Category('Ones');

      yahtzeeGame.assignCategory(roll1, category);

      const roll2 = new Roll(1, 1, 1, 4, 5);

      yahtzeeGame.assignCategory(roll2, category);

      const score = yahtzeeGame.getScore();

      expect(score).toBe(2);
    });
  });

  describe('When all the categories have been assigned', () => {
    it('then the game is finished', () => {
      const yahtzeeGame = new YahtzeeGame();

      yahtzeeGame.assignCategory(new Roll(1, 1, 1, 1, 1), new Category('Ones'));
      yahtzeeGame.assignCategory(new Roll(2, 2, 2, 2, 2), new Category('Twos'));
      yahtzeeGame.assignCategory(new Roll(3, 3, 3, 3, 3), new Category('Threes'));
      yahtzeeGame.assignCategory(new Roll(4, 4, 4, 4, 4), new Category('Fours'));
      yahtzeeGame.assignCategory(new Roll(5, 5, 5, 5, 5), new Category('Fives'));
      yahtzeeGame.assignCategory(new Roll(6, 6, 6, 6, 6), new Category('Sixes'));
      yahtzeeGame.assignCategory(new Roll(1, 1, 2, 2, 3), new Category('Pair'));
      yahtzeeGame.assignCategory(new Roll(1, 1, 2, 2, 3), new Category('TwoPairs'));
      yahtzeeGame.assignCategory(new Roll(2, 2, 2, 3, 4), new Category('ThreeOfAKind'));
      yahtzeeGame.assignCategory(new Roll(2, 2, 2, 2, 5), new Category('FourOfAKind'));
      yahtzeeGame.assignCategory(new Roll(1, 2, 3, 4, 5), new Category('SmallStraight'));
      yahtzeeGame.assignCategory(new Roll(2, 3, 4, 5, 6), new Category('LargeStraight'));
      yahtzeeGame.assignCategory(new Roll(2, 2, 2, 3, 3), new Category('FullHouse'));
      yahtzeeGame.assignCategory(new Roll(6, 6, 6, 6, 6), new Category('Yahtzee'));

      expect(yahtzeeGame.isFinished()).toBe(true);
    });
  });
});
