/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';

import {
  BLOCK_SIZE,
  HALF,
  NUMERIC_LINE_BG_COLOR,
  NUMERIC_LINE_HEIGHT,
  NUMERIC_LINE_NUMBER_BG_COLOR,
  ONE,
} from 'constants/numbers';

const lineGenerator = (numbersLength: number): Graphics => {
  const line = new Graphics();
  const width = numbersLength * BLOCK_SIZE + BLOCK_SIZE;
  const spaceInBetweenX = BLOCK_SIZE / (numbersLength + ONE);
  const spaceInBetweenY = (NUMERIC_LINE_HEIGHT - BLOCK_SIZE) / HALF;

  /* eslint-disable no-magic-numbers */
  line
    .beginFill(NUMERIC_LINE_BG_COLOR)
    .drawRect(0, 10, width, NUMERIC_LINE_HEIGHT - 20)
    .endFill();
  /* eslint-enable */

  for (let i = 0; i < numbersLength; i++) {
    const square = new Graphics();

    square
      .beginFill(NUMERIC_LINE_NUMBER_BG_COLOR)
      .drawRect(
        i * BLOCK_SIZE + (spaceInBetweenX + i * spaceInBetweenX),
        spaceInBetweenY,
        BLOCK_SIZE,
        BLOCK_SIZE,
      )
      .endFill();

    line.addChild(square);
  }

  return line;
};

export default lineGenerator;
