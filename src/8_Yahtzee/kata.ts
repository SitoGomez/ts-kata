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

interface CategoryScoreStrategy {
  calculate(roll: Roll): number;
}

export class Category {
  private readonly value: CategoryType;

  public constructor(value: CategoryType) {
    this.value = value;
  }

  public isEqual(category: Category): boolean {
    return this.value === category.value;
  }
}

export class SimpleStrategy implements CategoryScoreStrategy {
  private readonly dice: Dice;

  public constructor(dice: Dice) {
    this.dice = dice;
  }

  public calculate(roll: Roll): number {
    return this.dice * roll.getByDiceCount(this.dice);
  }
}

export class PairStrategy implements CategoryScoreStrategy {
  public calculate(roll: Roll): number {
    return roll.getDuplicate() * 2;
  }
}

export class TwoPairsStrategy implements CategoryScoreStrategy {
  public calculate(roll: Roll): number {
    return roll.getTwoPairs().reduce((sum, pair) => sum + pair * 2, 0);
  }
}

export class ThreeOfAKindStrategy implements CategoryScoreStrategy {
  public calculate(roll: Roll): number {
    return roll.getThreeOfAKind() * 3;
  }
}

class CategoryScoreStrategyFactory {
  public static fromCategory(category: Category): CategoryScoreStrategy {
    if (category.isEqual(new Category('Ones'))) {
      return new SimpleStrategy(1);
    } else if (category.isEqual(new Category('Twos'))) {
      return new SimpleStrategy(2);
    } else if (category.isEqual(new Category('Threes'))) {
      return new SimpleStrategy(3);
    } else if (category.isEqual(new Category('Fours'))) {
      return new SimpleStrategy(4);
    } else if (category.isEqual(new Category('Fives'))) {
      return new SimpleStrategy(5);
    } else if (category.isEqual(new Category('Sixes'))) {
      return new SimpleStrategy(6);
    } else if (category.isEqual(new Category('Pair'))) {
      return new PairStrategy();
    } else if (category.isEqual(new Category('TwoPairs'))) {
      return new TwoPairsStrategy();
    } else if (category.isEqual(new Category('ThreeOfAKind'))) {
      return new ThreeOfAKindStrategy();
    }

    throw new Error('Unknown category');
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
  private category: Category | undefined = undefined;

  public assignCategory(roll: Roll, category: Category): void {
    this.roll = roll;
    this.category = category;
  }

  public getScore(): number {
    return CategoryScoreStrategyFactory.fromCategory(this.category!).calculate(this.roll!);
  }
}
