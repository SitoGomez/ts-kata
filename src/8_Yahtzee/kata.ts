export type CategoryType =
  | 'Ones'
  | 'Twos'
  | 'Threes'
  | 'Fours'
  | 'Fives'
  | 'Sixes'
  | 'Pair'
  | 'TwoPairs'
  | 'ThreeOfAKind';

export class Category {
  private readonly value: CategoryType;

  public constructor(category: CategoryType) {
    this.value = category;
  }

  public isEquals(category: Category): boolean {
    return this.value === category.value;
  }
}

type CategoryValue = 1 | 2 | 3 | 4 | 5 | 6;

class CategoriesEquivalency {
  private readonly categoriesEquivalency = new Map<Category, CategoryValue>([
    [new Category('Ones'), 1],
    [new Category('Twos'), 2],
    [new Category('Threes'), 3],
    [new Category('Fours'), 4],
    [new Category('Fives'), 5],
    [new Category('Sixes'), 6],
  ]);

  public getByCategory(category: Category): number | undefined {
    let value: number | undefined = undefined;

    this.categoriesEquivalency.forEach((categoryValue, categoryRecord) => {
      if (categoryRecord.isEquals(category)) {
        value = categoryValue;
      }
    });

    return value;
  }
}

export type Dice = 1 | 2 | 3 | 4 | 5 | 6;

export class Roll {
  private readonly dices: Dice[];
  private readonly categoriesEquivalency = new CategoriesEquivalency();

  public constructor(
    firstDice: Dice,
    secondDice: Dice,
    thirdDice: Dice,
    fourthDice: Dice,
    fifthDice: Dice,
  ) {
    this.dices = [firstDice, secondDice, thirdDice, fourthDice, fifthDice];
  }

  public getByCategoryCount(category: Category): number {
    return this.dices.filter((dice) => dice === this.categoriesEquivalency.getByCategory(category))
      .length;
  }

  public getDuplicate(): Dice {
    return this.dices.find((dice, index) => this.dices.indexOf(dice) !== index)!;
  }

  public getTwoPairs(): [Dice, Dice] {
    const duplicates = this.dices.filter((dice, index) => this.dices.indexOf(dice) !== index);

    return [duplicates[0]!, duplicates[1]!];
  }

  public getThreeOfAKind(): Dice {
    return this.dices.find((n) => this.dices.filter((x) => x === n).length === 3)!;
  }
}

export class YahtzeeGame {
  private roll: Roll | undefined = undefined;
  private category: Category | undefined = undefined;
  private readonly categoriesEquivalency = new CategoriesEquivalency();

  public assignCategory(roll: Roll, category: Category): void {
    this.roll = roll;
    this.category = category;
  }

  public getScore(): number {
    if (this.category?.isEquals(new Category('ThreeOfAKind'))) {
      return this.roll!.getThreeOfAKind() * 3;
    }

    if (this.category?.isEquals(new Category('TwoPairs'))) {
      return this.roll!.getTwoPairs().reduce((sum, pair) => sum + pair * 2, 0);
    }

    if (this.category?.isEquals(new Category('Pair'))) {
      return this.roll!.getDuplicate() * 2;
    }

    const categoryValue = this.categoriesEquivalency.getByCategory(this.category!);

    if (!categoryValue) {
      return 0;
    }

    return this.roll!.getByCategoryCount(this.category!) * categoryValue;
  }
}
