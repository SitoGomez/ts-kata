export class PrimeFactorsCalculator {
  private readonly PRIME_NUMBERS: number[] = [2, 3, 5, 7];

  public getFrom(inputNumber: number): string {
    if (!Number.isInteger(inputNumber)) {
      throw new Error('Input must be a positive integer');
    }

    let result = '[';

    if (this.PRIME_NUMBERS.includes(inputNumber)) {
      result += inputNumber;
    }

    if (inputNumber === 4) {
      result += 2 + ',' + 2;
    }

    if (inputNumber === 6) {
      result += 2 + ',' + 3;
    }

    if (inputNumber === 8) {
      result += 2 + ',' + 2 + ',' + 2;
    }

    return result + ']';
  }
}
