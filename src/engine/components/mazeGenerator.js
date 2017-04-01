/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { ONE, BLOCK_SIZE } from 'constants/numbers';

import blockCreator, { BLOCK_DEFINITIONS } from './blockGenerator';
import MazeData from './MazeData.json';

const BLOCKS_LENGHT = {
  X: 15,
  Y: 7,
};
const BLOCK_FIRST = 0;
const BLOCKS_LAST = {
  X: BLOCKS_LENGHT.X - ONE,
  Y: BLOCKS_LENGHT.Y - ONE,
};
const BLOCKS = {
  border: blockCreator(BLOCK_DEFINITIONS.BORDER),
  path: blockCreator(BLOCK_DEFINITIONS.PATH),
  wall: blockCreator(BLOCK_DEFINITIONS.WALL),
};

const mazeGenerator = (): Container => {
  const component = new Container();

  for (let x = 0; x < BLOCKS_LENGHT.X; x++) {
    for (let y = 0; y < BLOCKS_LENGHT.Y; y++) {
      let block;

      if (MazeData.includes(`${x},${y}`)) {
        block = BLOCKS.path();
      } else {
        block = x === BLOCK_FIRST || x === BLOCKS_LAST.X || y === BLOCK_FIRST || y === BLOCKS_LAST.Y
                    ? BLOCKS.border()
                    : BLOCKS.wall();
      }
      block.position.x = x * BLOCK_SIZE;
      block.position.y = y * BLOCK_SIZE;

      component.addChild(block);
    }
  }

  return component;
};

export default mazeGenerator;
