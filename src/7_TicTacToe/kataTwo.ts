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

export class Row {
  private readonly row: number;

  private readonly MIN_ROW_VALUE = 1;
  private readonly MAX_ROW_VALUE = 3;

  public constructor(row: number) {
    if (row < this.MIN_ROW_VALUE || row > this.MAX_ROW_VALUE) {
      throw new SquareOutOfBoundsError();
    }

    this.row = row;
  }

  public isTheSameAs(other: Row): boolean {
    return this.row === other.row;
  }
}

export class Column {
  private readonly column: number;

  private readonly MIN_COLUMN_VALUE = 1;
  private readonly MAX_COLUMN_VALUE = 3;

  public constructor(column: number) {
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

//Factory methods
export class Play {
  private readonly player: Player;
  private readonly square: Square;

  public constructor(player: Player, square: Square) {
    this.player = player;
    this.square = square;
  }

  public isTheSameAs(other: Play): boolean {
    return this.player.isTheSameAs(other.player) && this.square.isTheSameAs(other.square);
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

  public wasOnRowAndPerformedByPlayer(player: Player, row: Row): boolean {
    return this.square.isInRow(row) && this.player.isTheSameAs(player);
  }

  public wasOnColumnAndPerformedByPlayer(player: Player, column: Column): boolean {
    return this.square.isInColumn(column) && this.player.isTheSameAs(player);
  }

  public isOnSquareAndPerformedByPlayer(square: Square, player: Player): boolean {
    return this.square.isTheSameAs(square) && this.player.isTheSameAs(player);
  }

  //Más genéricas pueden ser más reutilizables
}

//REVIEW: This class doesn't have state, for me is an smell -> Function
class PlayRules {
  public guardFirstPlayerIsX(plays: Plays, nextPlay: Play): void {
    if (!plays.getPlaysCount() && nextPlay.isPerformedByPlayer(Player.buildPlayerO())) {
      throw new InvalidStartingPlayerError();
    }
  }

  public guardPlayAlreadyPerformed(plays: Plays, nextPlay: Play): void {
    if (plays.getPlayOnTheSameSquare(nextPlay)) {
      throw new SquareAlreadyFulfilledError();
    }
  }

  public guardNotSamePlayerPlayingTwice(plays: Play[], nextPlay: Play): void {
    const lastPlay = plays[plays.length - 1];

    if (lastPlay?.isPerformedByTheSamePlayerAs(nextPlay)) {
      throw new SamePlayerPlaysTwiceError();
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
    this.playRules.guardFirstPlayerIsX(this, nextPlay);
    this.playRules.guardNotSamePlayerPlayingTwice(this.plays, nextPlay);
    this.playRules.guardPlayAlreadyPerformed(this, nextPlay);

    this.plays.push(nextPlay);
  }

  public getLastPlay(): Play | undefined {
    return this.plays[this.plays.length - 1];
  }

  public getAllPlays(): Play[] {
    return this.plays;
  }

  public getPlaysCount(): number {
    return this.plays.length;
  }

  public getPlayOnTheSameSquare(play: Play): Play | undefined {
    return this.plays.find((existingPlay) => existingPlay.isOnTheSameSquareAs(play));
  }
}

export class GameResultRules {
  private readonly MIN_ROWS_IN_GRID = 1;
  private readonly MAX_ROWS_IN_GRID = 3;
  private readonly MIN_COLUMNS_IN_GRID = 1;
  private readonly MAX_COLUMNS_IN_GRID = 3;

  private readonly players: Player[] = [Player.buildPlayerX(), Player.buildPlayerO()];

  public calculateGameResult(plays: Play[]): Player | undefined {
    //Usar collection de plays y preguntarle por filas, columnas y diagonales
    //Feature Envy Code Smell
    const horizontalWinner = this.getHorizontalWinByPlayer(plays);

    if (horizontalWinner) {
      return horizontalWinner;
    }

    const verticalWinner = this.getVerticalWinByPlayer(plays);

    if (verticalWinner) {
      return verticalWinner;
    }

    const diagonalWinner = this.getDiagonalWinByPlayer(plays);

    if (diagonalWinner) {
      return diagonalWinner;
    }

    return undefined;
  }

  //Strategy patten - Colección de strategias como first class colection
  private getHorizontalWinByPlayer(plays: Play[]): Player | undefined {
    if (!plays.length) {
      return undefined;
    }

    for (
      let currentRow = this.MIN_ROWS_IN_GRID;
      currentRow <= this.MAX_ROWS_IN_GRID;
      currentRow++
    ) {
      for (const player of this.players) {
        const horizontalRows = plays.filter((play) =>
          play.wasOnRowAndPerformedByPlayer(player, new Row(currentRow)),
        );

        if (horizontalRows.length === this.MAX_ROWS_IN_GRID) {
          return player;
        }
      }
    }

    return undefined;
  }

  private getVerticalWinByPlayer(plays: Play[]): Player | undefined {
    if (!plays.length) {
      return undefined;
    }

    for (
      let currentColumn = this.MIN_COLUMNS_IN_GRID;
      currentColumn <= this.MAX_COLUMNS_IN_GRID;
      currentColumn++
    ) {
      for (const player of this.players) {
        const verticalColumns = plays.filter((play) =>
          play.wasOnColumnAndPerformedByPlayer(player, new Column(currentColumn)),
        );

        if (verticalColumns.length === this.MAX_COLUMNS_IN_GRID) {
          return player;
        }
      }
    }

    return undefined;
  }

  private getDiagonalWinByPlayer(plays: Play[]): Player | undefined {
    if (!plays.length) {
      return undefined;
    }

    for (const player of this.players) {
      if (this.leftTopToRightBottomDiagonalWinByPlayer(plays, player)) {
        return player;
      }

      if (this.rightTopToLeftBottomDiagonalWinByPlayer(plays, player)) {
        return player;
      }
    }

    return undefined;
  }

  private leftTopToRightBottomDiagonalWinByPlayer(plays: Play[], player: Player): boolean {
    const leftTopToRightBottomDiagonalSquares: Square[] = [
      new Square(new Row(1), new Column(1)),
      new Square(new Row(2), new Column(2)),
      new Square(new Row(3), new Column(3)),
    ];

    return leftTopToRightBottomDiagonalSquares.every((square) =>
      plays.some((play) => play.isOnSquareAndPerformedByPlayer(square, player)),
    );
  }

  private rightTopToLeftBottomDiagonalWinByPlayer(plays: Play[], player: Player): boolean {
    const rightTopToLeftBottomDiagonalSquares: Square[] = [
      new Square(new Row(1), new Column(3)),
      new Square(new Row(2), new Column(2)),
      new Square(new Row(3), new Column(1)),
    ];

    return rightTopToLeftBottomDiagonalSquares.every((square) =>
      plays.some((play) => play.isOnSquareAndPerformedByPlayer(square, player)),
    );
  }
}

export class TicTacToeGame {
  private plays: Plays = new Plays();

  public play(play: Play): void {
    this.plays.add(play);
  }

  public getLastPlay(): Play | undefined {
    return this.plays.getLastPlay();
  }

  public getWinner(): Player | undefined {
    return new GameResultRules().calculateGameResult(this.plays.getAllPlays());
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
