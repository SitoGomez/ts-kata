//TODO: Pragmatic vs Purist approaches

type PlayerToken = 'X' | 'O';

export class Player {
  private readonly ALLOWED_TOKENS: PlayerToken[] = ['X', 'O'];

  private readonly token: PlayerToken;

  public constructor(token: PlayerToken) {
    if (!this.ALLOWED_TOKENS.includes(token)) {
      throw new Error('Invalid player symbol');
    }

    this.token = token;
  }

  public isTheSameAs(other: Player): boolean {
    return this.token === other.token;
  }

  public static buildPlayerO(): Player {
    return new Player('O');
  }

  public static buildPlayerX(): Player {
    return new Player('X');
  }
}

type RowValue = 1 | 2 | 3;

export class Row {
  private readonly row: RowValue;

  private readonly MIN_ROW_VALUE = 1;
  private readonly MAX_ROW_VALUE = 3;

  public constructor(row: RowValue) {
    if (row < this.MIN_ROW_VALUE || row > this.MAX_ROW_VALUE) {
      throw new SquareOutOfBoundsError();
    }

    this.row = row;
  }

  public isTheSameAs(other: Row): boolean {
    return this.row === other.row;
  }
}

type ColumnValue = 1 | 2 | 3;

export class Column {
  private readonly column: ColumnValue;

  private readonly MIN_COLUMN_VALUE = 1;
  private readonly MAX_COLUMN_VALUE = 3;

  public constructor(column: ColumnValue) {
    if (column < this.MIN_COLUMN_VALUE || column > this.MAX_COLUMN_VALUE) {
      throw new SquareOutOfBoundsError();
    }

    this.column = column;
  }

  public isTheSameAs(other: Column): boolean {
    return this.column === other.column;
  }
}

export class Square {
  private readonly row: Row;
  private readonly column: Column;

  public constructor(row: Row, column: Column) {
    this.row = row;
    this.column = column;
  }

  public isTheSameAs(other: Square): boolean {
    return this.row.isTheSameAs(other.row) && this.column.isTheSameAs(other.column);
  }

  public isInRow(row: Row): boolean {
    return this.row.isTheSameAs(row);
  }

  public isInColumn(column: Column): boolean {
    return this.column.isTheSameAs(column);
  }
}

export class Play {
  private readonly player: Player;
  private readonly square: Square;

  public constructor(player: Player, square: Square) {
    this.player = player;
    this.square = square;
  }

  public static byPlayer(player: PlayerToken, row: RowValue, column: ColumnValue): Play {
    return new Play(new Player(player), new Square(new Row(row), new Column(column)));
  }

  public isOnTheSameSquareAs(other: Play): boolean {
    return this.square.isTheSameAs(other.square);
  }

  public isPerformedByTheSamePlayerAs(other: Play): boolean {
    return this.player.isTheSameAs(other.player);
  }

  public isPerformedByPlayer(player: Player): boolean {
    return this.player.isTheSameAs(player);
  }

  public isOnRowAndPerformedByPlayer(player: Player, row: Row): boolean {
    return this.square.isInRow(row) && this.player.isTheSameAs(player);
  }

  public isOnColumnAndPerformedByPlayer(player: Player, column: Column): boolean {
    return this.square.isInColumn(column) && this.player.isTheSameAs(player);
  }

  public isOnSquareAndPerformedByPlayer(square: Square, player: Player): boolean {
    return this.square.isTheSameAs(square) && this.player.isTheSameAs(player);
  }
}

interface PlayRulesStrategy {
  validate(plays: Plays, nextPlay: Play): void;
}

class GuardFirstPlayerIsX implements PlayRulesStrategy {
  public validate(plays: Plays, nextPlay: Play): void {
    if (!plays.getTotalPlaysCount() && nextPlay.isPerformedByPlayer(Player.buildPlayerO())) {
      throw new InvalidStartingPlayerError();
    }
  }
}

class GuardNotSamePlayerPlayingTwice implements PlayRulesStrategy {
  public validate(plays: Plays, nextPlay: Play): void {
    if (plays.isLastPlayPerformedByTheSamePlayer(nextPlay)) {
      throw new SamePlayerPlaysTwiceError();
    }
  }
}

