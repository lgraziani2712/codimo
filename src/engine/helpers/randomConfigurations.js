/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { ONE } from 'constants/numbers';

function getRandomInt(rawMin: number, max: number) {
  const min = rawMin + ONE;

  return Math.floor(Math.random() * (max - min)) + min;
}

// FIXME when add another export element
// eslint-disable-next-line import/prefer-default-export
export const randomizeActorsConfig = (statics: Array<number | null>, accesses: Array<number>) => {
  const definedRanges = accesses.map((actorPosition) => ({
    min: statics[actorPosition - ONE],
    max: statics[actorPosition + ONE],
  }));

  return () => (
    // $FlowDoNotDisturb it will NEVER receive nulls from definedRanges!
    definedRanges.map(({ min, max }) => (getRandomInt(min, max)))
  );
};
