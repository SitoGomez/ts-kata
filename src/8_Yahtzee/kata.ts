type NumberCategoryType = 'Ones' | 'Twos' | 'Threes' | 'Fours' | 'Fives' | 'Sixes';
type TwoPairsCategoryType = 'TwoPairs';
type OfAKindCategoryType = 'Pair' | 'ThreeOfAKind' | 'FourOfAKind';
type SpecialCategoryType = 'SmallStraight' | 'LargeStraight' | 'FullHouse' | 'Yahtzee';

export type CategoryType =
  | NumberCategoryType
  | TwoPairsCategoryType
  | OfAKindCategoryType
  | SpecialCategoryType;

class Category {
  private readonly value: CategoryType;

  public constructor(value: CategoryType) {
    this.value = value;
  }

  public isEqual(category: Category): boolean {
    return this.value === category.value;
  }
}

class NumberCategoryEquivalences {
  private readonly equivalences = new Map<Category, Dice>([
    [new Category('Ones'), 1],
    [new Category('Twos'), 2],
    [new Category('Threes'), 3],
    [new Category('Fours'), 4],
    [new Category('Fives'), 5],
    [new Category('Sixes'), 6],
  ]);

  public byPlay(play: Play): Dice | undefined {
    for (const [numberCategory, valueEquivalence] of this.equivalences) {
      if (play.isOfCategory(numberCategory)) {
        return valueEquivalence;
      }
    }

    return undefined;
  }
}

class OfAKindCategoryEquivalences {
  private readonly equivalences = new Map<Category, number>([
    [new Category('Pair'), 2],
    [new Category('ThreeOfAKind'), 3],
    [new Category('FourOfAKind'), 4],
  ]);

