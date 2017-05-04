/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { type NumberActor } from 'engine/components/numberGenerator';

import arrowGenerator from './arrowGenerator';
import lineGenerator, { type Line } from './lineGenerator';

const receiveNumberAtPositionConfig = (line: Line) => (number: NumberActor, position: number): void => {
  line.receiveNumberAtPosition(number, position);
};

export type NumericLine = {|
  view: Container,
  receiveNumberAtPosition(number: NumberActor, position: number): void,
|};
const numericLineGenerator = (numbers: Array<number | null>, size: number, margin: number): NumericLine => {
  const view = new Container();
  const leftArrow = arrowGenerator(size, margin);
  const rightArrow = arrowGenerator(size, margin, true);
  const line = lineGenerator(numbers, size, margin);

  line.view.x = leftArrow.width;
  rightArrow.x = line.view.width + leftArrow.width;

  view.addChild(leftArrow, line.view, rightArrow);

  view.x = size + margin - leftArrow.width;

  return {
    view,
    receiveNumberAtPosition: receiveNumberAtPositionConfig(line),
  };
};

export default numericLineGenerator;
