/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';

import { type ResetProcessor } from './processorGenerator';

const theFallenOneResetProcessorBuilder = (component: CodimoComponent): ResetProcessor => {
  if (typeof component.resetTheFallenOne !== 'function') {
    throw new Error(
      '`theFallenOne` reset processor requires the component to have the ' +
      '`theFallenOne` functionality',
    );
  }

  return () => (Promise.resolve(component.resetTheFallenOne()));
};

export default theFallenOneResetProcessorBuilder;
