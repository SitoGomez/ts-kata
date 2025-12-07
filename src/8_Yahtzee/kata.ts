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

interface CategoryInterface {
  calculateScore(roll: Roll): number;
}

export class Category {
  private readonly value: CategoryType;

  public constructor(category: CategoryType) {
    this.value = category;
  }

  public isEquals(category: Category): boolean {
    return this.value === category.value;
  }
}

export class SimpleCategory implements CategoryInterface {
  private readonly dice: Dice;

  public constructor(dice: Dice) {
    this.dice = dice;
  }

  public calculateScore(roll: Roll): number {
    return this.dice * roll.getByDiceCount(this.dice);
  }
}

export class PairCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getDuplicate() * 2;
  }
}

export class TwoPairsCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getTwoPairs().reduce((sum, pair) => sum + pair * 2, 0);
  }
}

export class ThreeOfAKindCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getThreeOfAKind() * 3;
  }
}

export type Dice = 1 | 2 | 3 | 4 | 5 | 6;

export class Roll {
  private readonly dices: Dice[];

  public constructor(
    firstDice: Dice,
    secondDice: Dice,
    thirdDice: Dice,
    fourthDice: Dice,
    fifthDice: Dice,
  ) {
    this.dices = [firstDice, secondDice, thirdDice, fourthDice, fifthDice];
  }

  public getByDiceCount(dice: Dice): number {
    return this.dices.filter((d) => d === dice).length;
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
  private category: CategoryInterface | undefined = undefined;
  // private readonly categoriesEquivalency = new CategoriesEquivalency();

  public assignCategory(roll: Roll, category: CategoryInterface): void {
    this.roll = roll;
    this.category = category;
  }

  public assignCategoryTwo(roll: Roll, category: Category): void {}

  public getScore(): number {
    return this.category!.calculateScore(this.roll!);
  }
}
