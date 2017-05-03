/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';

import {
  NUMERIC_LINE_BG_COLOR,
  NUMERIC_LINE_NUMBER_BG_COLOR,
  ZERO,
  ONE,
  TEN,
} from 'constants/numbers';
import { staticNumberGenerator, type NumberActor } from 'engine/components/numberGenerator';

// FIXME this must be a percentage of the size? Like 10%?
const MARGIN = TEN;

const receiveNumberAtPositionConfig = (
  view: Graphics,
) => (number: NumberActor, position: number): Promise<void> => {
  number.view.setParent(view.getChildAt(position));

  // FIXME this must be configured inside the numberGenerator function
  number.view.anchor.x = number.view.anchor.y = 0.5;

  return number.hasEnteredToNumericLine(MARGIN);
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
  const width = numbers.length * size + (numbers.length + ONE) * MARGIN;
  const height = size + (MARGIN + MARGIN);

  view
    .beginFill(NUMERIC_LINE_BG_COLOR)
    .drawRect(ZERO, ZERO, width, height)
    .endFill();

  view.x = ZERO;
  view.y = TEN;

  for (let i = 0; i < numbers.length; i++) {
    const square = new Graphics();

    square
      .beginFill(NUMERIC_LINE_NUMBER_BG_COLOR)
      .drawRect(ZERO, ZERO, size, size)
      .endFill();

    square.x = i * size + (MARGIN + i * MARGIN);
    square.y = MARGIN;

    view.addChild(square);

    addVisualNumber(square, numbers, size, i);
  }

  return {
    view,
    receiveNumberAtPosition: receiveNumberAtPositionConfig(view),
  };
};

export default lineGenerator;
