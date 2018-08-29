/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import { type WillStopExecutionChecker } from 'core/engines/pixijs/engineGenerator';

/**
 * Resets every actor from the numeric line before the game starts again.
 *
 * @version 1.0.0
 * @param {CodimoComponent} numericLine
 *  The actor that know how to verify if their children are in order.
 * @return {void}
 */
const resetActorsFromNumericLine = (
  numericLine: CodimoComponent,
): WillStopExecutionChecker => () => {
  numericLine.resetActors();
};

export default resetActorsFromNumericLine;
