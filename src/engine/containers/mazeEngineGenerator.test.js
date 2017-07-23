/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import gameMetadataDataWithoutBlocks from 'test/gameMetadataDataWithoutBlocks.json';
import * as actionNames from 'constants/instructions';

import mazeEngineGenerator from './mazeEngineGenerator';

const { mazeData, numericLineData, difficulty } = gameMetadataDataWithoutBlocks;

mazeData.path = new Map(mazeData.path);

describe('engine > containers > mazeEngineGenerator', () => {
  it('should parse an array of correct `instructions` and return a response', async () => {
    const mazeEngine = mazeEngineGenerator(mazeData, numericLineData, difficulty);
    const instructions = [
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_FORWARD,
      actionNames.LEAVE_MAZE,
    ];

    try {
      await mazeEngine.excecuteSetOfInstructions(instructions);
    } catch (error) {
      expect(error.name).toBe('MazeExitError');
      expect(error.text).toMatchSnapshot();

      return;
    }
    expect('true').toBe('not evaluated');
  });
  it('should throw a MazePathError if a wall is between valid paths', async () => {
    const newMazeData = {
      ...mazeData,
      path: new Map([['0,0', {}], ['1,0', {}]]),
      access: '0,0',
      exits: ['1,0'],
      actorExitIdx: 0,
    };
    const newNumericLineData = {
      statics: [null, 6, 9],
      accesses: [0],
    };
    const mazeEngine = mazeEngineGenerator(newMazeData, newNumericLineData, difficulty);
    const instructions = [
      actionNames.MOVE_RIGHT,
    ];

    try {
      await mazeEngine.excecuteSetOfInstructions(instructions);
    } catch (error) {
      expect(error.name).toBe('MazePathError');
      expect(error.text).toMatchSnapshot();

      return;
    }
    expect('true').toBe('not evaluated');
  });
  it('should be possible to create a maze with 1-actor:n-exits', async () => {
    const newMazeData = {
      ...mazeData,
      path: new Map([['0,0', {}], ['1,0', {}]]),
      access: '0,0',
      exits: ['1,0'],
      actorExitIdx: 0,
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
      ...mazeData,
      path: new Map([
        ['0,0', { right: true }],
        ['1,0', { left: true }],
      ]),
      access: '0,0',
      exits: ['1,0', '1,1'],
      actorExitIdx: 1,
    };
    const newNumericLineData = {
      statics: [null, 6, null],
      accesses: [0, 1],
    };
    const mazeEngine = mazeEngineGenerator(newMazeData, newNumericLineData, difficulty);
    const instructions = [
      actionNames.MOVE_RIGHT,
      actionNames.LEAVE_MAZE,
    ];

    try {
      await mazeEngine.excecuteSetOfInstructions(instructions);
    } catch (error) {
      expect(error.name).toBe('MazeWrongExitError');
      expect(error.text).toMatchSnapshot();

      return;
    }
    expect('true').toBe('not evaluated');
  });
  it('should throw a MazeStarvationError if the actor doesn\'t leaves', async () => {
    const newMazeData = {
      ...mazeData,
      path: new Map([
        ['0,0', { right: true }],
        ['1,0', { left: true }],
      ]),
      access: '0,0',
      exits: ['1,0', '1,1'],
      actorExitIdx: 1,
    };
    const newNumericLineData = {
      statics: [null, 6, null],
      accesses: [0, 1],
    };
    const mazeEngine = mazeEngineGenerator(newMazeData, newNumericLineData, difficulty);
    const instructions = [
      actionNames.MOVE_RIGHT,
    ];

    try {
      await mazeEngine.excecuteSetOfInstructions(instructions);
    } catch (error) {
      expect(error.name).toBe('MazeStarvationError');
      expect(error.text).toMatchSnapshot();

      return;
    }
    expect('true').toBe('not evaluated');
  });
});
