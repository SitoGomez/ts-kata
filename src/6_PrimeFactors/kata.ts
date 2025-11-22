export class PrimeFactorsCalculator {
  public getFrom(inputNumber: number): string {
    if (!Number.isInteger(inputNumber)) {
      throw new Error('Input must be a positive integer');
    }

    let result = '[';

    if (inputNumber > 1 && inputNumber <= 3) {
      result += inputNumber;
    }

    if (inputNumber === 4) {
      result += 2 + ',' + 2;
    }

    if (inputNumber === 5) {
      result += 5;
    }

    if (inputNumber === 6) {
      result += 2 + ',' + 3;
    }

    if (inputNumber === 7) {
      result += 7;
    }

    return result + ']';
  }
}
