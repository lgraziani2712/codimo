/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Graphics } from 'pixi.js';

import { ZERO, ONE } from 'core/constants/numbers';
import componentGenerator, {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';

import { staticNumberGenerator } from '../numberGenerator';
import lineEmotionsFunctionalityBuilder from '../functionalities/lineEmotionsFunctionalityBuilder';
import receiveNumberAtPositionFunctionalityBuilder
  from '../functionalities/receiveNumberAtPositionFunctionalityBuilder';

import {
  NUMERIC_LINE_BG_COLOR,
  NUMERIC_LINE_NUMBER_BG_COLOR,
} from '.';

/**
 * It generates the line with static numbers.
 *
 * @version 1.0.0
 * @param {Array<number | null>} numbers A list of numbers to create.
 *                                       Null means an empty slot.
 * @param {number} size Block's size.
 * @param {number} margin Block's margin.
 * @returns {CodimoComponent} The new component.
 */
const lineGenerator = (
  numbers: Array<number | null>,
  size: number,
  margin: number,
) => {
  const view = new Graphics();
  const width = numbers.length * size + (numbers.length + ONE) * margin;
  const height = size + (margin + margin);
  const staticNumbers: Array<CodimoComponent> = [];

  view
    .beginFill(NUMERIC_LINE_BG_COLOR)
    .drawRect(ZERO, ZERO, width, height)
    .endFill();

  view.x = ZERO;
  view.y = margin;

  for (let i = 0; i < numbers.length; i++) {
    const square = new Graphics();

    square
      .beginFill(NUMERIC_LINE_NUMBER_BG_COLOR)
      .drawRect(ZERO, ZERO, size, size)
      .endFill();

    square.x = i * size + (margin + i * margin);
    square.y = margin;

    view.addChild(square);

    if (numbers[i] !== null) {
      const number = staticNumberGenerator(numbers[i], size, margin);

      square.addChild(number.view);
      staticNumbers.push(number);
    }
  }

  return componentGenerator(view, size, margin)
    .addFunctionality('emotions', lineEmotionsFunctionalityBuilder(staticNumbers))
    .addFunctionality('receiveNumberAtPosition', receiveNumberAtPositionFunctionalityBuilder)
    .build();
};

export default lineGenerator;
