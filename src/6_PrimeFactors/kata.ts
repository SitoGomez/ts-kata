export class PrimeFactorsCalculator {
  public getFrom(inputNumber: number): string {
    if (!Number.isInteger(inputNumber)) {
      throw new Error('Input must be a positive integer');
    }

    if (inputNumber > 1) {
      return '[' + inputNumber + ']';
    }

    return '[' + ']';
  }
}
