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
import { type ExecutionProcessor }
  from 'core/engines/pixijs/engineGenerator/processors/processorGenerator';
import engineErrorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/checkers/engineErrorBuilder';
import {
  START_STATE,
} from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';

import { LEAVE_MAZE } from '../../constants';
import { type EngineData$NumericLineData } from '../components/numericLineGenerator';
import MazeExitErrorURL from '../../images/MazeExitError.png';
import MazeWrongExitErrorURL from '../../images/MazeWrongExitError.png';

const mazeExitError = engineErrorBuilder('MazeExitError', {
  imageUrl: MazeExitErrorURL,
  title: parseEmoji('🤖 NO PUDO SALTAR 🤖'),
  text: 'EL NÚMERO SÓLO PUEDE SALTAR CUANDO ESTÁ EN EL FINAL DEL LABERINTO',
});
const mazeWrongExitError = engineErrorBuilder('MazeWrongExitError', {
  imageUrl: MazeWrongExitErrorURL,
  title: parseEmoji('👻 ¡OJO! ¿QUÉ PASO? 👻'),
  // eslint-disable-next-line max-len
  html: '¿EL NÚMERO ES MÁS <b>GRANDE</b> QUE EL DE SU <b>IZQUIERDA</b> Y MÁS <b>CHICO</b> QUE EL DE SU <b>DERECHA</b>?',
});

type Props = {
  exits: Array<string>,
  numericLineData: EngineData$NumericLineData,
};

/**
 * The NumericLine end-game processor.
 * It verifies if the number has entered
 * the numeric line and in which empty slot.
 * Informs the result to the user.
 *
 * @version 1.0.1
 * @param {CodimoComponent} number The actor.
 * @param {CodimoComponent} numericLine The numeric line which the actor will enter.
 * @param {Array<string>} exits An array of possible endings.
 * @param {EngineData$NumericLineData} numericLineData Metadata required by the numeric line.
 * @return {ExecutionProcessor} The new processor.
 */
const hasLeftTheMazeProcessorBuilder = (
  number: CodimoComponent,
  numericLine: CodimoComponent,
  { exits, numericLineData }: Props,
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
    const exitIdx = exits.indexOf(number.position);

    if (exitIdx === NOT_EXIST) {
      throw mazeExitError;
    }
    const exit = exits[exitIdx];

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
