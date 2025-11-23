import { BowlingGame } from './kata';

describe('Given an user playing a Bowling Game', () => {
  describe.each([0, 1, 2])('When the user knocks down %i pins', (pinsKnockedDown) => {
    it(`Then the score should be ${pinsKnockedDown}`, () => {
      const game = new BowlingGame();

      game.roll(pinsKnockedDown);

      expect(game.currentScore()).toBe(pinsKnockedDown);
    });
  });
});
