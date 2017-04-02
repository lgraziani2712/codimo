/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import arrowGenerator from './arrowGenerator';
import lineGenerator from './lineGenerator';

const numericLineGenerator = (numbersLength: number): Container => {
  const leftArrow = arrowGenerator();
  const rightArrow = arrowGenerator(true);
  const line = lineGenerator(numbersLength);
  const numericLine = new Container();

  line.x = leftArrow.width;
  rightArrow.x = line.width;

  numericLine
    .addChild(leftArrow)
    .addChild(line)
    .addChild(rightArrow);

  return numericLine;
};

export default numericLineGenerator;
