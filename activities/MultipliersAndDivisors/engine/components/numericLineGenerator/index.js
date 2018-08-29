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

export type NumericLineMetadata = {|
  statics: Array<number | null>,
  accesses: Array<number>,
|};

export const NUMERIC_LINE_BG_COLOR = 0xffd900;
export const NUMERIC_LINE_NUMBER_BG_COLOR = 0x2a2a2a;

const numericLineFunctionalities = (
  line: CodimoComponent,
  actorsInTheLine: Array<CodimoComponent>,
): FunctionalityBuilder => () => ({
  receiveNumberAtPosition: (
    number: CodimoComponent,
    position: number,
  ): Promise<void> => {
    actorsInTheLine.push(number);

    return line.receiveNumberAtPosition(number, position);
  },
  resetActors() {
    actorsInTheLine.length = 0;
  },
  thereAreNoActorsInTheLine: () => !actorsInTheLine.length,
  actorsPositionAreInvalid() {
    for (let i = 0; i < actorsInTheLine.length; i++) {
      const actor = actorsInTheLine[i];

      if (actor.position !== actor.endPosition) {
        return true;
      }
    }

    return false;
  },
  beHappy: (state: ActorEmotionState) => {
    actorsInTheLine.forEach(actor => {
      actor.beHappy(state);
    });
    line.beHappy(state);
  },
  beSad: (state: ActorEmotionState) => {
    actorsInTheLine.forEach(actor => {
      actor.beSad(state);
    });
    line.beSad(state);
  },
});

type Props = {
  numericLineData: NumericLineMetadata,
  size: number,
  margin: number,
};

/**
 * This component represent everything about the numeric line.
 *
 * @version 1.0.0
 * @todo Add link to the metadata shape documentation.
 * @param {Object} props NumericLine props.
 * @param {NumericLineMetadata} props.numericLineData
 *  Metadata required by the numeric line.
 * @param {number} props.size Block's size.
 * @param {number} props.margin Block's margin.
 * @return {CodimoComponent} The new component.
 */
const numericLineGenerator = ({ numericLineData, size, margin }: Props): CodimoComponent => {
  const view = new Container();
  const leftArrow = arrowGenerator(size, margin);
  const rightArrow = arrowGenerator(size, margin, true);
  const line = lineGenerator(numericLineData.statics, size, margin);
  const actorsInTheLine = [];

  line.view.x = leftArrow.view.width;
  rightArrow.view.x = line.view.width + leftArrow.view.width;

  view.addChild(leftArrow.view, line.view, rightArrow.view);

  return componentGenerator(view, size, margin)
    .addFunctionality(
      'numericLine',
      numericLineFunctionalities(line, actorsInTheLine),
    )
    .build();
};

export default numericLineGenerator;
