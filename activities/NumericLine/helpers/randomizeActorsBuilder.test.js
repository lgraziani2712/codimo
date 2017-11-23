/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, */
import randomizeActorsBuilder from './randomizeActorsBuilder';

const EASY = 'easy';

describe('NumericLine/helpers/randomizeActorsBuilder', () => {
  it('should return an appropriate number for each empty position on the numeric line', () => {
    const statics = [0, null, 5];
    const accesses = [1];
    const result = randomizeActorsBuilder(EASY, {
      statics,
      accesses,
    })();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(accesses.length);
    expect(result[0]).toBeGreaterThan(statics[0]);
    expect(result[0]).toBeLessThan(statics[2]);
  });
  it('should always return the same number if the diff between min and max is eq 2', () => {
    const statics = [1, null, 3, null, 5];
    const accesses = [1, 3];
    const result = randomizeActorsBuilder(EASY, {
      statics,
      accesses,
    })();

    expect(result[0]).toBe(statics[0] + 1);
    expect(result[1]).toBe(statics[4] - 1);
  });
  it('should work as expected when the `null` are defined at first and last position', () => {
    const statics = [null, 5, null];
    const accesses = [0, 2];
    const result = randomizeActorsBuilder(EASY, {
      statics,
      accesses,
    })();

    expect(typeof result[0]).toBe('number');
    expect(typeof result[1]).toBe('number');
  });
});
