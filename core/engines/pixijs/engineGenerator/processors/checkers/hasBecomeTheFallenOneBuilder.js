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
 * @version 1.1.0
 * @param {CodimoComponent | Array<CodimoComponent>} components
 *  The component to check.
 * @param {EngineData} engineData Contains the required data for validation.
 * @return {Checker} The new instance.
 */
export default function hasBecomeTheFallenOneBuilder(
  components: CodimoComponent | Array<CodimoComponent>,
  engineData: EngineData,
): Checker {
  if (!Array.isArray(components)) {
    if (typeof components.beTheFallenOne !== 'function') {
      throw new Error(
        '`hasBecomeTheFallenOne` checker requires the component ' +
        'to have the `beTheFallenOne` functionality',
      );
    }
  } else {
    components.forEach(component => {
      if (typeof component.beTheFallenOne !== 'function') {
        throw new Error(
          '`hasBecomeTheFallenOne` checker requires the component ' +
          'to have the `beTheFallenOne` functionality',
        );
      }
    });
  }
  if (!Array.isArray(engineData.exits)) {
    throw new Error(
      // TODO add the URL for the doc of the path shape!
      '`hasBecomeTheFallenOne` checker requires `engineData.exits`. ' +
      'See blablabla for the `exits` shape.',
    );
  }
  const endPositions: Array<string> = engineData.exits;

  return async ({ instruction, oldPosition }: PositioningState) => {
    const direction = instruction.key;
    const idxActor = parseInt(instruction.params[1]);
    const component =
      Array.isArray(components) ? components[idxActor] : components;

    if (
      endPositions.indexOf(oldPosition) !== -ONE
      && direction === MOVE_FORWARD
    ) {
      await component.beTheFallenOne();

      throw pathOverflowError;
    }
  };
}
