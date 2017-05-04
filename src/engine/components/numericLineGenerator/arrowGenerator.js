/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';

import { NUMERIC_LINE_BG_COLOR, HALF, ZERO, FOUR } from 'constants/numbers';

const arrowCreator = (size: number, margin: number, toTheRight?: boolean): Graphics => {
  const arrow = new Graphics();
  /**
   * Arrow's height must be `margin * 2` greater than the line.
   * That's why needs to multiply it by FOUR.
   */
  const height = size + margin * FOUR;
  const width = height / HALF;

  arrow.beginFill(NUMERIC_LINE_BG_COLOR);

  if (toTheRight) {
    arrow.moveTo(ZERO, ZERO)
      .lineTo(ZERO, height).lineTo(width, width).closePath();
  } else {
    arrow.moveTo(ZERO, width)
      .lineTo(width, ZERO).lineTo(width, height).closePath();
  }

  arrow.endFill();

  return arrow;
};

export default arrowCreator;
