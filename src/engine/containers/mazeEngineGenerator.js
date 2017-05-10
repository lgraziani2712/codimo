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
import { MazePathError, MazeExitError, MazeWrongExitError } from 'engine/helpers/errors';
import { randomizeActorsConfig } from 'engine/helpers/randomConfigurations';

const numberHasLeftMazeConfig = (
  mazeData: MazeData,
  numericLineData: NumericLineData,
  numericLine: NumericLine,
) => (number: NumberActor, numberIndex: number): void => {
  const exitIdx = mazeData.exits.indexOf(number.position);

  if (exitIdx === -ONE) {
    throw new MazeExitError(numberIndex);
  }

  const exit = mazeData.exits[exitIdx];

  numericLine.receiveNumberAtPosition(number, numericLineData.accesses[exitIdx]);

  if (exit !== number.finalPosition) {
    throw new MazeWrongExitError(numberIndex);
  }
};
/* eslint-disable camelcase */
const directions = {
  move_forward: [ZERO, -ONE],
  move_right: [ONE, ZERO],
  move_backward: [ZERO, ONE],
  move_left: [-ONE, ZERO],
};
const directionsToWalls = {
  move_forward: 'top',
  move_right: 'right',
  move_backward: 'bottom',
  move_left: 'left',
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
      const path = mazeData.path.get(oldPosition);

      if (!path || !path[directionsToWalls[direction]]) {
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
  randomizeActors: () => Array<number>,
  numbers: Array<NumberActor>,
  maze: Maze,
  actorsPositions: Array<[number, number]>,
) => () => {
  const newActors = randomizeActors();

  numbers.forEach((number, idx) => {
    number.changeActor(newActors[actorsPositions[idx][1]]);
    number.view.setParent(maze.view);
    number.resetPosition();
  });
};

export type GameDifficulty = 'easy' | 'normal' | 'hard';
export type Engine = {|
  view: Container,
  excecuteSetOfInstructions(instructions: ActorsToActions): Promise<void>,
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
  const randomizeActors = randomizeActorsConfig(
    numericLineData.statics,
    numericLineData.accesses,
    difficulty,
  );
  const randomActors = randomizeActors();
  const numbers: Array<NumberActor> = mazeData.actorsPositions.map((actorPositions) => {
    // El actor también tiene que recibir en qué posición sale correctamente, eso se tiene que chequear!!
    // El número SIEMPRE tiene que entrar a la recta, por más que sea erróneo su lugar
    const actor = numberGenerator(
      randomActors[actorPositions[1]],
      mazeData.accesses[actorPositions[0]],
      mazeData.exits[actorPositions[1]],
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
    handleResetGame: handleResetGameConfig(randomizeActors, numbers, maze, mazeData.actorsPositions),
  };
}