  public byPlay(play: Play): number | undefined {
    for (const [ofAKindCategory, valueEquivalence] of this.equivalences) {
      if (play.isOfCategory(ofAKindCategory)) {
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

  public byPlay(play: Play): number | undefined {
    for (const [specialCategory, valueEquivalence] of this.equivalences) {
      if (play.isOfCategory(specialCategory)) {
        return valueEquivalence;
      }
    }

    return undefined;
  }
}

interface CategoryScoreStrategy {
  calculate(play: Play): number;
}

class NumberStrategy implements CategoryScoreStrategy {
  private readonly dice: Dice;

  public constructor(dice: Dice) {
    this.dice = dice;
  }

  public calculate(play: Play): number {
    return this.dice * play.getByDiceCount(this.dice);
  }
}

class TwoPairsStrategy implements CategoryScoreStrategy {
  public calculate(play: Play): number {
    return play.getTwoPairs().reduce((sum, pair) => sum + pair * 2, 0);
  }
}

class OfAKindScoreStrategy implements CategoryScoreStrategy {
  private readonly repetitions: number;

  public constructor(repetitions: number) {
    this.repetitions = repetitions;
  }

  public calculate(play: Play): number {
    return play.findHighestRepeatedDice(this.repetitions) * this.repetitions;
  }
}

class SpecialStrategy implements CategoryScoreStrategy {
  private readonly score: number;

  public constructor(score: number) {
    this.score = score;
  }

  public calculate(_play: Play): number {
    return this.score;
  }
}

class PlayScoreStrategyFactory {
  private readonly numberCategoryEquivalences = new NumberCategoryEquivalences();
  private readonly ofAKindEquivalences = new OfAKindCategoryEquivalences();
  private readonly specialCategoryEquivalences = new SpecialCategoryEquivalences();

  public byPlay(play: Play): CategoryScoreStrategy {
    const numberCategoryEquivalence = this.numberCategoryEquivalences.byPlay(play);

    if (numberCategoryEquivalence) {
      return new NumberStrategy(numberCategoryEquivalence);
    }

    if (play.isOfCategory(new Category('TwoPairs'))) {
      return new TwoPairsStrategy();
    }

    const ofAKindEquivalence = this.ofAKindEquivalences.byPlay(play);
    if (ofAKindEquivalence !== undefined) {
      return new OfAKindScoreStrategy(ofAKindEquivalence);
    }

    const specialCategoryEquivalence = this.specialCategoryEquivalences.byPlay(play);

    if (specialCategoryEquivalence !== undefined) {
      return new SpecialStrategy(specialCategoryEquivalence);
    }

    throw new Error('Unknown category');
  }
}

export type Dice = 1 | 2 | 3 | 4 | 5 | 6;

class Roll {
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

  public findHighestRepeatedDice(repetitions: number): Dice {
    const uniqueRepeatedDice = new Set(
      this.dices.filter((dice, index) => this.dices.indexOf(dice) !== index),
    );

    const matchedDiceWithRepetitions = Array.from(uniqueRepeatedDice).filter((dice) => {
      return this.dices.filter((n) => n === dice).length === repetitions;
    });

    return Math.max(...matchedDiceWithRepetitions) as Dice;
  }

  public getTwoPairs(): [Dice, Dice] {
    const duplicates = this.dices.filter((dice, index) => this.dices.indexOf(dice) !== index);

    return duplicates as [Dice, Dice];
  }
}

export class Play {
  private readonly roll: Roll;
  private readonly category: Category;

  public constructor(roll: Roll, category: Category) {
    this.roll = roll;
    this.category = category;
  }

  public static fromCategoryAndRoll(
    category: CategoryType,
    roll: [Dice, Dice, Dice, Dice, Dice],
  ): Play {
    return new Play(new Roll(roll[0], roll[1], roll[2], roll[3], roll[4]), new Category(category));
  }

  public isOfCategory(otherCategory: Category): boolean {
    return this.category.isEqual(otherCategory);
  }

  public sameCategoryAs(otherPlay: Play): boolean {
    return this.category.isEqual(otherPlay.category);
  }

  public getByDiceCount(dice: Dice): number {
    return this.roll.getByDiceCount(dice);
  }

  public findHighestRepeatedDice(repetitions: number): Dice {
    return this.roll.findHighestRepeatedDice(repetitions);
  }

  public getTwoPairs(): [Dice, Dice] {
    return this.roll.getTwoPairs();
  }
}

class Plays {
  private readonly plays: Play[] = [];

  public addPlay(play: Play): void {
    this.plays.push(play);
  }

  public getFirstPlayForEachCategory(): Play[] {
    const uniquePlays: Play[] = [];

    for (const play of this.plays) {
      const isCategoryAlreadyAdded = uniquePlays.some((p) => p.sameCategoryAs(play));

      if (!isCategoryAlreadyAdded) {
        uniquePlays.push(play);
      }
    }

    return uniquePlays;
  }
}

class PlaysScoreCalculator {
  private readonly categoryScoreStrategyFactory = new PlayScoreStrategyFactory();
  private readonly plays: Plays;

  public constructor(plays: Plays) {
    this.plays = plays;
  }

  public calculate(): number {
    return this.plays.getFirstPlayForEachCategory().reduce((totalScore, play) => {
      const categoryScoreStrategy = this.categoryScoreStrategyFactory.byPlay(play);

      return totalScore + categoryScoreStrategy.calculate(play);
    }, 0);
  }
}

class EndGameRules {
  private readonly TOTAL_CATEGORIES = 14;

  public isFinished(plays: Plays): boolean {
    if (plays.getFirstPlayForEachCategory().length < this.TOTAL_CATEGORIES) {
      return false;
    }

    return true;
  }
}

export class YahtzeeGame {
  private plays: Plays = new Plays();
  private endGameRules: EndGameRules = new EndGameRules();

  public assignPlay(play: Play): void {
    this.plays.addPlay(play);
  }

  public getScore(): number {
    return new PlaysScoreCalculator(this.plays).calculate();
  }

  public isFinished(): boolean {
    return this.endGameRules.isFinished(this.plays);
  }
}
