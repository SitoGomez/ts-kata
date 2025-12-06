import { Rover } from './kata';

describe('Rover should', () => {
  describe('Acceptabce tests', () => {
    test('turn 360 degrees clokwise while moving around the plateau', () => {
      const commands = '5 5\n1 2 N\nLMLMLMLMM';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 3 N');
    });

    test('turn 360 degrees counter-clokwise while moving around the plateau', () => {
      const commands = '5 5\n3 3 E\nMMRMMRMRRM';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('5 1 E');
    });
  });

  describe('When the rover command sequence is empty', () => {
    it('then the rover should stay in the same position facing the same direction', () => {
      const commands = '5 5\n1 2 N\n';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 N');
    });
  });

  describe('When the rover is facing North and receives an L command', () => {
    it('then the rover should face West', () => {
      const commands = '5 5\n1 2 N\nL';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 W');
    });
  });

  describe('When the rover is facing North and receives an R command', () => {
    it('then the rover should face East', () => {
      const commands = '5 5\n1 2 N\nR';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 E');
    });
  });

  describe('When the rover is facing East and receives an R command', () => {
    it('then the rover should face South', () => {
      const commands = '5 5\n1 2 E\nR';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 S');
    });
  });

  describe('When the rover is facing East and receives an L command', () => {
    it('then the rover should face North', () => {
      const commands = '5 5\n1 2 E\nL';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 N');
    });
  });

  describe('When the rover is facing South and receives an R command', () => {
    it('then the rover should face West', () => {
      const commands = '5 5\n1 2 S\nR';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 W');
    });
  });

  describe('When the rover is facing South and receives an L command', () => {
    it('then the rover should face East', () => {
      const commands = '5 5\n1 2 S\nL';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 E');
    });
  });

  describe('When the rover is facing West and receives an R command', () => {
    it('then the rover should face North', () => {
      const commands = '5 5\n1 2 W\nR';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 N');
    });
  });

  describe('When the rover is facing West and receives an L command', () => {
    it('then the rover should face South', () => {
      const commands = '5 5\n1 2 W\nL';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 S');
    });
  });

  describe('When the rover is facing North and receives an RR command', () => {
    it('then the rover should face South', () => {
      const commands = '5 5\n1 2 N\nRR';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 S');
    });
  });

  describe('When the rover is facing North and receives an LL command', () => {
    it('then the rover should face South', () => {
      const commands = '5 5\n1 2 N\nLL';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 S');
    });
  });

  describe('When the rover is facing East and receives an RR command', () => {
    it('then the rover should face West', () => {
      const commands = '5 5\n1 2 E\nRR';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 W');
    });
  });

  describe('When the rover is facing East and receives an LL command', () => {
    it('then the rover should face West', () => {
      const commands = '5 5\n1 2 E\nLL';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 W');
    });
  });

  describe('When the rover is facing South and receives an RR command', () => {
    it('then the rover should face North', () => {
      const commands = '5 5\n1 2 S\nRR';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 N');
    });
  });

  describe('When the rover is facing South and receives an LL command', () => {
    it('then the rover should face North', () => {
      const commands = '5 5\n1 2 S\nLL';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 N');
    });
  });

  describe('When the rover is facing West and receives an RR command', () => {
    it('then the rover should face East', () => {
      const commands = '5 5\n1 2 W\nRR';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 E');
    });
  });

  describe('When the rover is facing West and receives an LL command', () => {
    it('then the rover should face East', () => {
      const commands = '5 5\n1 2 W\nLL';
      const rover = new Rover();

      const position = rover.execute(commands);

      expect(position).toBe('1 2 E');
    });
  });
});
