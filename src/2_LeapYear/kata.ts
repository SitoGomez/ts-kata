export class LeapYearCalculator {
  private year: number;

  public constructor(year: number) {
    this.year = year;
  }

  public calculate(): boolean {
    if (this.year % 400 === 0) {
      return true;
    }

    if (this.year % 100 === 0) {
      return false;
    }

    if (this.year % 4 === 0) {
      return true;
    }

    return false;
  }
}
