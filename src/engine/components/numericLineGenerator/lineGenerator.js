/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';

import {
  HALF,
  NUMERIC_LINE_BG_COLOR,
  NUMERIC_LINE_HEIGHT,
  NUMERIC_LINE_NUMBER_BG_COLOR,
  ZERO,
  ONE,
  TEN,
} from 'constants/numbers';
import { staticNumberGenerator, type NumberActor } from 'engine/components/numberGenerator';

// margin-top = 10 margin-bottom = 10
const MARGIN_BOTTOM = TEN;
const MARGIN = TEN + MARGIN_BOTTOM;

const receiveNumberAtPositionConfig = (
  view: Graphics,
) => (number: NumberActor, position: number): Promise<void> => {
  number.view.setParent(view.getChildAt(position));

  // FIXME this must be configured inside the numberGenerator function
  number.view.anchor.x = number.view.anchor.y = 0.5;

  return number.hasEnteredToNumericLine(MARGIN_BOTTOM);
};

function addVisualNumber(square: Graphics, numbers: Array<number | null>, size: number, i: number) {
  if (numbers[i] === null) {
    return;
  }
  const number = staticNumberGenerator(numbers[i], size);

  square.addChild(number.view);
}

export type Line = {|
  view: Graphics,
  receiveNumberAtPosition(number: NumberActor, position: number): Promise<void>,
|};
/**
 * It generates the line with the numbers
 *
 * @param  {Array<number | null>} numbers what `number` needs to create.
 * @param {number} size width and height of each space
 * @return {Object} the line
 */
const lineGenerator = (numbers: Array<number | null>, size: number): Line => {
  const view = new Graphics();
  const width = numbers.length * size + size;
  const spaceInBetweenX = size / (numbers.length + ONE);
  const spaceInBetweenY = (NUMERIC_LINE_HEIGHT - size - MARGIN) / HALF;

  view
    .beginFill(NUMERIC_LINE_BG_COLOR)
    .drawRect(ZERO, ZERO, width, NUMERIC_LINE_HEIGHT - MARGIN)
    .endFill();

  view.x = ZERO;
  view.y = TEN;

  for (let i = 0; i < numbers.length; i++) {
    const square = new Graphics();

    square
      .beginFill(NUMERIC_LINE_NUMBER_BG_COLOR)
      .drawRect(ZERO, ZERO, size, size)
      .endFill();

    square.x = i * size + (spaceInBetweenX + i * spaceInBetweenX);
    square.y = spaceInBetweenY;

    view.addChild(square);

    addVisualNumber(square, numbers, size, i);
  }

  return {
    view,
    receiveNumberAtPosition: receiveNumberAtPositionConfig(view),
  };
};

export default lineGenerator;
