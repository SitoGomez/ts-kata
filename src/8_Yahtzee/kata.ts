type SimpleCategoryType = 'Ones' | 'Twos' | 'Threes' | 'Fours' | 'Fives' | 'Sixes';
type SpecialCategoryType = 'Pair' | 'TwoPairs' | 'ThreeOfAKind' | 'FourOfAKind' | 'SmallStraight';

export type CategoryType = SimpleCategoryType | SpecialCategoryType;

export class Category {
  private readonly value: CategoryType;

  public constructor(value: CategoryType) {
    this.value = value;
  }

  public isEqual(category: Category): boolean {
    return this.value === category.value;
  }
}

class SimpleCategoryEquivalence {
  private readonly equivalences = new Map<Category, Dice>([
    [new Category('Ones'), 1],
    [new Category('Twos'), 2],
    [new Category('Threes'), 3],
    [new Category('Fours'), 4],
    [new Category('Fives'), 5],
    [new Category('Sixes'), 6],
  ]);

  public byCategory(category: Category): Dice | undefined {
    for (const [simpleCategory, valueEquivalence] of this.equivalences) {
      if (simpleCategory.isEqual(category)) {
        return valueEquivalence;
      }
    }

    return undefined;
  }
}

interface CategoryScoreStrategy {
  calculate(roll: Roll): number;
}

class SimpleStrategy implements CategoryScoreStrategy {
  private readonly dice: Dice;

  public constructor(dice: Dice) {
    this.dice = dice;
  }

  public calculate(roll: Roll): number {
    return this.dice * roll.getByDiceCount(this.dice);
  }
}

class PairStrategy implements CategoryScoreStrategy {
  public calculate(roll: Roll): number {
    return roll.getHighestPair() * 2;
  }
}

class TwoPairsStrategy implements CategoryScoreStrategy {
  public calculate(roll: Roll): number {
    return roll.getTwoPairs().reduce((sum, pair) => sum + pair * 2, 0);
  }
}

class ThreeOfAKindStrategy implements CategoryScoreStrategy {
  public calculate(roll: Roll): number {
    return roll.getThreeOfAKind() * 3;
  }
}

class FourOfAKindStrategy implements CategoryScoreStrategy {
  public calculate(roll: Roll): number {
    return roll.getHighestPair() * 4;
  }
}

class SmallStraightStrategy implements CategoryScoreStrategy {
  public calculate(_roll: Roll): number {
    return 15;
  }
}

class CategoryScoreStrategyFactory {
  private readonly simpleCategoryEquivalence = new SimpleCategoryEquivalence();

  public byCategory(category: Category): CategoryScoreStrategy {
    const simpleCategoryEquivalence = this.simpleCategoryEquivalence.byCategory(category);

    if (simpleCategoryEquivalence) {
      return new SimpleStrategy(simpleCategoryEquivalence);
    } else if (category.isEqual(new Category('Pair'))) {
      return new PairStrategy();
    } else if (category.isEqual(new Category('TwoPairs'))) {
      return new TwoPairsStrategy();
    } else if (category.isEqual(new Category('ThreeOfAKind'))) {
      return new ThreeOfAKindStrategy();
    } else if (category.isEqual(new Category('FourOfAKind'))) {
      return new FourOfAKindStrategy();
    } else if (category.isEqual(new Category('SmallStraight'))) {
      return new SmallStraightStrategy();
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

  public getHighestPair(): Dice {
    const duplicates = new Set(
      this.dices.filter((dice, index) => this.dices.indexOf(dice) !== index),
    );

    return Math.max(...duplicates) as Dice;
  }

  public getTwoPairs(): [Dice, Dice] {
    const duplicates = this.dices.filter((dice, index) => this.dices.indexOf(dice) !== index);

    return duplicates as [Dice, Dice];
  }

  public getThreeOfAKind(): Dice {
    return this.dices.find((n) => this.dices.filter((x) => x === n).length === 3)!;
  }
}

export class YahtzeeGame {
  private roll: Roll | undefined = undefined;
  private category: Category | undefined = undefined;

  private readonly categoryScoreStrategyFactory = new CategoryScoreStrategyFactory();

  public assignCategory(roll: Roll, category: Category): void {
    this.roll = roll;
    this.category = category;
  }

  public getScore(): number {
    return this.categoryScoreStrategyFactory.byCategory(this.category!).calculate(this.roll!);
  }
}