class GuardPlayAlreadyPerformed implements PlayRulesStrategy {
  public validate(plays: Plays, nextPlay: Play): void {
    if (plays.getPlayOnTheSameSquare(nextPlay)) {
      throw new SquareAlreadyFulfilledError();
    }
  }
}

class PlayRules {
  private readonly rules: PlayRulesStrategy[];

  public constructor() {
    this.rules = [
      new GuardFirstPlayerIsX(),
      new GuardNotSamePlayerPlayingTwice(),
      new GuardPlayAlreadyPerformed(),
    ];
  }

  public validatePlay(plays: Plays, nextPlay: Play): void {
    for (const rule of this.rules) {
      rule.validate(plays, nextPlay);
    }
  }
}

class Plays {
  private plays: Play[];
  private readonly playRules: PlayRules;

  public constructor() {
    this.plays = [];
    this.playRules = new PlayRules();
  }

  public add(nextPlay: Play): void {
    this.playRules.validatePlay(this, nextPlay);

    this.plays.push(nextPlay);
  }

  public isLastPlayPerformedByTheSamePlayer(play: Play): boolean | undefined {
    const lastPlay = this.plays[this.plays.length - 1];

    return lastPlay?.isPerformedByTheSamePlayerAs(play);
  }

  public getTotalPlaysCount(): number {
    return this.plays.length;
  }

  public getPlayOnTheSameSquare(play: Play): Play | undefined {
    return this.plays.find((existingPlay) => existingPlay.isOnTheSameSquareAs(play));
  }

  public getRowPlaysByPlayer(row: Row, player: Player): Play[] {
    return this.plays.filter((play) => play.isOnRowAndPerformedByPlayer(player, row));
  }

  public getColumnPlaysByPlayer(column: Column, player: Player): Play[] {
    return this.plays.filter((play) => play.isOnColumnAndPerformedByPlayer(player, column));
  }

  private getDiagonalPlaysByPlayer(diagonalSquares: Square[], player: Player): Play[] {
    return this.plays.filter((play) =>
      diagonalSquares.some((square) => play.isOnSquareAndPerformedByPlayer(square, player)),
    );
  }

  public getLeftTopToRightBottomDiagonalByPlayer(player: Player): Play[] {
    const diagonal = [
      new Square(new Row(1), new Column(1)),
      new Square(new Row(2), new Column(2)),
      new Square(new Row(3), new Column(3)),
    ];

    return this.getDiagonalPlaysByPlayer(diagonal, player);
  }

  public getRightTopToLeftBottomDiagonalByPlayer(player: Player): Play[] {
    const diagonal = [
      new Square(new Row(1), new Column(3)),
      new Square(new Row(2), new Column(2)),
      new Square(new Row(3), new Column(1)),
    ];

    return this.getDiagonalPlaysByPlayer(diagonal, player);
  }
}

interface IGameResultRuleStrategy {
  calculateResult(plays: Plays): GameResult | undefined;
}

type GameResultValue = 'X' | 'O' | 'DRAW' | 'IN_PROGRESS';

export class GameResult {
  private readonly resultValue?: GameResultValue;

  private constructor(resultValue?: GameResultValue) {
    this.resultValue = resultValue;
  }

  public static fromPlayer(player: Player): GameResult {
    return player.isTheSameAs(Player.buildPlayerX()) ? new GameResult('X') : new GameResult('O');
  }

  public static draw(): GameResult {
    return new GameResult('DRAW');
  }

  public static inProgress(): GameResult {
    return new GameResult('IN_PROGRESS');
  }

  public isTheSameAs(other: GameResult): boolean {
    return this.resultValue === other.resultValue;
  }
}

class HorizontalWinStrategy implements IGameResultRuleStrategy {
  private readonly MIN_ROWS_IN_GRID = 1;
  private readonly MAX_ROWS_IN_GRID = 3;

  private readonly FULFILLED_SQUARES_TO_WIN = 3;

  private readonly players: Player[] = [Player.buildPlayerX(), Player.buildPlayerO()];

