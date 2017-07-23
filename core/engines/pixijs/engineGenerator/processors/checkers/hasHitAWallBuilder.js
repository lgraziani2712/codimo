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

export default function hasHitAWallBuilder(
  actor: CodimoComponent,
  hasHitaWallError?: ClientError = defaultError,
): Checker {
  if (typeof actor.hitTheWall !== 'function') {
    throw new Error(
      'The `hasHitAWall` checker requires the actor to have the `hitTheWall` functionality',
    );
  }

  return async ({ metadata, instruction, oldPosition }: PositioningState) => {
    // $FlowDoNotDisturb it exists
    const path: ActivePathBorders = metadata.path.get(oldPosition);

    if (!path[directionsToWalls[instruction]]) {
      await actor.hitTheWall(directionsToWalls[instruction]);

      throw hasHitaWallError;
    }
  };
}
