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

  private readonly MIN_ROW_COLUMN = 1;
  private readonly MAX_ROW_COLUMN = 3;

  public constructor(row: number) {
    if (row < this.MIN_ROW_COLUMN || row > this.MAX_ROW_COLUMN) {
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

  private readonly MIN_ROW_COLUMN = 1;
  private readonly MAX_ROW_COLUMN = 3;

  public constructor(column: number) {
    if (column < this.MIN_ROW_COLUMN || column > this.MAX_ROW_COLUMN) {
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
}

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
}

class Plays {
  private plays: Play[] = [];

  public add(nextPlay: Play): void {
    this.guardFirstPlayerIsX(nextPlay);
    this.guardPlayAlreadyPerformed(nextPlay);
    this.guardNotSamePlayerPlayingTwice(nextPlay);

    this.plays.push(nextPlay);
  }

  private guardFirstPlayerIsX(nextPlay: Play): void {
    if (this.plays.length === 0 && nextPlay.isPerformedByPlayer(Player.buildPlayerO())) {
      throw new InvalidStartingPlayerError();
    }
  }

  public guardPlayAlreadyPerformed(nextPlay: Play): void {
    if (this.plays.some((existingPlay) => existingPlay.isOnTheSameSquareAs(nextPlay))) {
      throw new SquareAlreadyFulfilledError();
    }
  }

  private guardNotSamePlayerPlayingTwice(nextPlay: Play): void {
    if (this.getLastPlay()?.isPerformedByTheSamePlayerAs(nextPlay)) {
      throw new SamePlayerPlaysTwiceError();
    }
  }

  public getLastPlay(): Play | undefined {
    return this.plays[this.plays.length - 1];
  }

  public getWinner(): Player | undefined {
    if (this.plays.length === 0) {
      return undefined;
    }

    for (let currentRow = 1; currentRow < 3; currentRow++) {
      for (const player of [Player.buildPlayerX(), Player.buildPlayerO()]) {
        const horizontalRows = this.plays.filter((play) =>
          play.wasOnRowAndPerformedByPlayer(player, new Row(currentRow)),
        );

        if (horizontalRows.length === 3) {
          return player;
        }
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

  public getLastPlay(): Play | undefined {
    return this.plays.getLastPlay();
  }

  public getWinner(): Player | undefined {
    return this.plays.getWinner();
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
