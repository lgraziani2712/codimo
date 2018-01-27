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

import { LEAVE_MAZE } from '../../constants';
import { type NumericLineMetadata } from '../components/numericLineGenerator';
import MazeExitErrorURL from '../../images/MazeExitError.png';

const mazeExitError = engineErrorBuilder('MazeExitError', {
  imageUrl: MazeExitErrorURL,
  title: parseEmoji('🤖 NO PUDO SALTAR 🤖'),
  text: 'EL NÚMERO SÓLO PUEDE SALTAR CUANDO ESTÁ EN EL FINAL DEL LABERINTO',
});

type Props = {
  exits: Array<string>,
  numericLineData: NumericLineMetadata,
};

/**
 * Process the `LEAVE_MAZE` instruction, and it verifies
 * if the number has entered the numeric lineand in
 * which empty slot.
 *
 * @version 1.0.0
 * @param {Array<CodimoComponent>} numbers The array of actors.
 * @param {CodimoComponent} numericLine
 *  The numeric line which the actor will enter.
 * @param {Object} engineData The exercise data.
 * @param {Array<string>} engineData.exits An array of possible endings.
 * @param {NumericLineMetadata} engineData.numericLineData
 *  Metadata required by the numeric line.
 * @return {ExecutionProcessor} The new processor.
 */
const hasLeftTheMazeProcessorBuilder = (
  numbers: Array<CodimoComponent>,
  numericLine: CodimoComponent,
  { exits, numericLineData }: Props,
): ExecutionProcessor =>
  async (instruction: Instruction) => {
    if (instruction.key !== LEAVE_MAZE) {
      return;
    }
    const idxActor = parseInt(instruction.params[0]);
    const number = numbers[idxActor];
    const exitIdx = exits.indexOf(number.position);

    if (exitIdx === NOT_EXIST) {
      throw mazeExitError;
    }

    await numericLine.receiveNumberAtPosition(number, numericLineData.accesses[exitIdx]);
  };

export default hasLeftTheMazeProcessorBuilder;
