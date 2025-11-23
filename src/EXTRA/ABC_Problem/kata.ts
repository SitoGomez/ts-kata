export class ABCBlocksBag {
  private readonly NON_REUSABLE_LETTERS = new Set([
    'J',
    'W',
    'H',
    'U',
    'V',
    'I',
    'L',
    'Y',
    'Z',
    'M',
  ]);

  public canMakeWord(word: string): boolean {
    const uniqueChars = new Set<string>();

    for (const char of word) {
      if (uniqueChars.has(char) && this.NON_REUSABLE_LETTERS.has(char)) {
        return false;
      }

      uniqueChars.add(char);
    }

    return true;
  }
}
