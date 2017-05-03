/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';

import { NUMERIC_LINE_BG_COLOR, TEN, HALF, ZERO } from 'constants/numbers';

const MARGIN_HEIGHT = TEN + TEN;
const arrowCreator = (size: number, toTheRight?: boolean): Graphics => {
  const arrow = new Graphics();
  /**
   * Arrow's height is MARGIN_HEIGHT greater than the line.
   * That's why needs to add it twice.
   */
  const height = size + MARGIN_HEIGHT + MARGIN_HEIGHT;
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
