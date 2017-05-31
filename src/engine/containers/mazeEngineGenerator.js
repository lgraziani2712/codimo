/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { ZERO, ONE, HALF } from 'constants/numbers';
import { type Instructions } from 'blockly/executorGenerator';
import { MOVE_FORWARD, MOVE_RIGHT, MOVE_BACKWARD, MOVE_LEFT, LEAVE_MAZE } from 'constants/instructions';
import mazeGenerator, { type MazeData, type Maze } from 'engine/components/mazeGenerator';
import numberGenerator, {
  START_STATE,
  STOP_STATE,
  type NumberActor,
} from 'engine/components/numberGenerator';
import numericLineGenerator, {
  type NumericLineData,
  type NumericLine,
} from 'engine/components/numericLineGenerator';
import {
  MazeExitError,
  MazePathError,
  MazePathOverflow,
  MazeStarvationError,
  MazeWrongExitError,
} from 'engine/helpers/errors';
import randomizeActorsConfig from 'engine/helpers/randomizeActorsConfig';

const numberHasLeftMazeConfig = (
  mazeData: MazeData,
  numericLineData: NumericLineData,
  numericLine: NumericLine,
  number: NumberActor,
) => async (): Promise<void> => {
  const exitIdx = mazeData.exits.indexOf(number.position);

  if (exitIdx === -ONE) {
    throw new MazeExitError();
  }

  const exit = mazeData.exits[exitIdx];

  await numericLine.receiveNumberAtPosition(number, numericLineData.accesses[exitIdx]);

  if (exit !== number.finalPosition) {
    number.beSad(START_STATE);
    numericLine.beSad(START_STATE);

    throw new MazeWrongExitError();
  }

  number.beHappy(START_STATE);
  numericLine.beHappy(START_STATE);
};
/* eslint-disable camelcase */
const directions = {
  [MOVE_FORWARD]: [ZERO, -ONE],
  [MOVE_RIGHT]: [ONE, ZERO],
  [MOVE_BACKWARD]: [ZERO, ONE],
  [MOVE_LEFT]: [-ONE, ZERO],
};
const directionsToWalls = {
  [MOVE_FORWARD]: 'top',
  [MOVE_RIGHT]: 'right',
  [MOVE_BACKWARD]: 'bottom',
  [MOVE_LEFT]: 'left',
};
/* eslint-enable */

const excecuteSetOfInstructionsConfig = (
  mazeData: MazeData,
  number: NumberActor,
  numberHasLeft: () => Promise<void>,
  /**
   * This is the engine's main function. It will execute every instruction and
   * animate everything according to the result of each of one of them.
   *
   * @param {Instructions} instructions  map of instructions
   * @return {Promise<void>}             it will finish or throw an exeption
   */
) => async (instructions: Instructions): Promise<void> => {
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === LEAVE_MAZE) {
      await numberHasLeft();

      break;
    }
    const direction = instructions[i];
    const oldPosition = number.position;
    const path = mazeData.path.get(oldPosition);
    const newPosition = oldPosition
                          .split(',')
                          .map((pos, idx) => (parseInt(pos) + directions[direction][idx]))
                          .join(',');

    if (!path || !path[directionsToWalls[direction]]) {
      throw new MazePathError();
    }
    /**
     * What happend if the number is over an exit and it tries to go forward?
     * Since there will be an open wall, the engine will try to move it.
     * But it won't enter the numeric line, it will fall from the maze.
     * And we don't want that.
     */
    if (mazeData.exits.indexOf(oldPosition) !== -ONE && direction === MOVE_FORWARD) {
      await number.beTheFallenOne();

      throw new MazePathOverflow();
    }
    await number.updatePosition(newPosition);
  }
  /**
   * If the `position` is not undefined it means
   * it never left the maze.
   */
  if (number.position) {
    throw new MazeStarvationError();
  }
};
const handleResetGameConfig = (
  randomizeActor: () => Array<number>,
  number: NumberActor,
  maze: Maze,
  actorExitIdx: number,
  numericLine: NumericLine,
) => () => {
  const newActor = randomizeActor();

  number.changeActor(newActor[actorExitIdx]);
  number.view.setParent(maze.view);
  number.beHappy(STOP_STATE);
  number.beSad(STOP_STATE);
  number.resetPosition();

  numericLine.beHappy(STOP_STATE);
  numericLine.beSad(STOP_STATE);
};

export type GameDifficulty = 'easy' | 'normal' | 'hard';
export type Engine = {|
  view: Container,
  excecuteSetOfInstructions(instructions: Instructions): Promise<void>,
  handleResetGame(): void,
|};
export default function mazeEngineGenerator(
  mazeData: MazeData,
  numericLineData: NumericLineData,
  difficulty: GameDifficulty,
): Engine {
  const view = new Container();
  const numericLine = numericLineGenerator(
    numericLineData.statics,
    mazeData.size,
    mazeData.margin,
  );

  const maze = mazeGenerator(mazeData);
  const randomizeActor = randomizeActorsConfig(
    numericLineData.statics,
    numericLineData.accesses,
    difficulty,
  );
  const randomActor = randomizeActor();
  const number = numberGenerator(
    randomActor[mazeData.actorExitIdx],
    mazeData.access,
    mazeData.exits[mazeData.actorExitIdx],
    mazeData.size,
    mazeData.margin,
  );
  const MARGIN_NUMERIC_LINE_MAZE = mazeData.margin + mazeData.size / HALF;

  maze.view.addChild(number.view);

  maze.view.y = numericLine.view.height + MARGIN_NUMERIC_LINE_MAZE;

  view.addChild(maze.view, numericLine.view);

  return {
    view,
    excecuteSetOfInstructions: excecuteSetOfInstructionsConfig(
      mazeData, number, numberHasLeftMazeConfig(mazeData, numericLineData, numericLine, number),
    ),
    handleResetGame: handleResetGameConfig(
      randomizeActor, number, maze, mazeData.actorExitIdx, numericLine,
    ),
  };
}
