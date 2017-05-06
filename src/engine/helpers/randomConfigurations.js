/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { ONE } from 'constants/numbers';

const MIN = 0;
const MAX = 9;

function getRandomInt(rawMin: number, max: number) {
  const min = rawMin + ONE;

  return Math.floor(Math.random() * (max - min)) + min;
}

// FIXME when add another export element
// eslint-disable-next-line import/prefer-default-export
export const randomizeActorsConfig = (statics: Array<number | null>, accesses: Array<number>) => {
  const definedRanges = accesses.map((actorPosition) => ({
    min: typeof statics[actorPosition - ONE] === 'number' ? statics[actorPosition - ONE] : MIN - ONE,
    max: typeof statics[actorPosition + ONE] === 'number' ? statics[actorPosition + ONE] : MAX + ONE,
  }));

  return () => (
    // $FlowDoNotDisturb they ARE numbers!
    definedRanges.map(({ min, max }) => (getRandomInt(min, max)))
  );
};
