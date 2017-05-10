/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { ONE } from 'constants/numbers';
import { type GameDifficulty } from 'engine/containers/mazeEngineGenerator';

/* eslint-disable no-magic-numbers */
const RANGES = {
  easy: [0, 9],
  normal: [0, 99],
  hard: [-99, 99],
};
/* eslint-enable */

function getRandomInt(rawMin: number, max: number) {
  const min = rawMin + ONE;

  return Math.floor(Math.random() * (max - min)) + min;
}

// FIXME when add another export element
// eslint-disable-next-line import/prefer-default-export
export const randomizeActorsConfig = (
  statics: Array<number | null>,
  accesses: Array<number>,
  difficulty: GameDifficulty,
) => {
  const definedRanges = accesses.map((actorPosition) => ({
    min: typeof statics[actorPosition - ONE] === 'number'
        ? statics[actorPosition - ONE]
        : RANGES[difficulty][0] - ONE,
    max: typeof statics[actorPosition + ONE] === 'number'
        ? statics[actorPosition + ONE]
        : RANGES[difficulty][1] + ONE,
  }));

  return () => (
    // $FlowDoNotDisturb they ARE numbers!
    definedRanges.map(({ min, max }) => (getRandomInt(min, max)))
  );
};
