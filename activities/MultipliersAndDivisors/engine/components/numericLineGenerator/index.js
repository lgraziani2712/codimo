/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { type ActorEmotionState }
  from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';
import componentGenerator, {
  type CodimoComponent,
  type FunctionalityBuilder,
} from 'core/engines/pixijs/components/componentGenerator';

import arrowGenerator from './arrowGenerator';
import lineGenerator from './lineGenerator';

export type EngineData$NumericLineData = {|
  statics: Array<number | null>,
  accesses: Array<number>,
|};

export const NUMERIC_LINE_BG_COLOR = 0xffd900;
export const NUMERIC_LINE_NUMBER_BG_COLOR = 0x2a2a2a;

const numericLineFunctionalities = (line: CodimoComponent): FunctionalityBuilder => () => ({
  receiveNumberAtPosition(number: CodimoComponent, position: number): Promise<void> {
    return line.receiveNumberAtPosition(number, position);
  },
  beHappy: (state: ActorEmotionState) => line.beHappy(state),
  beSad: (state: ActorEmotionState) => line.beSad(state),
});

type Props = {
  numericLineData: EngineData$NumericLineData,
  size: number,
  margin: number,
};

/**
 * This component represent everything about the numeric line.
 *
 * @version 1.0.0
 * @todo Add link to the metadata shape documentation.
 * @param {Object} props NumericLine props.
 * @param {EngineData$NumericLineData} props.numericLineData Metadata required by the numeric line.
 * @param {number} props.size Block's size.
 * @param {number} props.margin Block's margin.
 * @return {CodimoComponent} The new component.
 */
const numericLineGenerator = ({ numericLineData, size, margin }: Props): CodimoComponent => {
  const view = new Container();
  const leftArrow = arrowGenerator(size, margin);
  const rightArrow = arrowGenerator(size, margin, true);
  const line = lineGenerator(numericLineData.statics, size, margin);

  line.view.x = leftArrow.view.width;
  rightArrow.view.x = line.view.width + leftArrow.view.width;

  view.addChild(leftArrow.view, line.view, rightArrow.view);

  return componentGenerator(view, size, margin)
    .addFunctionality('numericLine', numericLineFunctionalities(line))
    .build();
};

export default numericLineGenerator;
