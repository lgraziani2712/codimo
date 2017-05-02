/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { HALF, ONE } from 'constants/numbers';

import blockCreatorConfig, { BLOCK_DEFINITIONS } from './blockGenerator';

const BLOCK_FIRST = 0;

export type MazeDataStructure = {|
  accesses: Array<string>,
  exits: Array<string>,
  height: number,
  numbers: {|
    actors: Array<number>,
    statics: Array<number | null>,
    accesses: Array<number>,
  |},
  path: Array<string>,
  size: number,
  width: number,
|};
export type Maze = {|
  view: Container,
|};
const mazeGenerator = (mazeData: MazeDataStructure): Maze => {
  const view = new Container();
  const BLOCKS_LAST = {
    X: mazeData.width - ONE,
    Y: mazeData.height - ONE,
  };
  const BLOCKS = {
    borderCreator: blockCreatorConfig(BLOCK_DEFINITIONS.BORDER, mazeData.size),
    pathCreator: blockCreatorConfig(BLOCK_DEFINITIONS.PATH, mazeData.size),
    wallCreator: blockCreatorConfig(BLOCK_DEFINITIONS.WALL, mazeData.size),
  };

  for (let x = 0; x < mazeData.width; x++) {
    for (let y = 0; y < mazeData.height; y++) {
      let block;

      if (mazeData.path.includes(`${x},${y}`)) {
        block = BLOCKS.pathCreator();
      } else {
        block = x === BLOCK_FIRST || x === BLOCKS_LAST.X || y === BLOCK_FIRST || y === BLOCKS_LAST.Y
              ? BLOCKS.borderCreator()
              : BLOCKS.wallCreator();
      }
      block.view.x = x * mazeData.size;
      block.view.y = y * mazeData.size;
      block.position = `${x},${y}`;

      view.addChild(block.view);
    }
  }

  // Pivot at center top
  view.pivot.x = view.width / HALF;

  return {
    view,
  };
};

export default mazeGenerator;
