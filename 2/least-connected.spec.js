const LeastConnected = require('./least-connected.js');

jest.useFakeTimers();

describe('LeastConnected', () => {
  let loadBalancer;
  beforeEach(() => {
    loadBalancer = new LeastConnected(['X', 'Y', 'Z']);
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

    describe('given that server Z has been released many times at once', () => {
      beforeEach(() => {
        Array.from(Array(3 * 5)).forEach(() => {
          loadBalancer.next();
        });
        loadBalancer.release('Z');
        loadBalancer.release('Z');
      });

      it('counts connections per server', () => {
        expect(loadBalancer.servers).toEqual({ X: 5, Y: 5, Z: 3 });
      });

      it('returns server Z two times in succession', () => {
        expect([loadBalancer.next(), loadBalancer.next()]).toEqual(['Z', 'Z']);
      });

      describe('once all timeouts have passed', () => {
        beforeEach(() => {
          jest.runAllTimers();
        });

        it('releases all connections', () => {
          expect(loadBalancer.servers).toEqual({ X: 0, Y: 0, Z: 0 });
        });
      });
    });
  });
});
