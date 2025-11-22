export class PrimeFactorsCalculator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getFrom(inputNumber: number): any[] {
    if (!Number.isInteger(inputNumber)) {
      throw new Error('Input must be a positive integer');
    }

    return [];
  }
}
