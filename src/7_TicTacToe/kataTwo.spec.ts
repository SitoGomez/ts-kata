import {
  CellAlreadyFulfilledError,
  CellOutOfBoundsError,
  InvalidStartingPlayerError,
  Play,
  Player,
  SamePlayerPlaysTwiceError,
  TicTacToeGame,
} from './kataTwo';

describe('Given a game in Tic Tac Toe', () => {
  describe('When the first player places an X in an empty cell', () => {
    it('Then the cell should be fulfilled', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');
      const play = new Play(1, 2);
      ticTacToe.play(playerX, play);

      expect(ticTacToe.getLastMove(playerX)?.isTheSameAs(play)).toBeTruthy();
    });
  });

  describe('When the player X tries to play twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');
      const firstPlay = new Play(1, 1);

      ticTacToe.play(playerX, firstPlay);

      const secondPlay = new Play(3, 3);
      expect(() => ticTacToe.play(playerX, secondPlay)).toThrow(SamePlayerPlaysTwiceError);
    });
  });

  describe('When the player O tries to play first', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerO = Player.buildPlayerO();
      const play = new Play(1, 1);

      expect(() => ticTacToe.play(playerO, play)).toThrow(InvalidStartingPlayerError);
    });
  });

  describe('When the player O plays in a already fulfilled cell', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = new Player('X');
      const playerO = Player.buildPlayerO();
      const play = new Play(2, 3);

      ticTacToe.play(playerX, play);

      expect(() => ticTacToe.play(playerO, play)).toThrow(CellAlreadyFulfilledError);
    });
  });

  /*REVIEW: Esto hace que el tests conozca el detalle de la clase
  pero no se me ha ocurrido otra forma de testearlo
  */
  describe('When the player tries to play in cell 4,1', () => {
    it('Then the play is invalid', () => {
      expect(() => new Play(4, 1)).toThrow(CellOutOfBoundsError);
    });
  });
});
