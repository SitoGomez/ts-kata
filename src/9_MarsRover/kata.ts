const Directions = {
  N: 'N',
  E: 'E',
  S: 'S',
  W: 'W',
} as const;

type Direction = keyof typeof Directions;

export const RotationDirections = {
  R: 'R',
  L: 'L',
} as const;

type RotationDirection = keyof typeof RotationDirections;

const Commands = {
  ...RotationDirections,
  M: 'M',
} as const;

type Command = keyof typeof Commands;

export class CommandParser {
  public parse(input: string): {
    startingX: number;
    startingY: number;
    currentDirection: Direction;
    commandsSequence: string;
    nextCommand: Command;
  } {
    const [_, position, inputCommands] = input.split('\n');

    const [x, y, originalDirection] = position.split(' ');
    const command = inputCommands?.split('')[0];

    return {
      startingX: Number(x),
      startingY: Number(y),
      currentDirection: originalDirection!,
      commandsSequence: inputCommands!,
      nextCommand: command!,
    };
  }
}

interface MovementStrategy {
  move(x: number, y: number): [number, number];
}

class NorthMovementStrategy implements MovementStrategy {
  public move(x: number, y: number): [number, number] {
    return [x, y + 1];
  }
}

class SouthMovementStrategy implements MovementStrategy {
  public move(x: number, y: number): [number, number] {
    return [x, y - 1];
  }
}

class EastMovementStrategy implements MovementStrategy {
  public move(x: number, y: number): [number, number] {
    return [x + 1, y];
  }
}

class WestMovementStrategy implements MovementStrategy {
  public move(x: number, y: number): [number, number] {
    return [x - 1, y];
  }
}

class MovementStrategyFactory {
  public static getStrategy(direction: Direction): MovementStrategy {
    switch (direction) {
      case Directions.N:
        return new NorthMovementStrategy();
      case Directions.S:
        return new SouthMovementStrategy();
      case Directions.E:
        return new EastMovementStrategy();
      case Directions.W:
        return new WestMovementStrategy();
      default:
        throw new Error('Invalid direction');
    }
  }
}

//TODO: COMMAND PATTERN M | R | L
//TODO: STATE PATTERN FOR ROTATION
//TODO: Una estrategia es un algoritmo (ex: calcular score) que puede tener diferentes implementaciones pero al final del día, todos cumplen la misma función
//TODO: Head first design patterns
// Estos patrones es un poco de sobreingeniería. Tenedlo en cuenta porque si esto no cambia
// esta solución es correcta

interface RotationMechanism {
  rotate(rotationDirection: RotationDirection): RotationMechanism;
  direction(): Direction;
}

/**
 * clase VendingMachine
 * state: Idle | HasMoney | Dispensing | ProductDoesntExist | ProductSelected
 *
 * methods: insertMoney(Coin), selectProduct, dispenseProduct, refundMoney
 */

class NorthDirection implements RotationMechanism {
  public rotate(rotationDirection: RotationDirection): RotationMechanism {
    if (rotationDirection === RotationDirections.L) {
      return this.rotateLeft();
    }

    if (rotationDirection === RotationDirections.R) {
      return this.rotateRight();
    }

    throw new Error('Invalid rotation direction');
  }

  public direction(): Direction {
    return Directions.N;
  }

  private rotateLeft(): RotationMechanism {
    return new WestDirection();
  }

  private rotateRight(): RotationMechanism {
    return new EastDirection();
  }
}

class EastDirection implements RotationMechanism {
  public rotate(rotationDirection: RotationDirection): RotationMechanism {
    if (rotationDirection === RotationDirections.L) {
      return this.rotateLeft();
    }

    if (rotationDirection === RotationDirections.R) {
      return this.rotateRight();
    }

    throw new Error('Invalid rotation direction');
  }

  public direction(): Direction {
    return Directions.E;
  }

  private rotateLeft(): RotationMechanism {
    return new NorthDirection();
  }

