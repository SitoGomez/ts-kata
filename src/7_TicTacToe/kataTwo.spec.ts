import {
  CellAlreadyFulfilledError,
  InvalidStartingPlayerError,
  Player,
  SamePlayerPlaysTwiceError,
  TicTacToeGame,
} from './kataTwo';

describe('Given a game in Tic Tac Toe', () => {
  describe('When the first player places an X in an empty cell', () => {
    it('Then the cell should be fulfilled', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');
      ticTacToe.play(playerX, 1, 2);

      expect(ticTacToe.getLastMove(playerX)).toEqual([1, 2]);
    });
  });

  describe('When the player X tries to play twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');

      ticTacToe.play(playerX, 1, 1);

      expect(() => ticTacToe.play(playerX, 3, 3)).toThrow(SamePlayerPlaysTwiceError);
    });
  });

  describe('When the player O tries to play first', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerO = Player.buildPlayerO();

      expect(() => ticTacToe.play(playerO, 1, 1)).toThrow(InvalidStartingPlayerError);
    });
  });

  describe('When the player O plays in a already fulfilled cell', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');
      const playerO = Player.buildPlayerO();

      ticTacToe.play(playerX, 2, 3);

      expect(() => ticTacToe.play(playerO, 2, 3)).toThrow(CellAlreadyFulfilledError);
    });
  });
});
