import { CategoryType, Dice, Play, YahtzeeGame } from './kata';

describe('Yahtzee', () => {
  describe.each([
    {
      roll: [1, 3, 4, 5, 6],
      category: 'Ones',
      player: 'One',
      expectedScore: 1,
    },
    {
      roll: [1, 1, 3, 4, 5],
      category: 'Ones',
      player: 'One',
      expectedScore: 2,
    },
    {
      roll: [1, 1, 1, 3, 4],
      category: 'Ones',
      player: 'One',
      expectedScore: 3,
    },
    {
      roll: [1, 1, 1, 1, 3],
      category: 'Ones',
      player: 'One',
      expectedScore: 4,
    },
    {
      roll: [1, 1, 1, 1, 1],
      category: 'Ones',
      player: 'One',
      expectedScore: 5,
    },
    {
      roll: [2, 3, 4, 5, 6],
      category: 'Twos',
      player: 'One',
      expectedScore: 2,
    },
    {
      roll: [2, 2, 3, 4, 5],
      category: 'Twos',
      player: 'One',
      expectedScore: 4,
    },
    {
      roll: [2, 2, 2, 3, 4],
      category: 'Twos',
      player: 'One',
      expectedScore: 6,
    },
    {
      roll: [2, 2, 2, 2, 3],
      category: 'Twos',
      player: 'One',
      expectedScore: 8,
    },
    {
      roll: [2, 2, 2, 2, 2],
      category: 'Twos',
      player: 'One',
      expectedScore: 10,
    },
    {
      roll: [3, 4, 5, 6, 1],
      category: 'Threes',
      player: 'One',
      expectedScore: 3,
    },
    {
      roll: [3, 3, 4, 5, 6],
      category: 'Threes',
      player: 'One',
      expectedScore: 6,
    },
    {
      roll: [3, 3, 3, 5, 6],
      category: 'Threes',
      player: 'One',
      expectedScore: 9,
    },
    {
      roll: [3, 3, 3, 3, 6],
      category: 'Threes',
      player: 'One',
      expectedScore: 12,
    },
    {
      roll: [3, 3, 3, 3, 3],
      category: 'Threes',
      player: 'One',
      expectedScore: 15,
    },
    {
      roll: [4, 5, 6, 6, 1],
      category: 'Fours',
      player: 'One',
      expectedScore: 4,
    },
    {
      roll: [4, 4, 5, 6, 1],
      category: 'Fours',
      player: 'One',
      expectedScore: 8,
    },
    {
      roll: [4, 4, 4, 6, 1],
      category: 'Fours',
      player: 'One',
      expectedScore: 12,
    },
    {
      roll: [4, 4, 4, 4, 1],
      category: 'Fours',
      player: 'One',
      expectedScore: 16,
    },
    {
      roll: [4, 4, 4, 4, 4],
      category: 'Fours',
      player: 'One',
      expectedScore: 20,
    },
    {
      roll: [5, 1, 2, 3, 4],
      category: 'Fives',
      player: 'One',
      expectedScore: 5,
    },
    {
      roll: [5, 5, 2, 3, 4],
      category: 'Fives',
      player: 'One',
      expectedScore: 10,
    },
    {
      roll: [5, 5, 5, 3, 4],
      category: 'Fives',
      player: 'One',
      expectedScore: 15,
    },
    {
      roll: [5, 5, 5, 5, 4],
      category: 'Fives',
      player: 'One',
      expectedScore: 20,
    },
    {
      roll: [5, 5, 5, 5, 5],
      category: 'Fives',
      player: 'One',
      expectedScore: 25,
    },
    {
      roll: [6, 1, 2, 3, 4],
      category: 'Sixes',
      player: 'One',
      expectedScore: 6,
    },
    {
      roll: [6, 6, 2, 3, 4],
      category: 'Sixes',
      player: 'One',
      expectedScore: 12,
    },
    {
      roll: [6, 6, 6, 3, 4],
      category: 'Sixes',
      player: 'One',
      expectedScore: 18,
    },
    {
      roll: [6, 6, 6, 6, 4],
      category: 'Sixes',
      player: 'One',
      expectedScore: 24,
    },
    {
      roll: [6, 6, 6, 6, 6],
      category: 'Sixes',
      player: 'One',
      expectedScore: 30,
    },
    {
      roll: [1, 1, 3, 4, 5],
      category: 'Pair',
      player: 'One',
      expectedScore: 2,
    },
    {
      roll: [2, 2, 3, 4, 5],
      category: 'Pair',
      player: 'One',
      expectedScore: 4,
    },
    {
      roll: [3, 3, 2, 4, 5],
      category: 'Pair',
      player: 'One',
      expectedScore: 6,
    },
    {
      roll: [4, 4, 2, 3, 5],
      category: 'Pair',
      player: 'One',
      expectedScore: 8,
    },
    {
      roll: [5, 5, 2, 3, 4],
      category: 'Pair',
      player: 'One',
      expectedScore: 10,
    },
    {
      roll: [6, 6, 2, 3, 4],
      category: 'Pair',
      player: 'One',
      expectedScore: 12,
    },
    {
      roll: [2, 2, 5, 5, 4],
      category: 'Pair',
      player: 'One',
      expectedScore: 10,
    },
    {
      roll: [1, 1, 2, 2, 5],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 6,
    },
    {
      roll: [1, 1, 3, 3, 5],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 8,
    },
    {
      roll: [1, 1, 4, 4, 5],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 10,
    },
    {
      roll: [1, 1, 5, 5, 2],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 12,
    },
    {
      roll: [1, 1, 6, 6, 2],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 14,
    },
    {
      roll: [2, 2, 3, 3, 4],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 10,
    },
    {
      roll: [2, 2, 5, 5, 4],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 14,
    },
    {
      roll: [2, 2, 6, 6, 4],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 16,
    },
    {
      roll: [3, 3, 4, 4, 5],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 14,
    },
    {
      roll: [3, 3, 5, 5, 4],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 16,
    },
    {
      roll: [3, 3, 6, 6, 4],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 18,
    },
    {
      roll: [4, 4, 5, 5, 6],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 18,
    },
    {
      roll: [4, 4, 6, 6, 5],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 20,
    },
    {
      roll: [5, 5, 6, 6, 4],
      category: 'TwoPairs',
      player: 'One',
      expectedScore: 22,
    },
    {
      roll: [1, 1, 1, 2, 3],
      category: 'ThreeOfAKind',
      player: 'One',
      expectedScore: 3,
    },
    {
      roll: [2, 2, 2, 3, 4],
      category: 'ThreeOfAKind',
      player: 'One',
      expectedScore: 6,
    },
    {
      roll: [3, 3, 3, 2, 4],
      category: 'ThreeOfAKind',
      player: 'One',
      expectedScore: 9,
    },
    {
      roll: [4, 4, 4, 2, 3],
      category: 'ThreeOfAKind',
      player: 'One',
      expectedScore: 12,
    },
    {
      roll: [5, 5, 5, 2, 3],
      category: 'ThreeOfAKind',
      player: 'One',
      expectedScore: 15,
    },
    {
      roll: [6, 6, 6, 2, 3],
      category: 'ThreeOfAKind',
      player: 'One',
      expectedScore: 18,
    },
    {
      roll: [1, 1, 1, 1, 4],
      category: 'FourOfAKind',
      player: 'One',
      expectedScore: 4,
    },
    {
      roll: [2, 2, 2, 2, 6],
      category: 'FourOfAKind',
      player: 'One',
      expectedScore: 8,
    },
    {
      roll: [3, 3, 3, 3, 5],
      category: 'FourOfAKind',
      player: 'One',
      expectedScore: 12,
    },
    {
      roll: [4, 4, 4, 4, 1],
      category: 'FourOfAKind',
      player: 'One',
      expectedScore: 16,
    },
    {
      roll: [5, 5, 5, 5, 2],
      category: 'FourOfAKind',
      player: 'One',
      expectedScore: 20,
    },
    {
      roll: [6, 6, 6, 6, 3],
      category: 'FourOfAKind',
      player: 'One',
      expectedScore: 24,
    },
    {
      roll: [1, 2, 3, 4, 5],
      category: 'SmallStraight',
      player: 'One',
      expectedScore: 15,
    },
    {
      roll: [2, 3, 4, 5, 6],
      category: 'LargeStraight',
      player: 'One',
      expectedScore: 20,
    },
    {
      roll: [1, 1, 1, 5, 5],
      category: 'FullHouse',
      player: 'One',
      expectedScore: 25,
    },
    {
      roll: [2, 2, 2, 6, 6],
      category: 'FullHouse',
      player: 'One',
      expectedScore: 25,
    },
    {
      roll: [3, 3, 3, 1, 1],
      category: 'FullHouse',
      player: 'One',
      expectedScore: 25,
    },
    {
      roll: [4, 4, 4, 2, 2],
      category: 'FullHouse',
      player: 'One',
      expectedScore: 25,
    },
    {
      roll: [5, 5, 5, 6, 6],
      category: 'FullHouse',
      player: 'One',
      expectedScore: 25,
    },
    {
      roll: [6, 6, 6, 1, 1],
      category: 'FullHouse',
      player: 'One',
      expectedScore: 25,
    },
    {
      roll: [1, 1, 1, 1, 1],
      category: 'Yahtzee',
      player: 'One',
      expectedScore: 50,
    },
    {
      roll: [2, 2, 2, 2, 2],
      category: 'Yahtzee',
      player: 'One',
      expectedScore: 50,
    },
    {
      roll: [3, 3, 3, 3, 3],
      category: 'Yahtzee',
      player: 'One',
      expectedScore: 50,
    },
    {
      roll: [4, 4, 4, 4, 4],
      category: 'Yahtzee',
      player: 'One',
      expectedScore: 50,
    },
    {
      roll: [5, 5, 5, 5, 5],
      category: 'Yahtzee',
      player: 'One',
      expectedScore: 50,
    },
    {
      roll: [6, 6, 6, 6, 6],
      category: 'Yahtzee',
      player: 'One',
      expectedScore: 50,
    },
  ])(
    'Given a roll with $roll in $category.constructor.name category',
    ({ roll, category, player, expectedScore }) => {
      it(`then the score should be ${expectedScore}`, () => {
        const yahtzeeGame = new YahtzeeGame();

        yahtzeeGame.assignPlay(
          Play.fromPlayerCategoryAndRoll(
            category as CategoryType,
            roll as [Dice, Dice, Dice, Dice, Dice],
            player,
          ),
        );

        const score = yahtzeeGame.getScoreByPlayer(player);

        expect(score).toBe(expectedScore);
      });
    },
  );

  describe('When the same category is assigned twice', () => {
    it('then the second assignment score should be 0', () => {
      const yahtzeeGame = new YahtzeeGame();

      const player = 'One';

      const firstPlay = Play.fromPlayerCategoryAndRoll('Ones', [1, 1, 2, 3, 4], player);
      const secondPlay = Play.fromPlayerCategoryAndRoll('Ones', [1, 1, 1, 1, 1], player);

      yahtzeeGame.assignPlay(firstPlay);
      yahtzeeGame.assignPlay(secondPlay);

      const score = yahtzeeGame.getScoreByPlayer(player);

      expect(score).toBe(2);
    });
  });

  describe('When all the categories have been assigned', () => {
    it('then the game is finished', () => {
      const yahtzeeGame = new YahtzeeGame();

      const player = 'One';

      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Ones', [1, 1, 1, 1, 1], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Twos', [2, 2, 2, 2, 2], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Threes', [3, 3, 3, 3, 3], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Fours', [4, 4, 4, 4, 4], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Fives', [5, 5, 5, 5, 5], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Sixes', [6, 6, 6, 6, 6], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Pair', [6, 6, 2, 3, 4], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('TwoPairs', [5, 5, 6, 6, 4], player));
      yahtzeeGame.assignPlay(
        Play.fromPlayerCategoryAndRoll('ThreeOfAKind', [3, 3, 3, 2, 4], player),
      );
      yahtzeeGame.assignPlay(
        Play.fromPlayerCategoryAndRoll('FourOfAKind', [4, 4, 4, 4, 1], player),
      );
      yahtzeeGame.assignPlay(
        Play.fromPlayerCategoryAndRoll('SmallStraight', [1, 2, 3, 4, 5], player),
      );
      yahtzeeGame.assignPlay(
        Play.fromPlayerCategoryAndRoll('LargeStraight', [2, 3, 4, 5, 6], player),
      );
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('FullHouse', [5, 5, 5, 6, 6], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Yahtzee', [6, 6, 6, 6, 6], player));

      expect(yahtzeeGame.isFinished()).toBe(true);
    });
  });

  describe('When not all the categories have been assigned', () => {
    it('then the game is not finished', () => {
      const yahtzeeGame = new YahtzeeGame();

      const player = 'One';

      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Ones', [1, 1, 1, 1, 1], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Twos', [2, 2, 2, 2, 2], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Threes', [3, 3, 3, 3, 3], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Fours', [4, 4, 4, 4, 4], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Fives', [5, 5, 5, 5, 5], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Sixes', [6, 6, 6, 6, 6], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('Pair', [6, 6, 2, 3, 4], player));
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('TwoPairs', [5, 5, 6, 6, 4], player));
      yahtzeeGame.assignPlay(
        Play.fromPlayerCategoryAndRoll('ThreeOfAKind', [3, 3, 3, 2, 4], player),
      );
      yahtzeeGame.assignPlay(
        Play.fromPlayerCategoryAndRoll('FourOfAKind', [4, 4, 4, 4, 1], player),
      );
      yahtzeeGame.assignPlay(
        Play.fromPlayerCategoryAndRoll('SmallStraight', [1, 2, 3, 4, 5], player),
      );
      yahtzeeGame.assignPlay(
        Play.fromPlayerCategoryAndRoll('LargeStraight', [2, 3, 4, 5, 6], player),
      );
      yahtzeeGame.assignPlay(Play.fromPlayerCategoryAndRoll('FullHouse', [5, 5, 5, 6, 6], player));
      expect(yahtzeeGame.isFinished()).toBe(false);
    });
  });

  describe('When two players are playing simultaneously', () => {
    it('then their scores should be different', () => {
      const yahtzeeGame = new YahtzeeGame();

      const playerOne = 'One';
      const playerTwo = 'Two';

      const playerOnePlay = Play.fromPlayerCategoryAndRoll('Ones', [1, 1, 2, 3, 4], playerOne);
      const playerOneSecondPlay = Play.fromPlayerCategoryAndRoll(
        'FullHouse',
        [2, 2, 3, 3, 3],
        playerOne,
      );
      const playerTwoPlay = Play.fromPlayerCategoryAndRoll('Sixes', [6, 6, 6, 5, 4], playerTwo);
      const playerTwoSecondPlay = Play.fromPlayerCategoryAndRoll(
        'LargeStraight',
        [2, 3, 4, 5, 6],
        playerTwo,
      );

      yahtzeeGame.assignPlay(playerOneSecondPlay);
      yahtzeeGame.assignPlay(playerTwoSecondPlay);
      yahtzeeGame.assignPlay(playerOnePlay);

      const playerOneScore = yahtzeeGame.getScoreByPlayer(playerOne);
      expect(playerOneScore).toBe(27);

      yahtzeeGame.assignPlay(playerTwoPlay);

      const playerTwoScore = yahtzeeGame.getScoreByPlayer(playerTwo);
      expect(playerTwoScore).toBe(38);
    });
  });
});
