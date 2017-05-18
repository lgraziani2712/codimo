/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import gameMetadataDataWithoutBlocks from 'test/gameMetadataDataWithoutBlocks.json';
import * as actionNames from 'constants/actions';

import mazeEngineGenerator from './mazeEngineGenerator';

const ACTOR = 0;
const ONE = 1;
const TWO = 2;
const { mazeData, numericLineData, difficulty } = gameMetadataDataWithoutBlocks;

mazeData.path = new Map(mazeData.path);

describe('engine > containers > mazeEngineGenerator', () => {
  it('should parse an array of correct actions and return a response', async () => {
    const mazeEngine = mazeEngineGenerator(mazeData, numericLineData, difficulty);
    const actions = new Map();

    actions.set(ACTOR, [
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_FORWARD,
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
      actorsPositions: [
        [0, 0],
        [1, 1],
      ],
    };
    const newNumericLineData = {
      statics: [1, null, 5, null, 9],
      accesses: [1, 3],
    };
    const mazeEngine = mazeEngineGenerator(newMazeData, newNumericLineData, difficulty);
    const actions = new Map();

    actions.set(ACTOR, [
      actionNames.MOVE_LEFT,
    ]);
    actions.set(ACTOR2, [
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_FORWARD,
    ]);

    try {
      await mazeEngine.excecuteSetOfInstructions(actions);
    } catch (errors) {
      expect(errors).toBeInstanceOf(Array);
      expect(errors.length).toBe(TWO);
      expect(errors[0].name).toBe('MazePathError');
      expect(errors[1].name).toBe('MazeExitError');
    }
  });
  it('should throw a MazePathError if a wall is between valid paths', async () => {
    const newMazeData = {
      canvas: { height: 500, width: 450 },
      width: 5,
      height: 5,
      margin: 10,
      size: 64,
      path: new Map([['0,0', {}], ['1,0', {}]]),
      accesses: ['0,0'],
      exits: ['1,0'],
      actorsPositions: [[0, 0]],
    };
    const newNumericLineData = {
      statics: [null, 6, 9],
      accesses: [0],
    };
    const mazeEngine = mazeEngineGenerator(newMazeData, newNumericLineData, difficulty);
    const actions = new Map();

    actions.set(ACTOR, [
      actionNames.MOVE_RIGHT,
    ]);

    try {
      await mazeEngine.excecuteSetOfInstructions(actions);
    } catch (errors) {
      expect(errors).toBeInstanceOf(Array);
      expect(errors.length).toBe(ONE);
      expect(errors[0].name).toBe('MazePathError');

      return;
    }
    expect('true').toBe('not evaluated');
  });
  it('should be possible to create a maze with 1-actor:n-exits', async () => {
    const newMazeData = {
      canvas: { height: 500, width: 450 },
      width: 5,
      height: 5,
      margin: 10,
      size: 64,
      path: new Map([['0,0', {}], ['1,0', {}]]),
      accesses: ['0,0'],
      exits: ['1,0'],
      actorsPositions: [[0, 0]],
    };
    const newNumericLineData = {
      statics: [null, 6, null],
      accesses: [0, 1],
    };
    const mazeEngine = mazeEngineGenerator(newMazeData, newNumericLineData, difficulty);

    expect(mazeEngine).not.toBeUndefined();
  });
  it('should throw a MazeWrongExitError if the actor leaves at the wrong exit', async () => {
    const newMazeData = {
      canvas: { height: 500, width: 450 },
      width: 5,
      height: 5,
      margin: 10,
      size: 64,
      path: new Map([
        ['0,0', { right: true }],
        ['1,0', { left: true }],
      ]),
      accesses: ['0,0'],
      exits: ['1,0', '1,1'],
      actorsPositions: [
        [0, 1],
      ],
    };
    const newNumericLineData = {
      statics: [null, 6, null],
      accesses: [0, 1],
    };
    const mazeEngine = mazeEngineGenerator(newMazeData, newNumericLineData, difficulty);
    const actions = new Map();

    actions.set(ACTOR, [
      actionNames.MOVE_RIGHT,
    ]);

    try {
      await mazeEngine.excecuteSetOfInstructions(actions);
    } catch (errors) {
      expect(errors).toBeInstanceOf(Array);
      expect(errors.length).toBe(ONE);
      expect(errors[0].name).toBe('MazeWrongExitError');

      return;
    }
    expect('true').toBe('not evaluated');
  });
});
