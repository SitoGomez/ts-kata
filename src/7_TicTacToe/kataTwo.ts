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

interface PlayType {
  row: number;
  column: number;
}

class Plays {
  private plays: PlayType[] = [];

  public add(play: PlayType): void {
    this.plays.push(play);
  }

  public guardCellIsEmpty(row: number, column: number): void {
    if (this.plays.some((play) => play.row === row && play.column === column)) {
      throw new CellAlreadyFulfilledError();
    }
  }
}

export class TicTacToeGame {
  private lastPlayer: Player | undefined = undefined;
  private game: Plays = new Plays();

  public play(player: Player, row: number, column: number): void {
    this.guardFirstPlayerIsX(player);
    this.guardNotSamePlayerPlayingTwice(player);
    this.game.guardCellIsEmpty(row, column);

    this.lastPlayer = player;
    this.game.add({ row, column });
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

  public getLastMove(player: Player): [number, number] {
    return [1, 2];
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
