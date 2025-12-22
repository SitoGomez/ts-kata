const Directions = {
  N: 'N',
  E: 'E',
  S: 'S',
  W: 'W',
} as const;

type Direction = keyof typeof Directions;

const RotationDirections = {
  R: 'R',
  L: 'L',
};

type RotationDirection = keyof typeof RotationDirections;

const Commands = RotationDirections && {
  M: 'M',
};

type Command = keyof typeof Commands;

export class CommandParser {
  public parse(input: string): {
    plateau: string;
    currentPosition: string;
    startingX: string;
    startingY: string;
    currentDirection: Direction;
    commandsSequence: string;
    nextCommand: Command;
  } {
    const [plateau, position, inputCommands] = input.split('\n');

    const [x, y, originalDirection] = position.split(' ');
    const command = inputCommands?.split('')[0];

    return {
      plateau,
      currentPosition: position,
      startingX: x,
      startingY: y,
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

export class Rover {
  private readonly commanParser = new CommandParser();

  public execute(input: string): string {
    const {
      currentPosition,
      plateau,
      startingX,
      startingY,
      currentDirection,
      commandsSequence,
      nextCommand,
    } = this.commanParser.parse(input);

    this.currentRoverDirection = currentDirection;

    if (!commandsSequence) {
      return currentPosition;
    }

    if (nextCommand === Commands.M) {
      const movementStrategy = MovementStrategyFactory.getStrategy(currentDirection);

      const [finalX, finalY] = movementStrategy.move(Number(startingX), Number(startingY));

      return `${finalX} ${finalY} ${currentDirection}`;
    }

    const anotherFinalDirection = RotationMechanismFactory.getRotationMechanism(
      currentDirection,
    ).rotate(nextCommand as RotationDirection);

    if (commandsSequence?.length > 1) {
      return this.execute(
        `${plateau}\n${startingX} ${startingY} ${anotherFinalDirection.direction()}\n${commandsSequence?.slice(1)}`,
      );
    }

    return `${startingX} ${startingY} ${anotherFinalDirection.direction()}`;
  }
}
