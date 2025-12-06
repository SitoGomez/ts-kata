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

export class OnesCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getByDiceCount(1) * 1;
  }
}

export class TwosCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getByCategoryCount(new Category('Twos')) * 2;
  }
}

export class ThreesCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getByCategoryCount(new Category('Threes')) * 3;
  }
}

export class FoursCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getByCategoryCount(new Category('Fours')) * 4;
  }
}

export class FivesCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getByCategoryCount(new Category('Fives')) * 5;
  }
}

export class SixesCategory implements CategoryInterface {
  public calculateScore(roll: Roll): number {
    return roll.getByCategoryCount(new Category('Sixes')) * 6;
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

  public getScore(): number {
    return this.category!.calculateScore(this.roll!);

    // if (this.category?.isEquals(new Category('ThreeOfAKind'))) {
    //   return this.roll!.getThreeOfAKind() * 3;
    // }

    // if (this.category?.isEquals(new Category('TwoPairs'))) {
    //   return this.roll!.getTwoPairs().reduce((sum, pair) => sum + pair * 2, 0);
    // }

    // if (this.category?.isEquals(new Category('Pair'))) {
    //   return this.roll!.getDuplicate() * 2;
    // }

    // const categoryValue = this.categoriesEquivalency.getByCategory(this.category!);

    // if (!categoryValue) {
    //   return 0;
    // }

    // return this.roll!.getByCategoryCount(this.category!) * categoryValue;
  }
}
