/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  MOVE_FORWARD,
  MOVE_RIGHT,
  MOVE_BACKWARD,
  MOVE_LEFT,
} from 'core/constants/instructions';
import { type CodimoComponent } from 'core/engines/pixijs/components/componentGenerator';

import { type PositioningState } from '../positioningProcessorBuilder';
import { type Checker } from '../processorGenerator';

import { type ClientError } from './engineErrorBuilder';
import hasHitAWallErrorGenerator from './hasHitAWallErrorGenerator';

type ActivePathBorders = {|
  bottom?: boolean,
  left?: boolean,
  right?: boolean,
  top?: boolean,
|};

const directionsToWalls = {
  [MOVE_FORWARD]: 'top',
  [MOVE_RIGHT]: 'right',
  [MOVE_BACKWARD]: 'bottom',
  [MOVE_LEFT]: 'left',
};
const defaultError = hasHitAWallErrorGenerator();

/**
 * It validates the next position.
 * If there is a wall, it throws a new exection
 * and stop the execution of the animation.
 *
 * @version 1.0.0
 * @param  {CodimoComponent}  component        The component to check.
 * @param  {ClientError}      hasHitaWallError The kind of error to throw.
 * @return {Checker}                           The new instance.
 */
export default function hasHitAWallBuilder(
  component: CodimoComponent,
  hasHitaWallError?: ClientError = defaultError,
): Checker {
  if (typeof component.hitTheWall !== 'function') {
    throw new Error(
      'The `hasHitAWall` checker requires the component to have the `hitTheWall` functionality',
    );
  }

  return async ({ metadata, instruction, oldPosition }: PositioningState) => {
    // $FlowDoNotDisturb it exists
    const path: ActivePathBorders = metadata.path.get(oldPosition);

    if (!path[directionsToWalls[instruction]]) {
      await component.hitTheWall(directionsToWalls[instruction]);

      throw hasHitaWallError;
    }
  };
}