  private rotateRight(): RotationMechanism {
    return new SouthDirection();
  }
}

class SouthDirection implements RotationMechanism {
  public rotate(rotationDirection: RotationDirection): RotationMechanism {
    if (rotationDirection === RotationDirections.L) {
      return this.rotateLeft();
    }

    if (rotationDirection === RotationDirections.R) {
      return this.rotateRight();
    }

    throw new Error('Invalid rotation direction');
  }

  public direction(): Direction {
    return Directions.S;
  }

  private rotateLeft(): RotationMechanism {
    return new EastDirection();
  }

  private rotateRight(): RotationMechanism {
    return new WestDirection();
  }
}

class WestDirection implements RotationMechanism {
  public rotate(rotationDirection: RotationDirection): RotationMechanism {
    if (rotationDirection === RotationDirections.L) {
      return this.rotateLeft();
    }

    if (rotationDirection === RotationDirections.R) {
      return this.rotateRight();
    }

    throw new Error('Invalid rotation direction');
  }

  public direction(): Direction {
    return Directions.W;
  }

  private rotateLeft(): RotationMechanism {
    return new SouthDirection();
  }

  private rotateRight(): RotationMechanism {
    return new NorthDirection();
  }
}

class RotationMechanismFactory {
  public static getRotationMechanism(direction: Direction): RotationMechanism {
    switch (direction) {
      case Directions.N:
        return new NorthDirection();
      case Directions.E:
        return new EastDirection();
      case Directions.S:
        return new SouthDirection();
      case Directions.W:
        return new WestDirection();
      default:
        throw new Error('Invalid direction');
    }
  }
}

interface RoverCommand {
  execute(rover: Rover): void;
}

class MoveCommand implements RoverCommand {
  public execute(rover: Rover): void {
    rover.move();
  }
}

class RotateCommand implements RoverCommand {
  private readonly rotationDirection: RotationDirection;

  public constructor(rotationDirection: RotationDirection) {
    this.rotationDirection = rotationDirection;
  }

  public execute(rover: Rover): void {
    rover.rotate(this.rotationDirection);
  }
}

class RoverCommandFactory {
  public static getCommand(command: Command): RoverCommand {
    if (command === Commands.M) {
      return new MoveCommand();
    }

    if (command === Commands.L || command === Commands.R) {
      return new RotateCommand(command);
    }

    throw new Error('Invalid command');
  }
}

class Rover {
  private startingX: number;
  private startingY: number;
  private currentDirection: Direction;

  public constructor(
    startingX: number,
    startingY: number,
    currentDirection: Direction = Directions.N,
  ) {
    this.startingX = startingX;
    this.startingY = startingY;
    this.currentDirection = currentDirection;
  }

  public rotate(rotationDirection: RotationDirection): void {
    const updatedDirection = RotationMechanismFactory.getRotationMechanism(
      this.currentDirection,
    ).rotate(rotationDirection);

    this.currentDirection = updatedDirection.direction();
  }

  public move(): void {
    const movementStrategy = MovementStrategyFactory.getStrategy(this.currentDirection);

    const [finalX, finalY] = movementStrategy.move(Number(this.startingX), Number(this.startingY));

    this.startingX = finalX;
    this.startingY = finalY;
  }

  public currentCoordinates(): string {
    return `${this.startingX} ${this.startingY} ${this.currentDirection}`;
  }
}

/**
 * DI
 */
export class RoverController {
  private readonly commanParser = new CommandParser();
  private rover: Rover | undefined;

  public execute(input: string): string {
    const { startingX, startingY, currentDirection, commandsSequence } =
      this.commanParser.parse(input);

    this.rover = new Rover(startingX, startingY, currentDirection);

    commandsSequence.split('').forEach((command: Command) => {
      const roverCommand = RoverCommandFactory.getCommand(command);
      roverCommand.execute(this.rover!);
    });

    return this.rover.currentCoordinates();
  }
}
