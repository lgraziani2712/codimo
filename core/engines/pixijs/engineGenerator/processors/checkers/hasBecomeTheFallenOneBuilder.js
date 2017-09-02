/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import parseEmoji from 'core/helpers/parseEmoji';
import { ONE } from 'core/constants/numbers';
import { MOVE_FORWARD } from 'core/constants/instructions';
import { type CodimoComponent } from 'core/engines/pixijs/components/componentGenerator';
import { type EngineData } from 'core/engines/pixijs/engineGenerator';

import { type PositioningState } from '../positioningProcessorBuilder';
import { type Checker } from '../processorGenerator';

import engineErrorBuilder from './engineErrorBuilder';
import PathOverflowErrorURL from './PathOverflowError.gif';

const pathOverflowError = engineErrorBuilder('PathOverflowError', {
  imageUrl: PathOverflowErrorURL,
  title: parseEmoji('😱 ¡OH NO! ¡EL NÚMERO SE CAYÓ! 😱'),
  text: '¿PROBASTE EN SALTAR?',
});

/**
 * What happend if the number is over an exit and it tries to go forward?
 * Since there will be an open door, the engine will try to move it.
 * But there won't be anything after and the component will fall into the void.
 * And we don't want that.
 *
 * @version 1.0.1
 * @param  {CodimoComponent}  component  The component to check.
 * @param  {EngineData}       engineData Contains the required data for validation.
 * @return {Checker}                     The new instance.
 */
export default function hasBecomeTheFallenOneBuilder(
  component: CodimoComponent,
  engineData: EngineData,
): Checker {
  if (typeof component.beTheFallenOne !== 'function') {
    throw new Error(
      '`hasBecomeTheFallenOne` checker requires the component ' +
      'to have the `beTheFallenOne` functionality',
    );
  }
  if (!Array.isArray(engineData.endPositions)) {
    throw new Error(
      // TODO add the URL for the doc of the path shape!
      '`hasBecomeTheFallenOne` checker requires `engineData.exits`. ' +
      'See blablabla for the `exits` shape.',
    );
  }
  const endPositions: Array<string> = engineData.endPositions;

  return async ({ instruction, oldPosition }: PositioningState) => {
    if (
      endPositions.indexOf(oldPosition) !== -ONE &&
      instruction === MOVE_FORWARD
    ) {
      await component.beTheFallenOne();

      throw pathOverflowError;
    }
  };
}
