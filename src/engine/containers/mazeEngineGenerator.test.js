/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import mazeData from 'test/mazeData.json';
import { blockNames } from 'blockly/constants';

import mazeEngineGenerator from './mazeEngineGenerator';

const ACTOR = 0;
const ONE = 1;
const TWO = 2;

describe('engine > containers > mazeEngineGenerator', () => {
  it('should parse an array of correct actions and return a response', async () => {
    const mazeEngine = mazeEngineGenerator(mazeData);
    const actions = new Map();

    actions.set(ACTOR, [
      blockNames.MOVE_FORWARD,
      blockNames.MOVE_FORWARD,
    ]);

    try {
      await mazeEngine.excecuteSetOfInstructions(actions);
    } catch (errors) {
      const error = errors[0];

      expect(errors.length).toBe(ONE);
      expect(error.actor).toBe(ACTOR);
      expect(error.name).toBe('MazeExitError');
      expect(error.message).toMatchSnapshot();
    }
  });
  it('should throw a path Error for ACTOR 1 but exit error for ACTOR 2', async () => {
    const ACTOR2 = ONE;
    const newMazeData = {
      ...mazeData,
      accesses: [mazeData.accesses[0], mazeData.accesses[0]],
      exits: [mazeData.exits[0], mazeData.exits[0]],
      numbers: {
        ...mazeData.numbers,
        actors: [mazeData.numbers.actors[0], ACTOR2],
      },
    };
    const mazeEngine = mazeEngineGenerator(newMazeData);
    const actions = new Map();

    actions.set(ACTOR, [
      blockNames.MOVE_LEFT,
    ]);
    actions.set(ACTOR2, [
      blockNames.MOVE_FORWARD,
      blockNames.MOVE_FORWARD,
    ]);

    try {
      await mazeEngine.excecuteSetOfInstructions(actions);
    } catch (errors) {
      expect(errors).toBeInstanceOf(Array);
      expect(errors.length).toBe(TWO);
    }
  });
});
