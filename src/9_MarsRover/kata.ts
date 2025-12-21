type Direction = 'N' | 'E' | 'S' | 'W';
type RotationDirection = 'R' | 'L';
type RotationMovement = `${Direction}${RotationDirection}`;

class RotationMechanism {
  private readonly rotationMapping = new Map<RotationMovement, Direction>([
    ['NR', 'E'],
    ['NL', 'W'],
    ['ER', 'S'],
    ['EL', 'N'],
    ['SR', 'W'],
    ['SL', 'E'],
    ['WR', 'N'],
    ['WL', 'S'],
  ]);

  public calculateNewDirection(
    startingDirection: Direction,
    rotationMovement: RotationDirection,
  ): Direction {
    const key: RotationMovement = `${startingDirection}${rotationMovement}`;

    return this.rotationMapping.get(key)!;
  }
}

export class CommandParser {
  public parse(input: string): {
    plateau: string;
    position: string;
    startingX: string;
    startingY: string;
    startingDirection: string;
    commands: string;
    command: string;
  } {
    const [plateau, position, inputCommands] = input.split('\n');

    const [x, y, originalDirection] = position.split(' ');
    const command = inputCommands?.split('')[0];

    return {
      plateau,
      position,
      startingX: x,
      startingY: y,
      startingDirection: originalDirection!,
      commands: inputCommands!,
      command: command!,
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
      case 'N':
        return new NorthMovementStrategy();
      case 'S':
        return new SouthMovementStrategy();
      case 'E':
        return new EastMovementStrategy();
      case 'W':
        return new WestMovementStrategy();
      default:
        throw new Error('Invalid direction');
    }
  }
}

//TODO: COMMAND PATTERN M | R | L
//TODO: STATE PATTERN FOR ROTATION
//TODO: Una estrategia es un algoritmo que puede variar
//TODO: Head first design patterns
// Estos patrones es un poco de sobreingeniería. Tenedlo en cuenta porque si esto no cambia
// esta solución es correcta

// Example of State Pattern
// interface Direction {
//   left(): Direction;
//   right(): Direction;
// }

// class North implements Direction {
//   left(): Direction {
//     return new West();
//   }
//   right(): Direction {
//     return new East();
//   }
// }

export class Rover {
  private readonly commanParser = new CommandParser();
  private readonly rotationMechanism = new RotationMechanism();
  private currentRoverDirection: Direction | undefined;

  public execute(input: string): string {
    const { position, plateau, startingX, startingY, startingDirection, commands, command } =
      this.commanParser.parse(input);

    this.currentRoverDirection = startingDirection as Direction;

    if (!commands) {
      return position;
    }

    if (command === 'M') {
      const movementStrategy = MovementStrategyFactory.getStrategy(this.currentRoverDirection);

      const [finalX, finalY] = movementStrategy.move(Number(startingX), Number(startingY));

      return `${finalX} ${finalY} ${this.currentRoverDirection}`;
    }

    const anotherFinalDirection = this.rotationMechanism.calculateNewDirection(
      startingDirection as Direction,
      command as RotationDirection,
    );

    if (commands?.length > 1) {
      return this.execute(
        `${plateau}\n${startingX} ${startingY} ${anotherFinalDirection}\n${commands?.slice(1)}`,
      );
    }

    return `${startingX} ${startingY} ${anotherFinalDirection}`;
  }
}
