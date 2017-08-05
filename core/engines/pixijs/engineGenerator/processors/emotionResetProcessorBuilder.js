/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { STOP_STATE }
  from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';

import { type ResetProcessor } from './processorGenerator';

/**
 * This processor must be invoked first because there is an
 * unkown race condition between reseters and the gsap methods.
 *
 * @version 1.0.0
 * @param {CodimoComponent} component [description]
 * @return {ResetProcessor}           The processor itself.
 */
const emotionResetProcessorBuilder = (component: CodimoComponent): ResetProcessor => {
  if (typeof component.beHappy !== 'function') {
    throw new Error(
      '`emotionReset` processor requires the component to have the `emotion` functionality',
    );
  }

  return () => (new Promise(resolve => {
    component.beHappy(STOP_STATE);
    component.beSad(STOP_STATE);

    resolve();
  }));
};

export default emotionResetProcessorBuilder;
