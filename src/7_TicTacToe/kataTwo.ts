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
}

export class Row {
  private readonly row: number;

  private readonly MIN_ROW_COLUMN = 1;
  private readonly MAX_ROW_COLUMN = 3;

  public constructor(row: number) {
    if (row < this.MIN_ROW_COLUMN || row > this.MAX_ROW_COLUMN) {
      throw new CellOutOfBoundsError();
    }

    this.row = row;
  }
}

export class Play {
  private readonly row: Row;
  private readonly column: number;

  public constructor(row: Row, column: number) {
    this.row = row;
    this.column = column;
  }

  public isTheSameAs(other: Play): boolean {
    return this.row === other.row && this.column === other.column;
  }
}

class Plays {
  private plays: Play[] = [];

  public add(play: Play): void {
    this.plays.push(play);
  }

  public guardPlayAlreadyPerformed(play: Play): void {
    if (this.plays.some((existingPlay) => existingPlay.isTheSameAs(play))) {
      throw new CellAlreadyFulfilledError();
    }
  }

  public getLastPlay(): Play | undefined {
    return this.plays[this.plays.length - 1];
  }
}

export class TicTacToeGame {
  private lastPlayer: Player | undefined = undefined;
  private plays: Plays = new Plays();

  public play(player: Player, play: Play): void {
    this.guardFirstPlayerIsX(player);
    this.guardNotSamePlayerPlayingTwice(player);
    this.plays.guardPlayAlreadyPerformed(play);

    this.lastPlayer = player;
    this.plays.add(play);
  }

  private guardFirstPlayerIsX(player: Player) {
    if (!this.lastPlayer && player.isTheSameAs(Player.buildPlayerO())) {
      throw new InvalidStartingPlayerError();
    }
  }

  private guardNotSamePlayerPlayingTwice(player: Player) {
    if (this.lastPlayer?.isTheSameAs(player)) {
      throw new SamePlayerPlaysTwiceError();
    }
  }

  public getLastMove(player: Player): Play | undefined {
    return this.plays.getLastPlay();
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

export class CellAlreadyFulfilledError extends Error {
  public constructor() {
    super('The cell is already fulfilled.');
  }
}

export class CellOutOfBoundsError extends Error {
  public constructor() {
    super('The cell is out of bounds.');
  }
}
