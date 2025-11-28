import {
  CellAlreadyFulfilledError,
  CellOutOfBoundsError,
  InvalidStartingPlayerError,
  Play,
  Player,
  Row,
  SamePlayerPlaysTwiceError,
  TicTacToeGame,
} from './kataTwo';

describe('Given a game in Tic Tac Toe', () => {
  describe('When the first player places an X in an empty cell', () => {
    it('Then the cell should be fulfilled', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');
      const row = new Row(1);
      const play = new Play(row, 2);
      ticTacToe.play(playerX, play);

      expect(ticTacToe.getLastMove(playerX)?.isTheSameAs(play)).toBeTruthy();
    });
  });

  describe('When the player X tries to play twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');
      const firstRow = new Row(1);
      const firstPlay = new Play(firstRow, 1);

      ticTacToe.play(playerX, firstPlay);

      const secondRow = new Row(3);
      const secondPlay = new Play(secondRow, 3);
      expect(() => ticTacToe.play(playerX, secondPlay)).toThrow(SamePlayerPlaysTwiceError);
    });
  });

  describe('When the player O tries to play first', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerO = Player.buildPlayerO();
      const row = new Row(1);
      const play = new Play(row, 1);

      expect(() => ticTacToe.play(playerO, play)).toThrow(InvalidStartingPlayerError);
    });
  });

  describe('When the player O plays in a already fulfilled cell', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');
      const playerO = Player.buildPlayerO();
      const row = new Row(2);
      const play = new Play(row, 3);

      ticTacToe.play(playerX, play);

      expect(() => ticTacToe.play(playerO, play)).toThrow(CellAlreadyFulfilledError);
    });
  });

  /*REVIEW: Esto hace que el tests conozca el detalle de la clase
  pero no se me ha ocurrido otra forma de testearlo
  */
  describe.each([
    [4, 1],
    [-1, 1],
    [5, 1],
  ])('When the player tries to play in cell %i,%i', (row, column) => {
    it('Then the play is invalid', () => {
      expect(() => new Play(new Row(row), column)).toThrow(CellOutOfBoundsError);
    });
  });
});
