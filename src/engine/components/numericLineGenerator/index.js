/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { type NumberActor } from 'engine/components/numberGenerator';

import arrowGenerator from './arrowGenerator';
import lineGenerator from './lineGenerator';

function receiveNumberAtPosition(number: NumberActor, position: number) {
  this.line.receiveNumberAtPosition(number, position);
}

const numericLineGenerator = (numbersLength: number, numbers?: Array<Array<number>>) => {
  const leftArrow = arrowGenerator();
  const rightArrow = arrowGenerator(true);
  const line = lineGenerator(numbersLength, numbers);
  const view = new Container();

  line.view.x = leftArrow.width;
  rightArrow.x = line.view.width + leftArrow.width;

  view.addChild(leftArrow, line.view, rightArrow);

  return {
    view,
    line,
    receiveNumberAtPosition,
  };
};

export default numericLineGenerator;
