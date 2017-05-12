/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { type NumberActor, type ActorEmotionState } from 'engine/components/numberGenerator';

import arrowGenerator from './arrowGenerator';
import lineGenerator, { type Line } from './lineGenerator';

const receiveNumberAtPositionConfig = (line: Line) =>
  (number: NumberActor, position: number): Promise<void> => line.receiveNumberAtPosition(number, position);
const emotionConfig = (line: Line, beHappy: boolean) => (
  beHappy
    ? (state: ActorEmotionState): void => line.beHappy(state)
    : (state: ActorEmotionState): void => line.beSad(state)
);

export type NumericLineData = {|
  statics: Array<number | null>,
  accesses: Array<number>,
|};
export type NumericLine = {|
  view: Container,
  receiveNumberAtPosition(number: NumberActor, position: number): Promise<void>,
  beHappy(state: ActorEmotionState): void,
  beSad(state: ActorEmotionState): void,
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
    beHappy: emotionConfig(line, true),
    beSad: emotionConfig(line, false),
  };
};

export default numericLineGenerator;
