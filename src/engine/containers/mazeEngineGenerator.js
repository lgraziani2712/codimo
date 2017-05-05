/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { ZERO, ONE } from 'constants/numbers';
import { type ActorsToActions } from 'blockly/executorGenerator';
import mazeGenerator, { type MazeData, type Maze } from 'engine/components/mazeGenerator';
import numberGenerator, { type NumberActor } from 'engine/components/numberGenerator';
import numericLineGenerator, {
  type NumericLineData,
  type NumericLine,
} from 'engine/components/numericLineGenerator';
import { MazePathError, MazeExitError } from 'engine/helpers/errors';
import { randomizeActorsConfig } from 'engine/helpers/randomConfigurations';

const numberHasLeftMazeConfig = (
  mazeData: MazeData,
  numericLineData: NumericLineData,
  numericLine: NumericLine,
) => (number: NumberActor, numberIndex: number): void => {
  const exit = mazeData.exits.indexOf(number.position);

  if (exit === -ONE) {
    throw new MazeExitError(numberIndex);
  }

  numericLine.receiveNumberAtPosition(number, numericLineData.accesses[exit]);
};
/* eslint-disable camelcase */
const directions = {
  move_forward: [ZERO, -ONE],
  move_right: [ONE, ZERO],
  move_backward: [ZERO, ONE],
  move_left: [-ONE, ZERO],
};
/* eslint-enable */

const excecuteSetOfInstructionsConfig = (
  mazeData: MazeData,
  numbers: Array<NumberActor>,
  numberHasLeft: (number: NumberActor, numberIndex: number) => void,
) => async (instructions: ActorsToActions): Promise<void> => {
  const errors = [];

  for (const [numberPosition, actions] of instructions) {
    const number = numbers[numberPosition];

    for (let j = 0; j < actions.length; j++) {
      const direction = actions[j];
      const oldPosition = number.position;
      const newPosition = oldPosition.split(',')
                            .map((pos, i) => (parseInt(pos) + directions[direction][i]))
                            .join(',');

      if (!mazeData.path.includes(newPosition)) {
        errors.push(new MazePathError(numberPosition));
        break;
      }
      await number.updatePosition(newPosition);
    }
    if (errors[numberPosition]) {
      continue;
    }
    try {
      numberHasLeft(number, numberPosition);
    } catch (err) {
      errors.push(err);
    }
  }
  if (errors.length) {
    throw errors;
  }
};
const handleResetGameConfig = (
  randomizeActors: (void) => Array<number>,
  numbers: Array<NumberActor>,
  maze: Maze,
) => () => {
  const newActors = randomizeActors();

  numbers.forEach((number, i) => {
    number.changeActor(newActors[i]);
    number.view.setParent(maze.view);
    number.resetPosition();
  });
};

export type Engine = {|
  view: Container,
  excecuteSetOfInstructions(instructions: ActorsToActions): Promise<void>,
  handleResetGame(void): void,
|};
export default function mazeEngineGenerator(
  mazeData: MazeData,
  numericLineData: NumericLineData,
): Engine {
  const view = new Container();
  const numericLine = numericLineGenerator(
    numericLineData.statics,
    mazeData.size,
    mazeData.margin,
  );
  const maze = mazeGenerator(mazeData);
  const randomizeActors = randomizeActorsConfig(numericLineData.statics, numericLineData.accesses);
  const numbers: Array<NumberActor> = randomizeActors().map((number, i) => {
    const actor = numberGenerator(
      number,
      mazeData.accesses[i],
      mazeData.size,
      mazeData.margin,
    );

    maze.view.addChild(actor.view);

    return actor;
  });

  maze.view.y = numericLine.view.height - mazeData.margin;

  view.addChild(maze.view, numericLine.view);

  return {
    view,
    excecuteSetOfInstructions: excecuteSetOfInstructionsConfig(
      mazeData, numbers, numberHasLeftMazeConfig(mazeData, numericLineData, numericLine),
    ),
    handleResetGame: handleResetGameConfig(randomizeActors, numbers, maze),
  };
}
