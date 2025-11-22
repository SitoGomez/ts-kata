export class PrimeFactorsCalculator {
  public getFrom(inputNumber: number): number[] {
    if (!Number.isInteger(inputNumber)) {
      throw new Error('Input must be a positive integer');
    }

    const result: number[] = [];

    for (let potentialPrime = 2; potentialPrime <= inputNumber; potentialPrime++) {
      const firstPrimeDivisor: number[] = [];

      for (let currentDivisor = 2; currentDivisor <= Math.sqrt(potentialPrime); currentDivisor++) {
        if (potentialPrime % currentDivisor === 0) {
          firstPrimeDivisor.push(currentDivisor);
        }
      }

      if (!firstPrimeDivisor.length && inputNumber % potentialPrime === 0) {
        result.push(potentialPrime);
        result.push(...this.getFrom(inputNumber / potentialPrime));

        //Early return after finding the first prime factor that divides the input number
        return result;
      }
    }

    return result;
  }
}
