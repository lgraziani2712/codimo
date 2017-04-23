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
import { type NumberActor } from 'engine/components/numberGenerator';

// margin-top = 10 margin-bottom = 10
const MARGIN = 20;

function receiveNumberAtPosition(number: NumberActor, position: number) {
  number.view.setParent(this.view.getChildAt(position - ONE));

  // FIXME this must be configured inside the numberGenerator function
  number.view.anchor.x = number.view.anchor.y = 0.5;

  number.view.x = BLOCK_SIZE / HALF;
  number.view.y = BLOCK_SIZE + (BLOCK_SIZE + MARGIN) / HALF;

  TweenLite.to(number.view, ACTOR_MOVEMENT_DURATION, {
    y: BLOCK_SIZE / HALF,
    ease: Linear.easeNone,
  });
}
const lineGenerator = (numbersLength: number) => {
  const view = new Graphics();
  const width = numbersLength * BLOCK_SIZE + BLOCK_SIZE;
  const spaceInBetweenX = BLOCK_SIZE / (numbersLength + ONE);
  const spaceInBetweenY = (NUMERIC_LINE_HEIGHT - BLOCK_SIZE - MARGIN) / HALF;

  view
    .beginFill(NUMERIC_LINE_BG_COLOR)
    .drawRect(ZERO, ZERO, width, NUMERIC_LINE_HEIGHT - MARGIN)
    .endFill();

  view.x = ZERO;
  view.y = TEN;

  for (let i = 0; i < numbersLength; i++) {
    const square = new Graphics();

    square
      .beginFill(NUMERIC_LINE_NUMBER_BG_COLOR)
      .drawRect(ZERO, ZERO, BLOCK_SIZE, BLOCK_SIZE)
      .endFill();

    square.x = i * BLOCK_SIZE + (spaceInBetweenX + i * spaceInBetweenX);
    square.y = spaceInBetweenY;

    view.addChild(square);
  }

  return {
    view,
    receiveNumberAtPosition,
  };
};

export default lineGenerator;
