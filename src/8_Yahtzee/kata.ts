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
    const INVALID_ASSIGNMENT_SCORE = 0;
    const DUPLICATE_MULTIPLIER = 2;

    const uniqueRepeatedNumbers = play.roll.getTwoPairs();

    if (uniqueRepeatedNumbers.length < 2) {
      return INVALID_ASSIGNMENT_SCORE;
    }

    return play.roll.getTwoPairs().reduce((sum, pair) => sum + pair * DUPLICATE_MULTIPLIER, 0);
  }
}

class OfAKindScoreStrategy implements CategoryScoreStrategy {
  private readonly repetitions: number;

  public constructor(repetitions: number) {
    this.repetitions = repetitions;
  }

  public calculate(play: PlayType): number {
    const INVALID_ASSIGNMENT_SCORE = 0;
    const highestRepeatedDice = play.roll.findHighestRepeatedDice(this.repetitions);

    if (!highestRepeatedDice) {
      return INVALID_ASSIGNMENT_SCORE;
    }

    return highestRepeatedDice * this.repetitions;
  }
}

class SmallStraightStrategy implements CategoryScoreStrategy {
  public calculate(play: PlayType): number {
    const SMALL_STRAIGHT_SCORE = 15;
    const INVALID_ASSIGNMENT_SCORE = 0;

    if (play.roll.isSmallStraight()) {
      return SMALL_STRAIGHT_SCORE;
    }

    return INVALID_ASSIGNMENT_SCORE;
  }
}

class LargeStraightStrategy implements CategoryScoreStrategy {
  public calculate(play: PlayType): number {
    const LARGE_STRAIGHT_SCORE = 20;
    const INVALID_ASSIGNMENT_SCORE = 0;

    if (play.roll.isLargeStraight()) {
      return LARGE_STRAIGHT_SCORE;
    }

    return INVALID_ASSIGNMENT_SCORE;
  }
}

class FullHouseStrategy implements CategoryScoreStrategy {
  public calculate(play: PlayType): number {
    const FULL_HOUSE_SCORE = 25;
    const INVALID_ASSIGNMENT_SCORE = 0;

    if (play.roll.isFullHouse()) {
      return FULL_HOUSE_SCORE;
    }

    return INVALID_ASSIGNMENT_SCORE;
  }
}

class YahtzeeStrategy implements CategoryScoreStrategy {
  public calculate(play: PlayType): number {
    const YAHTZEE_SCORE = 50;
    const INVALID_ASSIGNMENT_SCORE = 0;

    if (play.roll.isYahtzee()) {
      return YAHTZEE_SCORE;
    }

    return INVALID_ASSIGNMENT_SCORE;
  }
}

class ScoreStrategyFactory {
  private readonly numberCategoryEquivalences = new NumberCategoryEquivalences();
  private readonly ofAKindEquivalences = new OfAKindCategoryEquivalences();

  private readonly numberCategories = [
    new Category('Ones'),
    new Category('Twos'),
    new Category('Threes'),
    new Category('Fours'),
    new Category('Fives'),
    new Category('Sixes'),
  ];

  private readonly ofAKindCategories = [
    new Category('Pair'),
    new Category('ThreeOfAKind'),
    new Category('FourOfAKind'),
  ];

  //TODO: Al recibir play estoy rompiendo la encapsulación que sucede en Plays
  public create(play: PlayType): CategoryScoreStrategy {
    if (this.numberCategories.find((category) => play.category.isEqual(category))) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return new NumberStrategy(this.numberCategoryEquivalences.byCategory(play.category)!);
    }

    if (play.category.isEqual(new Category('TwoPairs'))) {
      return new TwoPairsStrategy();
    }

