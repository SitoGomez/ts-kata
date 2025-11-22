export class PrimeFactorsCalculator {
  private readonly PRIME_NUMBERS: number[] = [2, 3, 5, 7];

  public getFrom(inputNumber: number): number[] {
    if (!Number.isInteger(inputNumber)) {
      throw new Error('Input must be a positive integer');
    }

    const result: number[] = [];

    if (this.PRIME_NUMBERS.includes(inputNumber)) {
      result.push(inputNumber);
      return result;
    }

    const lowestPrimeDivisor = this.PRIME_NUMBERS.find((prime) => {
      return inputNumber % prime === 0;
    });

    if (lowestPrimeDivisor) {
      result.push(lowestPrimeDivisor);
      result.push(...this.getFrom(inputNumber / lowestPrimeDivisor));
    }

    return result;
  }
}
