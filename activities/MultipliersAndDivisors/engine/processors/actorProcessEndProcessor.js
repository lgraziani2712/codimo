/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

import { type Instruction } from 'core/workspaces/blockly/parseInstructions';
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import { type ExecutionProcessor }
  from 'core/engines/pixijs/engineGenerator/processors/processorGenerator';
import starvationCheckerBuilder
  from 'core/engines/pixijs/engineGenerator/beforeStopExecutionCheckers/starvationCheckerBuilder';

import { ACTOR_PROCESS_STOP } from '../../constants';

/**
 * Process the `ACTOR_PROCESS_STOP` instruction.
 *
 * @version 1.0.0
 * @param {Array<CodimoComponent>} components Actors to be validated.
 * @return {ExecutionProcessor} The new processor.
 */
const actorProcessEndProcessor = (
  components: Array<CodimoComponent>,
): ExecutionProcessor => (
  async (instruction: Instruction) => {
    if (instruction.key !== ACTOR_PROCESS_STOP) {
      return;
    }
    const actorIdx = parseInt(instruction.params[0]);
    const starvationChecker = starvationCheckerBuilder(components[actorIdx]);

    await starvationChecker();
  }
);

export default actorProcessEndProcessor;
