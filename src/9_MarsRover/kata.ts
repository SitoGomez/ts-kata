export class Rover {
  //TODO: Extract first class
  private readonly directions = new Map<string, string>([
    ['NR', 'E'],
    ['NL', 'W'],
    ['ER', 'S'],
    ['EL', 'N'],
    ['SR', 'W'],
    ['SL', 'E'],
    ['WR', 'N'],
    ['WL', 'S'],
  ]);

  //TODO: Split S - SOLID
  public execute(input: string): string {
    const [_plateau, position, inputCommands] = input.split('\n');

    const [x, y, startingDirection] = position.split(' ');
    const originalDirection = startingDirection;
    const command = inputCommands?.split('')[0];

    if (!inputCommands) {
      return position!;
    }

    const key = originalDirection! + command!;

    const finalDirection = this.directions.get(key)!;

    if (inputCommands?.length > 1) {
      return this.execute(`${_plateau}\n${x} ${y} ${finalDirection}\n${inputCommands?.slice(1)}`);
    }

    return `${x} ${y} ${finalDirection}`;
  }
}
