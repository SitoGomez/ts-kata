export type CategoryType = 'Ones' | 'Twos' | 'Threes' | 'Fours' | 'Fives' | 'Sixes';

class Categories {
  private readonly categoriesEquivalency = new Map<CategoryType, number>([
    ['Ones', 1],
    ['Twos', 2],
    ['Threes', 3],
    ['Fours', 4],
    ['Fives', 5],
    ['Sixes', 6],
  ]);

  public getValue(category: CategoryType): number | undefined {
    return this.categoriesEquivalency.get(category);
  }
}

export type Dice = 1 | 2 | 3 | 4 | 5 | 6;

export class Roll {
  private readonly dice: Dice[];
  private readonly categoriesEquivalency = new Categories();

  public constructor(
    firstDice: Dice,
    secondDice: Dice,
    thirdDice: Dice,
    fourthDice: Dice,
    fifthDice: Dice,
  ) {
    this.dice = [firstDice, secondDice, thirdDice, fourthDice, fifthDice];
  }

  public getByCategoryCount(category: CategoryType): number {
    return this.dice.filter((dice) => dice === this.categoriesEquivalency.getValue(category))
      .length;
  }
}

export class YahtzeeGame {
  private roll: Roll | undefined = undefined;
  private category: CategoryType | undefined = undefined;
  private readonly categoriesEquivalency = new Categories();

  public assignCategory(roll: Roll, category: CategoryType): void {
    this.roll = roll;
    this.category = category;
  }

  public getScore(): number {
    const categoryValue = this.categoriesEquivalency.getValue(this.category!);

    if (!categoryValue) {
      return 0;
    }

    return this.roll!.getByCategoryCount(this.category!) * categoryValue;
  }
}