    if (this.ofAKindCategories.find((category) => play.category.isEqual(category))) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return new OfAKindScoreStrategy(this.ofAKindEquivalences.byCategory(play.category)!);
    }

    if (play.category.isEqual(new Category('SmallStraight'))) {
      return new SmallStraightStrategy();
    }

    if (play.category.isEqual(new Category('LargeStraight'))) {
      return new LargeStraightStrategy();
    }

    if (play.category.isEqual(new Category('FullHouse'))) {
      return new FullHouseStrategy();
    }

    if (play.category.isEqual(new Category('Yahtzee'))) {
      return new YahtzeeStrategy();
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

  public findHighestRepeatedDice(repetitions: number): Dice | undefined {
    const uniqueRepeatedDice = this.dices.filter(
      (dice, index) => this.dices.indexOf(dice) !== index,
    );

    if (uniqueRepeatedDice.length === 0) return undefined;

    const setOfUniqueRepeatedDice = new Set(uniqueRepeatedDice);

    const matchedDiceWithRepetitions = Array.from(setOfUniqueRepeatedDice).filter((dice) => {
      return this.dices.filter((diceInRoll) => diceInRoll === dice).length === repetitions;
    });

    return Math.max(...matchedDiceWithRepetitions) as Dice;
  }

  public getTwoPairs(): Dice[] {
    const duplicates = this.dices.filter((dice, index) => this.dices.indexOf(dice) !== index);

    return duplicates;
  }

  private isEqual(roll: Roll): boolean {
    const rollSet = new Set(this.dices);
    const otherRollSet = new Set(roll.dices);

    if (rollSet.size !== otherRollSet.size) {
      return false;
    }

    for (const dice of rollSet) {
      if (!otherRollSet.has(dice)) {
        return false;
      }
    }

    return true;
  }

  //TODO: Puede ser más genérico tipo, dame una secuencia ascendente desde x hasta y
  public isSmallStraight(): boolean {
    const smallStraightSet = new Roll(1, 2, 3, 4, 5);

    return this.isEqual(smallStraightSet);
  }

  public isLargeStraight(): boolean {
    const largeStraightSet = new Roll(2, 3, 4, 5, 6);

    return this.isEqual(largeStraightSet);
  }

  public isFullHouse(): boolean {
    const THREE_OF_A_KIND_COUNT = 3;
    const PAIR_COUNT = 2;
    const counts = new Map<Dice, number>();

    for (const dice of this.dices) {
      counts.set(dice, (counts.get(dice) ?? 0) + 1);
    }

    const values = Array.from(counts.values());

    return values.includes(THREE_OF_A_KIND_COUNT) && values.includes(PAIR_COUNT);
  }

  public isYahtzee(): boolean {
    const [firstDice] = this.dices;

    return this.dices.every((dice) => dice === firstDice);
  }
}

export type PlayerType = string;

export class Player {
  private readonly type: PlayerType;

  public constructor(type: PlayerType) {
    this.type = type;
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

// No me termina de convencer tener todas las jugadas de todos los jugadores en el mismo sitio
// Se podría tener separado, esto es simplemente como lo he hecho pero es opinionated
class Plays {
  private readonly plays: PlayType[] = [];
  private readonly categoryScoreStrategyFactory = new ScoreStrategyFactory();

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

  public allPlayersHaveFinished(): boolean {
    const MAX_DIFFERENT_PLAYS_COUNT_PER_PLAYER = 14;

    const playerPlaysCount: {
      player: Player;
      count: number;
    }[] = [];

    for (const play of this.plays) {
      const playerAlreadyRegistered = playerPlaysCount.some((playerPlaysCount) =>
        playerPlaysCount.player.isEqual(play.player),
      );

      if (!playerAlreadyRegistered) {
        playerPlaysCount.push({ player: play.player, count: 1 });
        continue;
      }

      if (playerAlreadyRegistered) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const existingPlayerPlaysCount = playerPlaysCount.find((playerPlaysCount) =>
          playerPlaysCount.player.isEqual(play.player),
        )!;
        existingPlayerPlaysCount.count += 1;
        continue;
      }
    }

    return playerPlaysCount.every(
      (playerPlaysCount) => playerPlaysCount.count === MAX_DIFFERENT_PLAYS_COUNT_PER_PLAYER,
    );
  }

  public getScoreByPlayer(player: Player): number {
    const playsByPlayer = this.plays.filter((play) => play.player.isEqual(player));
    return playsByPlayer.reduce((totalScore, play) => {
      const categoryScoreStrategy = this.categoryScoreStrategyFactory.create(play);

      return totalScore + categoryScoreStrategy.calculate(play);
    }, 0);
  }
}

//Es como un agregado, el punto de entrada es PLAYS
// Plays > {
//   roll,
//   Category,
//   player,
// }[]

export class YahtzeeGame {
  private plays: Plays = new Plays();

  public assignPlay(play: PlayType): void {
    this.plays.addPlay(play);
  }

  public isFinished(): boolean {
    return this.plays.allPlayersHaveFinished();
  }

  public getScoreByPlayer(player: Player): number {
    return this.plays.getScoreByPlayer(player);
  }
}

export class CategoryAlreadyAssignedError extends Error {
  public constructor() {
    super(`Category has already been assigned.`);
    this.name = 'CategoryAlreadyAssignedError';
  }
}
