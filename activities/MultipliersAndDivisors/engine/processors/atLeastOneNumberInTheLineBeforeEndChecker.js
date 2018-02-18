/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import parseEmoji from 'core/helpers/parseEmoji';
import {
  START_STATE,
} from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import { type WillStopExecutionChecker } from 'core/engines/pixijs/engineGenerator';
import engineErrorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/checkers/engineErrorBuilder';

import MazeWrongExitErrorURL from '../../images/MazeWrongExitError.png';

const noNumbersInTheLineError = engineErrorBuilder('NoNumbersInTheLineError', {
  imageUrl: MazeWrongExitErrorURL,
  title: parseEmoji('👻 ¡UPS! NO PASÓ NADA 👻'),
  html: '¡INTENTÁ MOVER UN NÚMERO!',
});

/**
 * Executes the verification that check if all the numbers are in order.
 *
 * @version 1.0.0
 * @param {CodimoComponent} numericLine
 *  The actor that know how to verify if their children are in order.
 * @return {void}
 */
const atLeastOneNumberInTheLineBeforeEndChecker = (
  numericLine: CodimoComponent,
): WillStopExecutionChecker => () => {
  if (numericLine.thereAreNoActorsInTheLine()) {
    numericLine.beSad(START_STATE);

    throw noNumbersInTheLineError;
  }
};

export default atLeastOneNumberInTheLineBeforeEndChecker;
