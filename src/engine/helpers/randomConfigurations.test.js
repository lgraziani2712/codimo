/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, */
import { randomizeActorsConfig } from './randomConfigurations';

describe('helpers/randomConfigurations', () => {
  describe('randomizeActorConfig', () => {
    it('should return an appropriate number for each empty position on the numeric line', () => {
      const numericLine = [0, null, 5];
      const accesses = [1];
      const result = randomizeActorsConfig(numericLine, accesses)();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(accesses.length);
      expect(result[0]).toBeGreaterThan(numericLine[0]);
      expect(result[0]).toBeLessThan(numericLine[2]);
    });
    it('should always return the same number if the diff between min and max is eq 2', () => {
      const numericLine = [1, null, 3, null, 5];
      const accesses = [1, 3];
      const result = randomizeActorsConfig(numericLine, accesses)();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(accesses.length);
      expect(result[0]).toBe(numericLine[0] + 1);
      expect(result[1]).toBe(numericLine[4] - 1);
    });
  });
});
