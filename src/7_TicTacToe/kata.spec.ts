import { InvalidFirstPlayError, SamePlayerPlaysTwiceError, TicTacToe } from './kata';

describe('Given a game in Tic Tac Toe', () => {
  describe('When the first player places an X in an empty cell', () => {
    it('Then the cell should contain an X', () => {
      const ticTacToe = new TicTacToe();

      ticTacToe.play('X', 1, 2);

      expect(ticTacToe.getLastMove('X')).toEqual([1, 2]);
    });
  });

  describe('When the first player plays then the second player plays O', () => {
    it('Then the cell should contain an O', () => {
      const ticTacToe = new TicTacToe();

      ticTacToe.play('X', 2, 3);
      ticTacToe.play('O', 3, 1);

      expect(ticTacToe.getLastMove('O')).toEqual([2, 3]);
    });
  });

  describe('When the first play is the player O', () => {
    it('Then the play is not valid', () => {
      const ticTacToe = new TicTacToe();

      expect(() => ticTacToe.play('O', 1, 1)).toThrow(InvalidFirstPlayError);
    });
  });

  describe('When the same player plays twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToe();

      ticTacToe.play('X', 1, 1);

      expect(() => ticTacToe.play('X', 3, 3)).toThrow(SamePlayerPlaysTwiceError);
    });
  });

  describe('When the O player tries to play twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToe();

      ticTacToe.play('X', 1, 1);
      ticTacToe.play('O', 2, 2);

      expect(() => ticTacToe.play('O', 3, 3)).toThrow(SamePlayerPlaysTwiceError);
    });
  });
});
