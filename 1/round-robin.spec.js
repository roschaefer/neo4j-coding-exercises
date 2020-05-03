const RoundRobin = require('./round-robin.js');

describe('RoundRobin', () => {
  let loadBalancer;
  beforeEach(() => {
    loadBalancer = new RoundRobin(['X', 'Y', 'Z']);
  });

  describe('next', () => {
    describe('given 4 consecutive calls of `next()`', () => {
      let output;
      beforeEach(() => {
        output = [
          loadBalancer.next(),
          loadBalancer.next(),
          loadBalancer.next(),
          loadBalancer.next(),
        ];
      });

      it('outputs each server', () => {
        expect(output).toContain('X', 'Y', 'Z');
      });

      it('starts over with first server', () => {
        expect(output).toEqual(['X', 'Y', 'Z', 'X']);
      });
    });
  });
});
