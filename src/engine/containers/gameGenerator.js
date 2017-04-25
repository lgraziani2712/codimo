/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { ZERO, ONE } from 'constants/numbers';
import mazeGenerator, { type MazeDataStructure } from 'engine/components/mazeGenerator';
import numberGenerator, { type NumberActor } from 'engine/components/numberGenerator';
import numericLineGenerator, { type NumericLine } from 'engine/components/numericLineGenerator';

const numberHasLeftMazeConfig = (
  mazeData: MazeDataStructure,
  numbers: Array<NumberActor>,
  numericLine: NumericLine,
) => (numberPosition: number) => {
  const number = numbers[numberPosition];
  const exit = mazeData.exits.indexOf(number.position);

  if (exit === -ONE) {
    throw new Error('This position is not an exit');
  }

  numericLine.receiveNumberAtPosition(number, mazeData.numbers.accesses[exit]);
};

const directions = {
  up: [ZERO, -ONE],
  right: [ONE, ZERO],
  down: [ZERO, ONE],
  left: [-ONE, ZERO],
};

const moveNumberToConfig = (
  mazeData: MazeDataStructure,
  numbers: Array<NumberActor>,
) => (actorPosition: number, direction: $Keys<typeof directions>): Promise<void> => {
  const number = numbers[actorPosition];
  const oldPosition = number.position;
  const newPosition = oldPosition.split(',').map((pos, i) => (parseInt(pos) + directions[direction][i])).join(',');

  if (!mazeData.path.includes(newPosition)) {
    throw new Error('The path you are trying to go is not a valid one');
  }

  return number.updatePosition(newPosition);
};

export default function gameGenerator(mazeData: MazeDataStructure) {
  const view = new Container();
  const numericLine = numericLineGenerator(mazeData.numbers.statics, mazeData.size);
  const maze = mazeGenerator(mazeData);
  const numbers: Array<NumberActor> = [];

  for (let i = 0; i < mazeData.numbers.actors.length; i++) {
    const number = numberGenerator(mazeData.numbers.actors[i], mazeData.accesses[i], mazeData.size);

    maze.addChild(number.view);
    numbers.push(number);
  }

  numericLine.view.x = 1;
  maze.y = numericLine.view.height - 84; // eslint-disable-line no-magic-numbers, FIXME
  view.addChild(maze, numericLine.view);

  return {
    view,
    moveNumberTo: moveNumberToConfig(mazeData, numbers),
    numberHasLeftMaze: numberHasLeftMazeConfig(mazeData, numbers, numericLine),
  };
}
