export class PrimeFactorsCalculator {
  public getFrom(inputNumber: number): number[] {
    if (!Number.isInteger(inputNumber)) {
      throw new Error('Input must be a positive integer');
    }

    const result: number[] = [];

    for (let divisor = 2; divisor <= inputNumber; divisor++) {
      if (inputNumber % divisor === 0) {
        result.push(divisor);
        result.push(...this.getFrom(inputNumber / divisor));
        return result;
      }
    }

    return result;
  }
}
