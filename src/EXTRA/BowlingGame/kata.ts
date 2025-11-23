export class BowlingGame {
  private pinsKnocked = 0;

  public roll(pinsKnockedDown: number): number {
    this.pinsKnocked = pinsKnockedDown;
    return this.pinsKnocked;
  }

  public currentScore(): number {
    return this.pinsKnocked;
  }
}
