/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { ONE } from 'core/constants/numbers';
import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';
import { getRandomInt } from 'core/helpers/randomizers';

import { type EngineData$NumericLineData } from '../engine/components/numericLineGenerator';

/* eslint-disable no-magic-numbers */
const RANGES = {
  easy: [0, 9],
  normal: [0, 99],
  hard: [-99, 99],
};
/* eslint-enable */

/**
 * It generate an array of possible number for a given difficulty,
 * accesses and the range between each access.
 *
 * @version 1.0.0
 * @param {GameDifficulty} difficulty Determines which range limits use.
 * @param {Array<number | void>} statics Defines the range for each empty slot.
 * @param {Array<string>} accesses Defines wich slots are empty.
 * @return {Function<Array<number>>} The new randomizer.
 */
const randomizeActorsBuilder = (
  difficulty: GameDifficulty,
  { statics, accesses }: EngineData$NumericLineData,
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
    definedRanges.map(({ min, max }) => (getRandomInt(min + ONE, max)))
  );
};

export default randomizeActorsBuilder;