  public calculateResult(plays: Plays): GameResult | undefined {
    for (
      let currentRow = this.MIN_ROWS_IN_GRID;
      currentRow <= this.MAX_ROWS_IN_GRID;
      currentRow++
    ) {
      for (const player of this.players) {
        const horizontalRows = plays.getRowPlaysByPlayer(new Row(currentRow as RowValue), player);

        if (horizontalRows.length === this.FULFILLED_SQUARES_TO_WIN) {
          return GameResult.fromPlayer(player);
        }
      }
    }

    return undefined;
  }
}

class VerticalWinStrategy implements IGameResultRuleStrategy {
  private readonly MIN_COLUMNS_IN_GRID = 1;
  private readonly MAX_COLUMNS_IN_GRID = 3;

  private readonly FULFILLED_SQUARES_TO_WIN = 3;

  private readonly players: Player[] = [Player.buildPlayerX(), Player.buildPlayerO()];

  public calculateResult(plays: Plays): GameResult | undefined {
    for (
      let currentColumn = this.MIN_COLUMNS_IN_GRID;
      currentColumn <= this.MAX_COLUMNS_IN_GRID;
      currentColumn++
    ) {
      for (const player of this.players) {
        const verticalColumns = plays.getColumnPlaysByPlayer(
          new Column(currentColumn as ColumnValue),
          player,
        );

        if (verticalColumns.length === this.FULFILLED_SQUARES_TO_WIN) {
          return GameResult.fromPlayer(player);
        }
      }
    }

    return undefined;
  }
}

class DiagonalWinStrategy implements IGameResultRuleStrategy {
  private readonly FULFILLED_SQUARES_TO_WIN = 3;

  private readonly players: Player[] = [Player.buildPlayerX(), Player.buildPlayerO()];

  public calculateResult(plays: Plays): GameResult | undefined {
    for (const player of this.players) {
      const diagonalLeftTopToRightBottom = plays.getLeftTopToRightBottomDiagonalByPlayer(player);
      const diagonalRightTopToLeftBottom = plays.getRightTopToLeftBottomDiagonalByPlayer(player);

      if (
        diagonalLeftTopToRightBottom.length === this.FULFILLED_SQUARES_TO_WIN ||
        diagonalRightTopToLeftBottom.length === this.FULFILLED_SQUARES_TO_WIN
      ) {
        return GameResult.fromPlayer(player);
      }
    }

    return undefined;
  }
}

class DrawStrategy implements IGameResultRuleStrategy {
  private readonly MAX_PLAYS_IN_GAME = 9;

  public calculateResult(plays: Plays): GameResult | undefined {
    if (plays.getTotalPlaysCount() === this.MAX_PLAYS_IN_GAME) {
      return GameResult.draw();
    }

    return undefined;
  }
}

class InProgressStrategy implements IGameResultRuleStrategy {
  private readonly MAX_PLAYS_IN_GAME = 9;

  public calculateResult(plays: Plays): GameResult | undefined {
    if (plays.getTotalPlaysCount() < this.MAX_PLAYS_IN_GAME) {
      return GameResult.inProgress();
    }

    return undefined;
  }
}

class GameResultRules {
  private readonly gameResultStrategies: IGameResultRuleStrategy[];

  public constructor() {
    this.gameResultStrategies = [
      new HorizontalWinStrategy(),
      new VerticalWinStrategy(),
      new DiagonalWinStrategy(),
      new DrawStrategy(),
      new InProgressStrategy(),
    ];
  }

  public calculateResult(plays: Plays): GameResult | undefined {
    for (const strategy of this.gameResultStrategies) {
      const result = strategy.calculateResult(plays);

      if (result) {
        return result;
      }
    }

    return undefined;
  }
}

export class TicTacToeGame {
  private plays: Plays = new Plays();

  public play(play: Play): void {
    this.plays.add(play);
  }

  public getWinner(): GameResult | undefined {
    return new GameResultRules().calculateResult(this.plays);
  }
}

export class SamePlayerPlaysTwiceError extends Error {
  public constructor() {
    super('The same player cannot play twice in a row.');
  }
}

export class InvalidStartingPlayerError extends Error {
  public constructor() {
    super('The player O cannot play first.');
  }
}

export class SquareAlreadyFulfilledError extends Error {
  public constructor() {
    super('The square is already fulfilled.');
  }
}

export class SquareOutOfBoundsError extends Error {
  public constructor() {
    super('The square is out of bounds.');
  }
}
