/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { ONE } from 'core/constants/numbers';
import blockGenerator, { BLOCK_DEFINITIONS } from 'core/engines/pixijs/components/blockGenerator';
import { type EngineData } from 'core/engines/pixijs/engineGenerator';
import { type EngineData$Path }
  from 'core/engines/pixijs/engineGenerator/processors/checkers/hasHitAWallBuilder';

const BLOCK_FIRST = 0;

/**
 * Generates a maze component. It has no funcionality.
 *
 * @version 1.0.0
 * @todo Add link to the metadata shape documentation.
 * @param {EngineData} engineData The metadata required by the maze.
 * @return {CodimoComponent} The new static component.
 */
const mazeGenerator = (engineData: EngineData) => {
  if (!engineData.path) {
    throw new Error(
      // TODO add the URL for the doc of the path shape!
      // FIXME duplicated @see hasHitAWallGenerator
      '`mazeGenerator` component requires `engineData.path`. ' +
      'See blablabla for the `path` shape.',
    );
  }
  const paths: EngineData$Path = new Map(engineData.path);
  const view = new Container();
  const BLOCKS_LAST = {
    X: engineData.width - ONE,
    Y: engineData.height - ONE,
  };
  const BLOCKS = {
    borderCreator: blockGenerator(BLOCK_DEFINITIONS.BORDER, engineData.size, engineData.margin),
    pathCreator: blockGenerator(BLOCK_DEFINITIONS.PATH, engineData.size, engineData.margin),
    wallCreator: blockGenerator(BLOCK_DEFINITIONS.WALL, engineData.size, engineData.margin),
  };

  for (let x = 0; x < engineData.width; x++) {
    for (let y = 0; y < engineData.height; y++) {
      // This is the only place where the block position is calculated
      const positionX = x * engineData.size + x * engineData.margin;
      const positionY = y * engineData.size + y * engineData.margin;
      const position = `${x},${y}`;
      let block;

      if (paths.has(position)) {
        block = BLOCKS.pathCreator(
          positionX,
          positionY,
          paths.get(position),
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
  view.x = engineData.size - engineData.margin;

  return {
    view,
  };
};

export default mazeGenerator;
