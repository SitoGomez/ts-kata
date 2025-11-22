export class Stack {
  private items: number[] = [];

  public push(item: number): void {
    this.items.push(item);
  }

  public pop(): number {
    if (this.items.length === 0) {
      throw new Error('Stack is empty');
    }

    const item = this.items.pop();

    if (item !== undefined) {
      return item;
    }

    return 0;
  }
}
