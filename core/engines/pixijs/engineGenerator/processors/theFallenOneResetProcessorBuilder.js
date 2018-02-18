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

/**
 * It resets the actor if it has the `theFallenOne` functionality.
 *
 * @version 1.1.0
 * @param {CodimoComponent | Array<CodimoComponent>} components
 *  The component to be processed.
 * @return {ResetProcessor} The processor itself.
 */
const theFallenOneResetProcessorBuilder = (
  components: CodimoComponent | Array<CodimoComponent>,
): ResetProcessor => {
  if (!Array.isArray(components)) {
    if (typeof components.resetTheFallenOne !== 'function') {
      throw new Error(
        '`theFallenOne` reset processor requires the component to have the ' +
        '`theFallenOne` functionality',
      );
    }
  } else {
    components.forEach(component => {
      if (typeof component.resetTheFallenOne !== 'function') {
        throw new Error(
          '`theFallenOne` reset processor requires the component to have the ' +
          '`theFallenOne` functionality',
        );
      }
    });
  }

  return () => (
    !Array.isArray(components)
      ? Promise.resolve(components.resetTheFallenOne())
      : Promise.resolve(
        components.forEach(component => {
          component.resetTheFallenOne();
        }),
      )
  );
};

export default theFallenOneResetProcessorBuilder;
