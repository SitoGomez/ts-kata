export class ABCBlocksBag {
  public canMakeWord(word: string): boolean {
    const uniqueChars = new Set<string>();
    const repeatedChars = new Set<string>();

    for (const char of word) {
      if (uniqueChars.has(char)) {
        repeatedChars.add(char);
      }

      uniqueChars.add(char);
    }

    if (repeatedChars.size > 0) {
      return false;
    }

    return true;
  }
}
