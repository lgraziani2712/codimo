/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { ONE } from 'constants/numbers';

import blockGeneratorConfig, { BLOCK_DEFINITIONS, type ActivePathBorders } from './blockGeneratorConfig';

const BLOCK_FIRST = 0;

export type MazeData = {|
  canvas: {|
    height: number,
    width: number,
  |},
  width: number,
  height: number,
  margin: number,
  size: number,
  /**
   * The first will define wich blocks are path.
   * The second will define wich borders are wall.
   */
  path: Map<string, ActivePathBorders>,
  access: string,
  exits: Array<string>,
  actorExitIdx: number,
|};
export type Maze = {|
  view: Container,
|};
const mazeGenerator = (mazeData: MazeData): Maze => {
  const view = new Container();
  const BLOCKS_LAST = {
    X: mazeData.width - ONE,
    Y: mazeData.height - ONE,
  };
  const BLOCKS = {
    borderCreator: blockGeneratorConfig(BLOCK_DEFINITIONS.BORDER, mazeData.size, mazeData.margin),
    pathCreator: blockGeneratorConfig(BLOCK_DEFINITIONS.PATH, mazeData.size, mazeData.margin),
    wallCreator: blockGeneratorConfig(BLOCK_DEFINITIONS.WALL, mazeData.size, mazeData.margin),
  };

  for (let x = 0; x < mazeData.width; x++) {
    for (let y = 0; y < mazeData.height; y++) {
      // This is the only place where the block position is calculated
      const positionX = x * mazeData.size + x * mazeData.margin;
      const positionY = y * mazeData.size + y * mazeData.margin;
      const position = `${x},${y}`;
      let block;

      if (mazeData.path.has(position)) {
        block = BLOCKS.pathCreator(
          positionX,
          positionY,
          mazeData.path.get(position),
        );
      } else {
        block =
          x === BLOCK_FIRST || x === BLOCKS_LAST.X || y === BLOCK_FIRST || y === BLOCKS_LAST.Y
            ? BLOCKS.borderCreator(positionX, positionY)
            : BLOCKS.wallCreator(positionX, positionY);
      }

      view.addChild(block.view);
    }
  }
  view.x = mazeData.size - mazeData.margin;

  return {
    view,
  };
};

export default mazeGenerator;
