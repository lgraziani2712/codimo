/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import parseEmoji from 'core/helpers/parseEmoji';
import {
  MOVE_FORWARD,
  MOVE_RIGHT,
  MOVE_BACKWARD,
  MOVE_LEFT,
} from 'core/constants/instructions';
import { type CodimoComponent } from 'core/engines/pixijs/components/componentGenerator';
import { type EngineData } from 'core/engines/pixijs/engineGenerator';

import { type PositioningState } from '../positioningProcessorBuilder';
import { type Checker } from '../processorGenerator';

import engineErrorBuilder from './engineErrorBuilder';
import HasHitAWallError from './HasHitAWallError.gif';

type ActivePathBorders = {|
  bottom?: boolean,
  left?: boolean,
  right?: boolean,
  top?: boolean,

  [any]: empty,
|};
/**
 * The string represents a coord x,y.
 */
export type EngineData$Path = Map<string, ActivePathBorders>;

const directionsToWalls = {
  [MOVE_FORWARD]: 'top',
  [MOVE_RIGHT]: 'right',
  [MOVE_BACKWARD]: 'bottom',
  [MOVE_LEFT]: 'left',
};

const hasHitaWallError = engineErrorBuilder('HasHitAWallError', {
  imageUrl: HasHitAWallError,
  title: parseEmoji('🙅 POR AHÍ NO 🙅‍♂️'),
  html: '¡UY! ¡TE CHOCASTE LA PARED!<br/>TRATÁ DE SEGUIR EL CAMINO',
});

/**
 * It validates the next position.
 * If there is a wall, it throws a new exection
 * and stop the execution of the animation.
 *
 * @version 1.1.0
 * @param {CodimoComponent | Array<CodimoComponent>} components
 *  The component to check.
 * @param {EngineData} engineData Contains the required data for validation.
 * @return {Checker} The new instance.
 */
export default function hasHitAWallBuilder(
  components: CodimoComponent | Array<CodimoComponent>,
  engineData: EngineData,
): Checker {
  if (!Array.isArray(components)) {
    if (typeof components.hitTheWall !== 'function') {
      throw new Error(
        '`hasHitAWall` checker requires the component to have the `hitTheWall` functionality',
      );
    }
  } else {
    components.forEach(component => {
      if (typeof component.hitTheWall !== 'function') {
        throw new Error(
          '`hasHitAWall` checker requires the component to have the `hitTheWall` functionality',
        );
      }
    });
  }
  if (!Array.isArray(engineData.path)) {
    throw new Error(
      // TODO add the URL for the doc of the path shape!
      '`hasHitAWall` checker requires `engineData.path`. ' +
      'See blablabla for the `path` shape.',
    );
  }
  const paths: EngineData$Path = new Map(engineData.path);

  return async ({ instruction, oldPosition }: PositioningState) => {
    // $FlowDoNotDisturb it exists
    const path: ActivePathBorders = paths.get(oldPosition);
    const direction = instruction.key;
    const idxActor = parseInt(instruction.params[1]);
    const component =
      Array.isArray(components) ? components[idxActor] : components;

    if (!path[directionsToWalls[direction]]) {
      await component.hitTheWall(directionsToWalls[direction]);

      throw hasHitaWallError;
    }
  };
}
