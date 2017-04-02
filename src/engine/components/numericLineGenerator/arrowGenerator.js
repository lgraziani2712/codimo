/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';

import { NUMERIC_LINE_BG_COLOR } from 'constants/numbers';

const arrowCreator = (toTheRight?: boolean): Graphics => {
  const arrow = new Graphics();

  arrow.beginFill(NUMERIC_LINE_BG_COLOR);
  /* eslint-disable no-magic-numbers */
  if (toTheRight) {
    arrow.moveTo(0, 0)
      .lineTo(0, 100).lineTo(50, 50).closePath();
  } else {
    arrow.moveTo(0, 50)
      .lineTo(50, 0).lineTo(50, 100).closePath();
  }
  /* eslint-enable */
  arrow.endFill();

  return arrow;
};

export default arrowCreator;
