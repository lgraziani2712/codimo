/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import parseEmoji from 'core/helpers/parseEmoji';
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';

import engineErrorBuilder from '../processors/checkers/engineErrorBuilder';
import { type WillStopExecutionChecker } from '../';

import StarvationError from './StarvationError.png';

const starvationError = engineErrorBuilder('StarvationError', {
  imageUrl: StarvationError,
  title: '¡UPS! EL NÚMERO NUNCA LLEGÓ A LA RECTA',
  html: parseEmoji('😢 Y NO PODRÁ VOLVER CON SUS AMIGOS 😢'),
});

/**
 * If the component contains a consistent position, it means it didn't reach
 * its objective. Hence the name `starvation` for the thrown error.
 *
 * @version 1.1.0
 * @param {CodimoComponent | Array<CodimoComponent>} components
 *  Required to verify its position.
 * @return {WillStopExecutionChecker} The checker itself.
 */
const starvationCheckerBuilder = (
  components: CodimoComponent | Array<CodimoComponent>,
): WillStopExecutionChecker => {
  if (!Array.isArray(components)) {
    if (typeof components.position !== 'string') {
      throw new Error(
        '`starvation` processor requires the component to have the `positioning` functionality',
      );
    }
  } else {
    components.forEach(component => {
      if (typeof component.position !== 'string') {
        throw new Error(
          '`starvation` processor requires the component to have the `positioning` functionality',
        );
      }
    });
  }

  return () => {
    if (!Array.isArray(components)) {
      if (components.isMoving) {
        throw starvationError;
      }

      return;
    }

    components.forEach(component => {
      if (component.isMoving) {
        throw starvationError;
      }
    });
  };
};

export default starvationCheckerBuilder;
