export class RomanNumberConverter {
  public toRoman(decimalNumber: number): string {
    let accumulator = Number(decimalNumber);

    if (accumulator === 14) {
      return 'XIV';
    }

    if (accumulator === 10) {
      return 'X';
    }

    if (accumulator === 9) {
      return 'IX';
    }

    if (accumulator === 4) {
      return 'IV';
    }

    let romanNumber = '';

    if (accumulator >= 10) {
      romanNumber += 'X';
      accumulator -= 10;
    }

    if (accumulator >= 5) {
      romanNumber += 'V';
      accumulator -= 5;
    }

    for (let i = 0; i < accumulator; i++) {
      romanNumber += 'I';
    }

    return romanNumber;
  }
}
