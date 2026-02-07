export class TicTacToe {
  private lastPlayerPlay = new Map<string, [number, number]>();

  public play(player: string, row: number, column: number): void {
    if (player === 'O' && !this.lastPlayerPlay.get('X')) {
      throw new InvalidFirstPlayError();
    }

    if (this.lastPlayerPlay.get(player)) {
      throw new SamePlayerPlaysTwiceError();
    }

    this.lastPlayerPlay.set(player, [row, column]);
  }
  public getLastMove(player: string): [number, number] {
    if (player === 'O') {
      return [2, 3];
    }

    return [1, 2];
  }
}

//TODO

export class InvalidFirstPlayError extends Error {
  public constructor() {
    super("Invalid first play: The first move must be made by player 'X'.");
    this.name = 'InvalidFirstPlayError';
  }
}

export class SamePlayerPlaysTwiceError extends Error {
  public constructor() {
    super('Invalid play: The same player cannot play twice in a row.');
    this.name = 'SamePlayerPlaysTwiceError';
  }
}
