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
const numericLineGenerator = (numbers: Array<number | null>, size: number): NumericLine => {
  const leftArrow = arrowGenerator();
  const rightArrow = arrowGenerator(true);
  const line = lineGenerator(numbers, size);
  const view = new Container();

  line.view.x = leftArrow.width;
  rightArrow.x = line.view.width + leftArrow.width;

  view.addChild(leftArrow, line.view, rightArrow);

  return {
    view,
    receiveNumberAtPosition: receiveNumberAtPositionConfig(line),
  };
};

export default numericLineGenerator;
