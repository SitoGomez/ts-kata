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
      const play = new Play(playerX, row, column);
      ticTacToe.play(play);

      expect(ticTacToe.getLastPlay()?.isTheSameAs(play)).toBeTruthy();
    });
  });

  describe('When the player X tries to play twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const firstRow = new Row(1);
      const firstColumn = new Column(1);
      const firstPlay = new Play(playerX, firstRow, firstColumn);

      ticTacToe.play(firstPlay);

      const secondRow = new Row(3);
      const secondColumn = new Column(3);
      const secondPlay = new Play(playerX, secondRow, secondColumn);
      expect(() => ticTacToe.play(secondPlay)).toThrow(SamePlayerPlaysTwiceError);
    });
  });

  describe('When the player O tries to play first', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerO = Player.buildPlayerO();
      const row = new Row(1);
      const column = new Column(1);
      const play = new Play(playerO, row, column);

      expect(() => ticTacToe.play(play)).toThrow(InvalidStartingPlayerError);
    });
  });

  describe('When the player O plays in a already fulfilled square', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const row = new Row(2);
      const column = new Column(3);
      const play = new Play(playerX, row, column);

      ticTacToe.play(play);

      expect(() => ticTacToe.play(new Play(playerO, row, column))).toThrow(
        SquareAlreadyFulfilledError,
      );
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
      expect(() => new Play(Player.buildPlayerX(), new Row(row), new Column(column))).toThrow(
        SquareOutOfBoundsError,
      );
    });
  });

  describe('When the player X achieve to have three tokens in the first row of squares', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const firstRow = new Row(1);

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstPlay = new Play(playerX, firstRow, new Column(1));
      const secondPlay = new Play(playerO, new Row(2), new Column(1));
      const thirdPlay = new Play(playerX, firstRow, new Column(2));
      const fourthPlay = new Play(playerO, new Row(2), new Column(3));
      const fifthPlay = new Play(playerX, firstRow, new Column(3));
      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      expect(ticTacToe.getWinner()?.isTheSameAs(playerX)).toBeTruthy();
    });
  });

  describe('When the player O achieve to have three tokens in the first row of squares', () => {
    it('Then the player O wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const firstRow = new Row(1);

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstPlay = new Play(playerX, new Row(2), new Column(1));
      const secondPlay = new Play(playerO, firstRow, new Column(1));
      const thirdPlay = new Play(playerX, new Row(2), new Column(2));
      const fourthPlay = new Play(playerO, firstRow, new Column(2));
      const fifthPlay = new Play(playerX, new Row(3), new Column(3));
      const sixthPlay = new Play(playerO, firstRow, new Column(3));

      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      ticTacToe.play(sixthPlay);
      expect(ticTacToe.getWinner()?.isTheSameAs(playerO)).toBeTruthy();
    });
  });

  describe('When the player X achieve to have three tokens in the second row of squares', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const secondRow = new Row(2);

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstPlay = new Play(playerX, secondRow, new Column(1));
      const secondPlay = new Play(playerO, new Row(1), new Column(1));
      const thirdPlay = new Play(playerX, secondRow, new Column(2));
      const fourthPlay = new Play(playerO, new Row(1), new Column(2));
      const fifthPlay = new Play(playerX, secondRow, new Column(3));
      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      expect(ticTacToe.getWinner()?.isTheSameAs(playerX)).toBeTruthy();
    });
  });
});
