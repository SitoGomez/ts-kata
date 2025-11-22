import { Stack } from './kata';

describe('Given a stack', () => {
  describe('When the stack is empty', () => {
    it('then it should fail', () => {
      const instance = new Stack();

      expect(() => instance.pop()).toThrow('Stack is empty');
    });
  });

  describe('When adding a new element', () => {
    it('then it should return the last pushed item', () => {
      const instance = new Stack();
      instance.push(1);

      expect(instance.pop()).toBe(1);
    });
  });

  describe('When adding one element to a non empty stack', () => {
    it('then it should return the last pushed item', () => {
      const instance = new Stack();
      instance.push(1);
      instance.push(2);

      expect(instance.pop()).toBe(2);
      expect(instance.pop()).toBe(1);
    });
  });
});
