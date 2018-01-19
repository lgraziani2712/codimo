/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import {
  type ResetProcessor,
} from 'core/engines/pixijs/engineGenerator/processors/processorGenerator';

/**
 * Invokes the changeActor functionality for the given component.
 *
 * @version 1.0.0
 * @param {CodimoComponent} component The component to invoke the changeActor method.
 * @return {ResetProcessor} The new reset processor.
 */
const changeActorOnResetBuilder = (
  component: CodimoComponent,
): ResetProcessor => {
  if (typeof component.changeActor !== 'function') {
    throw new Error(
      // eslint-disable-next-line max-len
      '`changeActorOnReset` processor requires the component to have the `changeActor` functionality',
    );
  }

  return () => (Promise.resolve(component.changeActor()));
};

export default changeActorOnResetBuilder;
