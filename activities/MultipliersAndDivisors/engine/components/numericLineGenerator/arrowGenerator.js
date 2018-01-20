/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';

import { HALF, ZERO, FOUR } from 'core/constants/numbers';

import { NUMERIC_LINE_BG_COLOR } from '.';

/**
 * Numeric line's arrows.
 *
 * @version 1.0.0
 * @param {number} size Block's size.
 * @param {number} margin Block's margin.
 * @param {boolean} [turnRight] Points to the left or the right?
 * @return {CodimoComponent} The new static component.
 */
const arrowGenerator = (size: number, margin: number, turnRight?: boolean) => {
  const view = new Graphics();
  /**
   * Arrow's height must be `margin * 2` greater than the line.
   * That's why it needs to multiply it by FOUR.
   */
  const height = size + margin * FOUR;
  const width = height / HALF;

  view.beginFill(NUMERIC_LINE_BG_COLOR);

  if (turnRight) {
    view.moveTo(ZERO, ZERO).lineTo(ZERO, height).lineTo(width, width).closePath();
  } else {
    view.moveTo(ZERO, width).lineTo(width, ZERO).lineTo(width, height).closePath();
  }

  view.endFill();

  return {
    view,
  };
};

export default arrowGenerator;
