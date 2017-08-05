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
  title: 'El número jamás saltó hacia la recta numérica',
  html: parseEmoji('Estará perdido en el laberinto por toda la eternidad 😢'),
});

/**
 * If the component contains a consistent position, it means it didn't reach
 * its objective. Hence the name `starvation` for the thrown error.
 *
 * @version 1.0.0
 * @param  {CodimoComponent} component Required to verify its position.
 * @return {WillStopExecutionChecker}  The checker itself.
 */
const starvationCheckerBuilder = (
  component: CodimoComponent,
): WillStopExecutionChecker => {
  if (typeof component.position !== 'string') {
    throw new Error(
      '`starvation` processor requires the component to have the `positioning` functionality',
    );
  }

  return () => {
    if (component.position) {
      throw starvationError;
    }
  };
};

export default starvationCheckerBuilder;
