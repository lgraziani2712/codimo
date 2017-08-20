/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { NOT_EXIST } from 'core/constants/numbers';
import parseEmoji from 'core/helpers/parseEmoji';
import { type Instruction } from 'core/workspaces/blockly/parseInstructions';
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import { LEAVE_MAZE } from 'activities/NumericLine/constants';
import { type ExecutionProcessor }
  from 'core/engines/pixijs/engineGenerator/processors/processorGenerator';
import engineErrorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/checkers/engineErrorBuilder';
import {
  START_STATE,
} from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';

import { type EngineData$NumericLineData } from '../components/numericLineGenerator';
import MazeExitError from '../../images/MazeExitError.png';

const mazeExitError = engineErrorBuilder('MazeExitError', {
  // FIXME add folder for images or make a loader for activity files
  imageUrl: MazeExitError,
  title: parseEmoji('🤖 El número no pudo saltar 🤖'),
  text: 'El número solo tiene fuerzas para saltar cuando llega a una salida',
});
const mazeWrongExitError = engineErrorBuilder('MazeWrongExitError', {
  title: parseEmoji('👻 El número se equivocó de lugar 👻'),
  text: '¿El número es más grande que el de su izquierda y más chico que el de su derecha?',
});

type Props = {
  endPositions: Array<string>,
  numericLineData: EngineData$NumericLineData,
};

/**
 * The NumericLine end-game processor.
 * It verifies if the number has entered the numeric and in which empty slot.
 * Informs the result to the user.
 *
 * @version 1.0.0
 * @param  {CodimoComponent}            number          The actor.
 * @param  {CodimoComponent}            numericLine     The numeric line which the actor will enter.
 * @param  {Array<string>}              endPositions    An array of possible endings.
 * @param  {EngineData$NumericLineData} numericLineData Metadata required by the numeric line.
 * @return {ExecutionProcessor}                         The new processor.
 */
const hasLeftTheMazeProcessorBuilder = (
  number: CodimoComponent,
  numericLine: CodimoComponent,
  { endPositions, numericLineData }: Props,
): ExecutionProcessor => {
  if (
    typeof number.position !== 'string' ||
    typeof number.updatePosition !== 'function' ||
    typeof number.endPosition !== 'string'
  ) {
    throw new Error(
      '`hasLeftTheMaze` processor requires the component to have the `positioning` functionality',
    );
  }
  if (
    typeof number.beSad !== 'function' ||
    typeof number.beHappy !== 'function'
  ) {
    throw new Error(
      '`hasLeftTheMaze` processor requires the component to have the `emotion` functionality',
    );
  }

  return async (instruction: Instruction) => {
    if (instruction.key !== LEAVE_MAZE) {
      return;
    }
    const exitIdx = endPositions.indexOf(number.position);

    if (exitIdx === NOT_EXIST) {
      throw mazeExitError;
    }
    const exit = endPositions[exitIdx];

    await numericLine.receiveNumberAtPosition(number, numericLineData.accesses[exitIdx]);

    if (exit !== number.endPosition) {
      number.beSad(START_STATE);
      numericLine.beSad(START_STATE);

      throw mazeWrongExitError;
    }

    number.beHappy(START_STATE);
    numericLine.beHappy(START_STATE);
  };
};

export default hasLeftTheMazeProcessorBuilder;
