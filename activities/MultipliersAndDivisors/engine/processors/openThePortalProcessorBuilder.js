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

import { OPEN_PORTAL } from '../../constants';

/**
 * Process the `OPEN_PORTAL` instruction.
 *
 * @version 1.0.0
 * @param {CodimoComponent | Array<CodimoComponent>} components
 *  The actor(s) which will open the portal.
 * @return {ExecutionProcessor} The new processor.
 */
const openThePortalProcessorBuilder = (
  components: CodimoComponent | Array<CodimoComponent>,
): ExecutionProcessor =>
  // TODO: Make pre execution checks.
  async (instruction: Instruction) => {
    if (instruction.key !== OPEN_PORTAL) {
      return;
    }
    if (!Array.isArray(components)) {
      await components.openThePortal(instruction.params[0]);

      return;
    }
    for (let i = 0; i < components.length; i++) {
      const component = components[i];

      await component.openThePortal(instruction.params[0]);
    }
  };

export default openThePortalProcessorBuilder;
