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
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';

import { type Metadata } from '../';

import { type ExecutionProcessor } from './processorGenerator';

export type PositioningState = {|
  instruction: string,
  oldPosition: string,
  newPosition: string,
  metadata: Metadata,
|};

// TODO Flow Type
type BeforeUpdateStateChecker = (state: PositioningState) => Promise<void | Error>;
type BeforeUpdateStateCheckerStorage = Map<string, BeforeUpdateStateChecker>;

/* eslint-disable no-magic-numbers */
const directions = {
  [MOVE_FORWARD]: [0, -1],
  [MOVE_RIGHT]: [1, 0],
  [MOVE_BACKWARD]: [0, 1],
  [MOVE_LEFT]: [-1, 0],
};
/* eslint-enable */

const positioningExecutionProcessorBuilder = (
  metadata: Metadata,
  actor: CodimoComponent,
  beforeUpdateStateCheckers: BeforeUpdateStateCheckerStorage,
): ExecutionProcessor => {
  if (typeof actor.position !== 'string' || typeof actor.updatePosition !== 'function') {
    throw new Error(
      // eslint-disable-next-line max-len
      'The `positioning` engine\'s processor requires the actor to have the `positioning` functionality',
    );
  }

  return {
    async instructionProcessor(instruction: string) {
      if (!directions.hasOwnProperty(instruction)) {
        return;
      }
      const oldPosition = actor.position;
      const newPosition =
        oldPosition
            .split(',')
            .map((pos, idx) => (parseInt(pos) + directions[instruction][idx]))
            .join(',');

      for (const checker of beforeUpdateStateCheckers.values()) {
        await checker({
          instruction,
          oldPosition,
          newPosition,
          metadata,
        });
      }

      await actor.updatePosition(newPosition);
    },
  };
};

export default positioningExecutionProcessorBuilder;
