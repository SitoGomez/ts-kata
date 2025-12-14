type NumberCategoryType = 'Ones' | 'Twos' | 'Threes' | 'Fours' | 'Fives' | 'Sixes';
type TwoPairsCategoryType = 'TwoPairs';
type OfAKindCategoryType = 'Pair' | 'ThreeOfAKind' | 'FourOfAKind';
type SpecialCategoryType = 'SmallStraight' | 'LargeStraight' | 'FullHouse' | 'Yahtzee';

export type CategoryType =
  | NumberCategoryType
  | TwoPairsCategoryType
  | OfAKindCategoryType
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

class NumberCategoryEquivalences {
  private readonly equivalences = new Map<Category, Dice>([
    [new Category('Ones'), 1],
    [new Category('Twos'), 2],
    [new Category('Threes'), 3],
    [new Category('Fours'), 4],
    [new Category('Fives'), 5],
    [new Category('Sixes'), 6],
  ]);

  public byCategory(category: Category): Dice | undefined {
    for (const [numberCategory, valueEquivalence] of this.equivalences) {
      if (category.isEqual(numberCategory)) {
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

  public byCategory(category: Category): number | undefined {
    for (const [ofAKindCategory, valueEquivalence] of this.equivalences) {
      if (category.isEqual(ofAKindCategory)) {
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
      if (category.isEqual(specialCategory)) {
        return valueEquivalence;
      }
    }

    return undefined;
  }
}

interface CategoryScoreStrategy {
  calculate(play: PlayType): number;
}

class NumberStrategy implements CategoryScoreStrategy {
  private readonly dice: Dice;

  public constructor(dice: Dice) {
    this.dice = dice;
  }

  public calculate(play: PlayType): number {
    return this.dice * play.roll.getByDiceCount(this.dice);
  }
}

class TwoPairsStrategy implements CategoryScoreStrategy {
  public calculate(play: PlayType): number {
    return play.roll.getTwoPairs().reduce((sum, pair) => sum + pair * 2, 0);
  }
}

class OfAKindScoreStrategy implements CategoryScoreStrategy {
  private readonly repetitions: number;

  public constructor(repetitions: number) {
    this.repetitions = repetitions;
  }

  public calculate(play: PlayType): number {
    return play.roll.findHighestRepeatedDice(this.repetitions) * this.repetitions;
  }
}

class SpecialStrategy implements CategoryScoreStrategy {
  private readonly score: number;

  public constructor(score: number) {
    this.score = score;
  }
  public calculate(play: PlayType): number {
    return this.score;
  }
}

class ScoreStrategyFactory {
  private readonly numberCategoryEquivalences = new NumberCategoryEquivalences();
  private readonly ofAKindEquivalences = new OfAKindCategoryEquivalences();
  private readonly specialCategoryEquivalences = new SpecialCategoryEquivalences();

  private readonly numberCategories = [
    new Category('Ones'),
    new Category('Twos'),
    new Category('Threes'),
    new Category('Fours'),
    new Category('Fives'),
    new Category('Sixes'),
  ];

  private readonly twoPairsCategory = new Category('TwoPairs');

  private readonly ofAKindCategories = [
    new Category('Pair'),
    new Category('ThreeOfAKind'),
    new Category('FourOfAKind'),
  ];

  private readonly specialCategories = [
    new Category('SmallStraight'),
    new Category('LargeStraight'),
    new Category('FullHouse'),
    new Category('Yahtzee'),
  ];

  public create(play: PlayType): CategoryScoreStrategy {
    if (this.numberCategories.find((category) => play.category.isEqual(category))) {
      return new NumberStrategy(this.numberCategoryEquivalences.byCategory(play.category)!);
    }

    if (play.category.isEqual(this.twoPairsCategory)) {
      return new TwoPairsStrategy();
    }

    if (this.ofAKindCategories.find((category) => play.category.isEqual(category))) {
      return new OfAKindScoreStrategy(this.ofAKindEquivalences.byCategory(play.category)!);
    }

    if (this.specialCategories.find((category) => play.category.isEqual(category))) {
      return new SpecialStrategy(this.specialCategoryEquivalences.byCategory(play.category)!);
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

export type PlayerType = string;

export class Player {
  private readonly type: PlayerType;

  public constructor(type: PlayerType) {
    this.type = type;
  }

  public isEqualType(type: PlayerType): boolean {
    return this.type === type;
  }

  public isEqual(player: Player): boolean {
    return this.type === player.type;
  }
}

interface PlayType {
  roll: Roll;
  category: Category;
  player: Player;
}

//No me termina de convencer tener todas las jugadas de todos los jugadores en el mismo sitio
// Se podría tener separado, esto es simplemente como lo he hecho pero es opinionated
class Plays {
  private readonly plays: PlayType[] = [];

  public addPlay(play: PlayType): void {
    this.guardPlayIsValid(play);

    this.plays.push(play);
  }

  private guardPlayIsValid(play: PlayType) {
    for (const existingPlay of this.plays) {
      if (
        existingPlay.player.isEqual(play.player) &&
        existingPlay.category.isEqual(play.category)
      ) {
        throw new CategoryAlreadyAssignedError();
      }
    }
  }

  private getFirstPlayForEachCategory(): PlayType[] {
    const uniquePlays: PlayType[] = [];

    for (const play of this.plays) {
      const isCategoryAlreadyAdded = uniquePlays.some((alreadyAddedPlay) =>
        alreadyAddedPlay.category.isEqual(play.category),
      );

      if (!isCategoryAlreadyAdded) {
        uniquePlays.push(play);
      }
    }

    return uniquePlays;
  }

  //TODO: Que este método devuelva PlayType rompe la idea general de encapsular el tratamiento de jugadas aquí
  public getFirstPlayForEachCategoryByPlayer(player: PlayerType): PlayType[] {
    return this.getFirstPlayForEachCategory().filter((play) => play.player.isEqualType(player));
  }
}

class PlaysScoreCalculator {
  private readonly categoryScoreStrategyFactory = new ScoreStrategyFactory();
  private readonly plays: Plays;

  public constructor(plays: Plays) {
    this.plays = plays;
  }

  public calculateByPlayer(player: PlayerType): number {
    return this.plays.getFirstPlayForEachCategoryByPlayer(player).reduce((totalScore, play) => {
      const categoryScoreStrategy = this.categoryScoreStrategyFactory.create(play);

      return totalScore + categoryScoreStrategy.calculate(play);
    }, 0);
  }
}

//TODO: Todos los jugadores tienen que haber terminado sus jugadas
// Realmente necesitamos esta clase? Podría estar en Plays o aquí - Pensar
class EndGameRules {
  //Este número no me gusta tenerlo "hardcodeado" aquí -> esto es ok -> connaisance of value
  private readonly TOTAL_CATEGORIES = 14;

  //TODO: ?
  public isFinished(plays: Plays): boolean {}
}

export class YahtzeeGame {
  private plays: Plays = new Plays();
  private endGameRules: EndGameRules = new EndGameRules();

  public assignPlay(play: PlayType): void {
    this.plays.addPlay(play);
  }

  public isFinished(): boolean {
    return this.endGameRules.isFinished(this.plays);
  }

  public getScoreByPlayer(player: PlayerType): number {
    return new PlaysScoreCalculator(this.plays).calculateByPlayer(player);
  }
}

export class CategoryAlreadyAssignedError extends Error {
  public constructor() {
    super(`Category has already been assigned.`);
    this.name = 'CategoryAlreadyAssignedError';
  }
}
