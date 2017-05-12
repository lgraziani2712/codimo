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
} from 'constants/numbers';
import {
  staticNumberGenerator,
  type NumberActor,
  type StaticNumberActor,
  type ActorEmotionState,
} from 'engine/components/numberGenerator';

const receiveNumberAtPositionConfig = (
  view: Graphics,
) => (number: NumberActor, position: number): Promise<void> => {
  number.view.setParent(view.getChildAt(position));

  return number.hasEnteredToNumericLine();
};
const emotionConfig = (
  staticNumbers: Array<StaticNumberActor>,
  beHappy: boolean,
) => (state: ActorEmotionState) => {
  if (beHappy) {
    staticNumbers.forEach((number) => {
      number.beHappy(state);
    });
  } else {
    staticNumbers.forEach((number) => {
      number.beSad(state);
    });
  }
};

export type Line = {|
  view: Graphics,
  receiveNumberAtPosition(number: NumberActor, position: number): Promise<void>,
  beHappy(state: ActorEmotionState): void,
  beSad(state: ActorEmotionState): void,
|};
/**
 * It generates the line with the numbers
 *
 * @param   {Array<number | null>}  numbers what `number` needs to create.
 * @param   {number}                size    width and height of each space
 * @param   {number}                margin  The block's margin
 * @return  {Object} the line
 */
const lineGenerator = (numbers: Array<number | null>, size: number, margin: number): Line => {
  const view = new Graphics();
  const width = numbers.length * size + (numbers.length + ONE) * margin;
  const height = size + (margin + margin);
  const staticNumbers: Array<StaticNumberActor> = [];

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
      const number = staticNumberGenerator(numbers[i], size);

      square.addChild(number.view);
      staticNumbers.push(number);
    }
  }

  return {
    view,
    receiveNumberAtPosition: receiveNumberAtPositionConfig(view),
    beHappy: emotionConfig(staticNumbers, true),
    beSad: emotionConfig(staticNumbers, false),
  };
};

export default lineGenerator;
