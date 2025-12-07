import {
  Column,
  GameResult,
  InvalidStartingPlayerError,
  Play,
  Player,
  Row,
  SamePlayerPlaysTwiceError,
  Square,
  SquareAlreadyFulfilledError,
  SquareOutOfBoundsError,
  TicTacToeGame,
} from './kataTwo';

describe('Given a game in Tic Tac Toe', () => {
  describe('When the player X tries to play twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const firstRow = new Row(1);
      const firstColumn = new Column(1);
      const firstSquare = new Square(firstRow, firstColumn);
      const firstPlay = new Play(playerX, firstSquare);

      ticTacToe.play(firstPlay);

      const secondRow = new Row(3);
      const secondColumn = new Column(3);
      const secondSquare = new Square(secondRow, secondColumn);
      const secondPlay = new Play(playerX, secondSquare);
      expect(() => ticTacToe.play(secondPlay)).toThrow(SamePlayerPlaysTwiceError);
    });
  });

  describe('When the player O tries to play first', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const playerO = Player.buildPlayerO();
      const row = new Row(1);
      const column = new Column(1);
      const square = new Square(row, column);
      const play = new Play(playerO, square);

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
      const square = new Square(row, column);
      const play = new Play(playerX, square);

      ticTacToe.play(play);

      expect(() => ticTacToe.play(new Play(playerO, square))).toThrow(SquareAlreadyFulfilledError);
    });
  });

  describe.each([
    [4, 1],
    [0, 1],
    [5, 1],
    [1, 4],
    [1, 0],
    [1, 5],
  ])('When the player tries to play in square %i,%i', (row, column) => {
    it('Then the play is invalid', () => {
      expect(
        () => new Play(Player.buildPlayerX(), new Square(new Row(row), new Column(column))),
      ).toThrow(SquareOutOfBoundsError);
    });
  });

  describe('When the player X achieve to have three tokens in the first row of squares', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const firstRow = new Row(1);

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstSquare = new Square(firstRow, new Column(1));
      const firstPlay = new Play(playerX, firstSquare);
      const secondSquare = new Square(new Row(2), new Column(1));
      const secondPlay = new Play(playerO, secondSquare);
      const thirdSquare = new Square(firstRow, new Column(2));
      const thirdPlay = new Play(playerX, thirdSquare);
      const fourthSquare = new Square(new Row(2), new Column(3));
      const fourthPlay = new Play(playerO, fourthSquare);
      const fifthSquare = new Square(firstRow, new Column(3));
      const fifthPlay = new Play(playerX, fifthSquare);
      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.fromPlayer(playerX))).toBeTruthy();
    });
  });

  describe('When the player O achieve to have three tokens in the first row of squares', () => {
    it('Then the player O wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const firstRow = new Row(1);

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstSquare = new Square(new Row(2), new Column(1));
      const firstPlay = new Play(playerX, firstSquare);
      const secondSquare = new Square(firstRow, new Column(1));
      const secondPlay = new Play(playerO, secondSquare);
      const thirdSquare = new Square(new Row(2), new Column(2));
      const thirdPlay = new Play(playerX, thirdSquare);
      const fourthSquare = new Square(firstRow, new Column(2));
      const fourthPlay = new Play(playerO, fourthSquare);
      const fifthSquare = new Square(new Row(3), new Column(3));
      const fifthPlay = new Play(playerX, fifthSquare);
      const sixthSquare = new Square(firstRow, new Column(3));
      const sixthPlay = new Play(playerO, sixthSquare);

      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      ticTacToe.play(sixthPlay);
      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.fromPlayer(playerO))).toBeTruthy();
    });
  });

  describe('When the player X achieve to have three tokens in the second row of squares', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const secondRow = new Row(2);

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstSquare = new Square(secondRow, new Column(1));
      const firstPlay = new Play(playerX, firstSquare);
      const secondSquare = new Square(new Row(1), new Column(1));
      const secondPlay = new Play(playerO, secondSquare);
      const thirdSquare = new Square(secondRow, new Column(2));
      const thirdPlay = new Play(playerX, thirdSquare);
      const fourthSquare = new Square(new Row(1), new Column(2));
      const fourthPlay = new Play(playerO, fourthSquare);
      const fifthSquare = new Square(secondRow, new Column(3));
      const fifthPlay = new Play(playerX, fifthSquare);
      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.fromPlayer(playerX))).toBeTruthy();
    });
  });

  describe('When the player X achieve to have three tokens in the first column of squares', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const firstColumn = new Column(1);

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstSquare = new Square(new Row(1), firstColumn);
      const firstPlay = new Play(playerX, firstSquare);
      const secondSquare = new Square(new Row(1), new Column(2));
      const secondPlay = new Play(playerO, secondSquare);
      const thirdSquare = new Square(new Row(2), firstColumn);
      const thirdPlay = new Play(playerX, thirdSquare);
      const fourthSquare = new Square(new Row(2), new Column(2));
      const fourthPlay = new Play(playerO, fourthSquare);
      const fifthSquare = new Square(new Row(3), firstColumn);
      const fifthPlay = new Play(playerX, fifthSquare);
      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);

      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.fromPlayer(playerX))).toBeTruthy();
    });
  });

  describe('When the player X achieve to have three tokens diagonally left top to right bottom', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstSquare = new Square(new Row(1), new Column(1));
      const firstPlay = new Play(playerX, firstSquare);
      const secondSquare = new Square(new Row(1), new Column(2));
      const secondPlay = new Play(playerO, secondSquare);
      const thirdSquare = new Square(new Row(2), new Column(2));
      const thirdPlay = new Play(playerX, thirdSquare);
      const fourthSquare = new Square(new Row(1), new Column(3));
      const fourthPlay = new Play(playerO, fourthSquare);
      const fifthSquare = new Square(new Row(3), new Column(3));
      const fifthPlay = new Play(playerX, fifthSquare);
      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.fromPlayer(playerX))).toBeTruthy();
    });
  });

  describe('When the player X achieve to have three tokens diagonally right top to left bottom', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstSquare = new Square(new Row(1), new Column(3));
      const firstPlay = new Play(playerX, firstSquare);
      const secondSquare = new Square(new Row(1), new Column(2));
      const secondPlay = new Play(playerO, secondSquare);
      const thirdSquare = new Square(new Row(2), new Column(2));
      const thirdPlay = new Play(playerX, thirdSquare);
      const fourthSquare = new Square(new Row(1), new Column(1));
      const fourthPlay = new Play(playerO, fourthSquare);
      const fifthSquare = new Square(new Row(3), new Column(1));
      const fifthPlay = new Play(playerX, fifthSquare);
      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.fromPlayer(playerX))).toBeTruthy();
    });
  });

  describe("When the game didn't have a winner yet", () => {
    it('Then the game should be in progress', () => {
      const ticTacToe = new TicTacToeGame();

      const playerX = Player.buildPlayerX();
      const playerO = Player.buildPlayerO();
      const firstSquare = new Square(new Row(1), new Column(1));
      const firstPlay = new Play(playerX, firstSquare);
      const secondSquare = new Square(new Row(1), new Column(2));
      const secondPlay = new Play(playerO, secondSquare);
      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);

      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.inProgress())).toBeTruthy();
    });
  });

  describe('When all the plays have been performed without a winner', () => {
    it('Then the game should be a draw', () => {
      const ticTacToe = new TicTacToeGame();

      const firstPlay = new Play(Player.buildPlayerX(), new Square(new Row(1), new Column(1)));
      const secondPlay = new Play(Player.buildPlayerO(), new Square(new Row(1), new Column(2)));
      const thirdPlay = new Play(Player.buildPlayerX(), new Square(new Row(1), new Column(3)));
      const fourthPlay = new Play(Player.buildPlayerO(), new Square(new Row(2), new Column(1)));
      const fifthPlay = new Play(Player.buildPlayerX(), new Square(new Row(2), new Column(3)));
      const sixthPlay = new Play(Player.buildPlayerO(), new Square(new Row(2), new Column(2)));
      const seventhPlay = new Play(Player.buildPlayerX(), new Square(new Row(3), new Column(1)));
      const eighthPlay = new Play(Player.buildPlayerO(), new Square(new Row(3), new Column(3)));
      const ninthPlay = new Play(Player.buildPlayerX(), new Square(new Row(3), new Column(2)));

      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);
      ticTacToe.play(thirdPlay);
      ticTacToe.play(fourthPlay);
      ticTacToe.play(fifthPlay);
      ticTacToe.play(sixthPlay);
      ticTacToe.play(seventhPlay);
      ticTacToe.play(eighthPlay);
      ticTacToe.play(ninthPlay);

      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.draw())).toBeTruthy();
    });
  });
});
