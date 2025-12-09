type SimpleCategoryType = 'Ones' | 'Twos' | 'Threes' | 'Fours' | 'Fives' | 'Sixes';
type TwoPairsCategoryType = 'TwoPairs';
type AppearancesCategoryType = 'Pair' | 'ThreeOfAKind' | 'FourOfAKind';
type SpecialCategoryType = 'SmallStraight' | 'LargeStraight' | 'FullHouse' | 'Yahtzee';

export type CategoryType =
  | SimpleCategoryType
  | TwoPairsCategoryType
  | AppearancesCategoryType
  | SpecialCategoryType;

export class Category {
  private readonly value: CategoryType;

  public constructor(value: CategoryType) {
    this.value = value;
  }

  public isEqual(category: Category): boolean {
    return this.value === category.value;
  }
}

class SimpleCategoryEquivalences {
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

class AppearancesCategoryEquivalences {
  private readonly equivalences = new Map<Category, number>([
    [new Category('Pair'), 2],
    [new Category('ThreeOfAKind'), 3],
    [new Category('FourOfAKind'), 4],
  ]);

  public byCategory(category: Category): number | undefined {
    for (const [appearancesCategory, valueEquivalence] of this.equivalences) {
      if (appearancesCategory.isEqual(category)) {
        return valueEquivalence;
      }
    }

    return undefined;
  }
}

class SpecialCategoryEquivalences {
  private readonly equivalences = new Map<Category, number>([
    [new Category('SmallStraight'), 15],
    [new Category('LargeStraight'), 20],
    [new Category('FullHouse'), 25],
    [new Category('Yahtzee'), 50],
  ]);

  public byCategory(category: Category): number | undefined {
    for (const [specialCategory, valueEquivalence] of this.equivalences) {
      if (specialCategory.isEqual(category)) {
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

class TwoPairsStrategy implements CategoryScoreStrategy {
  public calculate(roll: Roll): number {
    return roll.getTwoPairs().reduce((sum, pair) => sum + pair * 2, 0);
  }
}

class AppearancesScoreStrategy implements CategoryScoreStrategy {
  private readonly appearances: number;

  public constructor(appearances: number) {
    this.appearances = appearances;
  }

  public calculate(roll: Roll): number {
    return roll.findHighestRepeatedDice(this.appearances) * this.appearances;
  }
}

class SpecialStrategy implements CategoryScoreStrategy {
  private readonly score: number;

  public constructor(score: number) {
    this.score = score;
  }

  public calculate(_roll: Roll): number {
    return this.score;
  }
}

class CategoryScoreStrategyFactory {
  private readonly simpleCategoryEquivalences = new SimpleCategoryEquivalences();
  private readonly appearancesCategoryEquivalences = new AppearancesCategoryEquivalences();
  private readonly specialCategoryEquivalences = new SpecialCategoryEquivalences();

  public byCategory(category: Category): CategoryScoreStrategy {
    const simpleCategoryEquivalence = this.simpleCategoryEquivalences.byCategory(category);

    if (simpleCategoryEquivalence) {
      return new SimpleStrategy(simpleCategoryEquivalence);
    }

    if (category.isEqual(new Category('TwoPairs'))) {
      return new TwoPairsStrategy();
    }

    const appearancesCategoryEquivalence =
      this.appearancesCategoryEquivalences.byCategory(category);

    if (appearancesCategoryEquivalence !== undefined) {
      return new AppearancesScoreStrategy(appearancesCategoryEquivalence);
    }

    const specialCategoryEquivalence = this.specialCategoryEquivalences.byCategory(category);

    if (specialCategoryEquivalence !== undefined) {
      return new SpecialStrategy(specialCategoryEquivalence);
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

  public findHighestRepeatedDice(numberOfRepetitions: number): Dice {
    const uniqueRepeatedDice = new Set(
      this.dices.filter((dice, index) => this.dices.indexOf(dice) !== index),
    );

    const matchedDiceWithRepetitions = Array.from(uniqueRepeatedDice).filter((dice) => {
      return this.dices.filter((n) => n === dice).length === numberOfRepetitions;
    });

    return Math.max(...matchedDiceWithRepetitions) as Dice;
  }

  public getTwoPairs(): [Dice, Dice] {
    const duplicates = this.dices.filter((dice, index) => this.dices.indexOf(dice) !== index);

    return duplicates as [Dice, Dice];
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
