/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';
import { TweenLite, Linear } from 'gsap';

import {
  ACTOR_MOVEMENT_DURATION,
  BLOCK_SIZE,
  HALF,
  NUMERIC_LINE_BG_COLOR,
  NUMERIC_LINE_HEIGHT,
  NUMERIC_LINE_NUMBER_BG_COLOR,
  ZERO,
  ONE,
  TEN,
} from 'constants/numbers';
import { staticNumberGenerator, type NumberActor } from 'engine/components/numberGenerator';

function addVisualNumber(square: Graphics, numbers: Array<number | null>, i: number) {
  if (numbers[i] === null) {
    return;
  }
  const number = staticNumberGenerator(numbers[i]);

  number.view.x = number.view.y = BLOCK_SIZE / HALF;

  square.addChild(number.view);
}

// margin-top = 10 margin-bottom = 10
const MARGIN = 20;

function receiveNumberAtPosition(number: NumberActor, position: number): Promise<void> {
  number.view.setParent(this.view.getChildAt(position));

  // FIXME this must be configured inside the numberGenerator function
  number.view.anchor.x = number.view.anchor.y = 0.5;

  number.view.x = BLOCK_SIZE / HALF;
  number.view.y = BLOCK_SIZE + (BLOCK_SIZE) / HALF;

  return new Promise((onComplete) => {
    TweenLite.to(number.view, ACTOR_MOVEMENT_DURATION, {
      y: BLOCK_SIZE / HALF,
      ease: Linear.easeNone,
      onComplete,
    });
  });
}
export type Line = {|
  view: Graphics,
  receiveNumberAtPosition(number: NumberActor, position: number): Promise<void>,
|};
/**
 * It generates the line with the numbers
 *
 * @param  {Array<number | null>} numbers what `number` needs to create.
 * @return {Object} the line
 */
const lineGenerator = (numbers: Array<number | null>): Line => {
  const view = new Graphics();
  const width = numbers.length * BLOCK_SIZE + BLOCK_SIZE;
  const spaceInBetweenX = BLOCK_SIZE / (numbers.length + ONE);
  const spaceInBetweenY = (NUMERIC_LINE_HEIGHT - BLOCK_SIZE - MARGIN) / HALF;

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
      .drawRect(ZERO, ZERO, BLOCK_SIZE, BLOCK_SIZE)
      .endFill();

    square.x = i * BLOCK_SIZE + (spaceInBetweenX + i * spaceInBetweenX);
    square.y = spaceInBetweenY;

    view.addChild(square);

    addVisualNumber(square, numbers, i);
  }

  return {
    view,
    receiveNumberAtPosition,
  };
};

export default lineGenerator;
