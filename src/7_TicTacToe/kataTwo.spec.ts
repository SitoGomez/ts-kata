import {
  Column,
  InvalidStartingPlayerError,
  Play,
  Player,
  Row,
  SamePlayerPlaysTwiceError,
  SquareAlreadyFulfilledError,
  SquareOutOfBoundsError,
  TicTacToeGame,
} from './kataTwo';

describe('Given a game in Tic Tac Toe', () => {
  describe('When the first player places an X in an empty square', () => {
    it('Then the square should be fulfilled', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const row = new Row(1);
      const column = new Column(2);
      const play = new Play(row, column);
      ticTacToe.play(playerX, play);

      expect(ticTacToe.getLastMove(playerX)?.isTheSameAs(play)).toBeTruthy();
    });
  });

  describe('When the player X tries to play twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const firstRow = new Row(1);
      const firstColumn = new Column(1);
      const firstPlay = new Play(firstRow, firstColumn);

      ticTacToe.play(playerX, firstPlay);

      const secondRow = new Row(3);
      const secondColumn = new Column(3);
      const secondPlay = new Play(secondRow, secondColumn);
      expect(() => ticTacToe.play(playerX, secondPlay)).toThrow(SamePlayerPlaysTwiceError);
    });
  });

  describe('When the player O tries to play first', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerO = Player.buildPlayerO();
      const row = new Row(1);
      const column = new Column(1);
      const play = new Play(row, column);

      expect(() => ticTacToe.play(playerO, play)).toThrow(InvalidStartingPlayerError);
    });
  });

  describe('When the player O plays in a already fulfilled square', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const row = new Row(2);
      const column = new Column(3);
      const play = new Play(row, column);

      ticTacToe.play(playerX, play);

      expect(() => ticTacToe.play(playerO, play)).toThrow(SquareAlreadyFulfilledError);
    });
  });

  /*REVIEW: Esto hace que el tests conozca el detalle de la clase
  pero no se me ha ocurrido otra forma de testearlo
  */
  describe.each([
    [4, 1],
    [0, 1],
    [5, 1],
    [1, 4],
    [1, 0],
    [1, 5],
  ])('When the player tries to play in square %i,%i', (row, column) => {
    it('Then the play is invalid', () => {
      expect(() => new Play(new Row(row), new Column(column))).toThrow(SquareOutOfBoundsError);
    });
  });

  describe('When the player X achieve to have three tokens in the first row of squares', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const firstRow = new Row(1);

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstPlay = new Play(firstRow, new Column(1));
      const secondPlay = new Play(new Row(2), new Column(1));
      const thirdPlay = new Play(firstRow, new Column(2));
      const fourthPlay = new Play(new Row(2), new Column(3));
      const fifthPlay = new Play(firstRow, new Column(3));

      ticTacToe.play(playerX, firstPlay);
      ticTacToe.play(playerO, secondPlay);
      ticTacToe.play(playerX, thirdPlay);
      ticTacToe.play(playerO, fourthPlay);
      ticTacToe.play(playerX, fifthPlay);

      expect(ticTacToe.getWinner()?.isTheSameAs(playerX)).toBeTruthy();
    });
  });
});
