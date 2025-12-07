import {
  GameResult,
  InvalidStartingPlayerError,
  Play,
  Player,
  SamePlayerPlaysTwiceError,
  SquareAlreadyFulfilledError,
  SquareOutOfBoundsError,
  TicTacToeGame,
} from './kataTwo';

describe('Given a game in Tic Tac Toe', () => {
  describe('When the player X tries to play twice in a row', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const firstPlay = Play.byPlayer('X', 1, 1);
      const secondPlay = Play.byPlayer('X', 3, 3);

      ticTacToe.play(firstPlay);

      expect(() => ticTacToe.play(secondPlay)).toThrow(SamePlayerPlaysTwiceError);
    });
  });

  describe('When the player O tries to play first', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const play = Play.byPlayer('O', 1, 1);

      expect(() => ticTacToe.play(play)).toThrow(InvalidStartingPlayerError);
    });
  });

  describe('When the player O plays in a already fulfilled square', () => {
    it('Then the play is invalid', () => {
      const ticTacToe = new TicTacToeGame();

      const play = Play.byPlayer('X', 2, 3);

      ticTacToe.play(play);

      expect(() => ticTacToe.play(Play.byPlayer('O', 2, 3))).toThrow(SquareAlreadyFulfilledError);
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
      expect(() => Play.byPlayer('X', row as RowValue, column as ColumnValue)).toThrow(
        SquareOutOfBoundsError,
      );
    });
  });

  describe('When the player X achieve to have three tokens in the first row of squares', () => {
    it('Then the player X wins the game', () => {
      const ticTacToe = new TicTacToeGame();

      const firstPlay = Play.byPlayer('X', 1, 1);
      const secondPlay = Play.byPlayer('O', 2, 1);
      const thirdPlay = Play.byPlayer('X', 1, 2);
      const fourthPlay = Play.byPlayer('O', 2, 2);
      const fifthPlay = Play.byPlayer('X', 1, 3);

      const playerX = Player.buildPlayerX();

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

      const firstPlay = Play.byPlayer('X', 2, 1);
      const secondPlay = Play.byPlayer('O', 1, 1);
      const thirdPlay = Play.byPlayer('X', 2, 2);
      const fourthPlay = Play.byPlayer('O', 1, 2);
      const fifthPlay = Play.byPlayer('X', 3, 3);
      const sixthPlay = Play.byPlayer('O', 1, 3);

      const playerO = Player.buildPlayerO();

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

      const firstPlay = Play.byPlayer('X', 2, 1);
      const secondPlay = Play.byPlayer('O', 1, 1);
      const thirdPlay = Play.byPlayer('X', 2, 2);
      const fourthPlay = Play.byPlayer('O', 1, 2);
      const fifthPlay = Play.byPlayer('X', 2, 3);

      const playerX = Player.buildPlayerX();

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

      const firstPlay = Play.byPlayer('X', 1, 1);
      const secondPlay = Play.byPlayer('O', 1, 2);
      const thirdPlay = Play.byPlayer('X', 2, 1);
      const fourthPlay = Play.byPlayer('O', 2, 2);
      const fifthPlay = Play.byPlayer('X', 3, 1);

      const playerX = Player.buildPlayerX();

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

      const firstPlay = Play.byPlayer('X', 1, 1);
      const secondPlay = Play.byPlayer('O', 1, 2);
      const thirdPlay = Play.byPlayer('X', 2, 2);
      const fourthPlay = Play.byPlayer('O', 1, 3);
      const fifthPlay = Play.byPlayer('X', 3, 3);

      const playerX = Player.buildPlayerX();

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

      const firstPlay = Play.byPlayer('X', 1, 3);
      const secondPlay = Play.byPlayer('O', 1, 2);
      const thirdPlay = Play.byPlayer('X', 2, 2);
      const fourthPlay = Play.byPlayer('O', 1, 1);
      const fifthPlay = Play.byPlayer('X', 3, 1);

      const playerX = Player.buildPlayerX();

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

      const firstPlay = Play.byPlayer('X', 1, 1);
      const secondPlay = Play.byPlayer('O', 1, 2);

      ticTacToe.play(firstPlay);
      ticTacToe.play(secondPlay);

      expect(ticTacToe.getWinner()?.isTheSameAs(GameResult.inProgress())).toBeTruthy();
    });
  });

  describe('When all the plays have been performed without a winner', () => {
    it('Then the game should be a draw', () => {
      const ticTacToe = new TicTacToeGame();

      const firstPlay = Play.byPlayer('X', 1, 1);
      const secondPlay = Play.byPlayer('O', 1, 2);
      const thirdPlay = Play.byPlayer('X', 1, 3);
      const fourthPlay = Play.byPlayer('O', 2, 1);
      const fifthPlay = Play.byPlayer('X', 2, 3);
      const sixthPlay = Play.byPlayer('O', 2, 2);
      const seventhPlay = Play.byPlayer('X', 3, 1);
      const eighthPlay = Play.byPlayer('O', 3, 3);
      const ninthPlay = Play.byPlayer('X', 3, 2);

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
