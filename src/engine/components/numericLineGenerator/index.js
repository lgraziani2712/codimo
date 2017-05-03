/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { type NumberActor } from 'engine/components/numberGenerator';
import { HALF } from 'constants/numbers';

import arrowGenerator from './arrowGenerator';
import lineGenerator, { type Line } from './lineGenerator';

const receiveNumberAtPositionConfig = (line: Line) => (number: NumberActor, position: number): void => {
  line.receiveNumberAtPosition(number, position);
};

export type NumericLine = {|
  view: Container,
  receiveNumberAtPosition(number: NumberActor, position: number): void,
|};
const numericLineGenerator = (numbers: Array<number | null>, size: number): NumericLine => {
  const view = new Container();
  const leftArrow = arrowGenerator(size);
  const rightArrow = arrowGenerator(size, true);
  const line = lineGenerator(numbers, size);

  line.view.x = leftArrow.width;
  rightArrow.x = line.view.width + leftArrow.width;

  view.addChild(leftArrow, line.view, rightArrow);

  // Pivot at center top
  view.pivot.x = view.width / HALF;

  return {
    view,
    receiveNumberAtPosition: receiveNumberAtPositionConfig(line),
  };
};

export default numericLineGenerator;
