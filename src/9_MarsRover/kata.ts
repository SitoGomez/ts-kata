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

export class Rover {
  private readonly commanParser = new CommandParser();
  private readonly rotationMechanism = new RotationMechanism();

  public execute(input: string): string {
    const { position, plateau, startingX, startingY, startingDirection, commands, command } =
      this.commanParser.parse(input);

    if (!commands) {
      return position;
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
