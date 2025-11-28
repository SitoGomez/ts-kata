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
}

export class TicTacToeGame {
  private lastPlayer: Player | undefined = undefined;

  public play(player: Player, row: number, column: number): void {
    this.guardFirstPlayerIsX(player);
    this.guardNotSamePlayerPlayingTwice(player);

    this.lastPlayer = player;
  }

  private guardFirstPlayerIsX(player: Player) {
    if (!this.lastPlayer && player.isTheSameAs(new Player('O'))) {
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
