/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Instruction } from 'core/workspaces/blockly/parseInstructions';
import {
  MOVE_FORWARD,
  MOVE_RIGHT,
  MOVE_BACKWARD,
  MOVE_LEFT,
} from 'core/constants/instructions';
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';

import { type ExecutionProcessor } from './processorGenerator';

export type PositioningState = {|
  instruction: string,
  oldPosition: string,
  newPosition: string,
|};

type BeforeUpdateStateChecker = (state: PositioningState) => Promise<void | Error>;
type CheckersCollection = Map<string, BeforeUpdateStateChecker>;

/* eslint-disable no-magic-numbers */
const directions = {
  [MOVE_FORWARD]: [0, -1],
  [MOVE_RIGHT]: [1, 0],
  [MOVE_BACKWARD]: [0, 1],
  [MOVE_LEFT]: [-1, 0],
};
/* eslint-enable */

/**
 * This ExecutionProcessor updates the component's position
 * while animating it.
 *
 * @todo Add example
 * @version 1.0.0
 * @param  {CodimoComponent}    component The component that will have attached the processor.
 * @param  {CheckersCollection} checkers  A collection of Checker objects.
 * @return {ExecutionProcessor}           The new instance.
 */
const positioningExecutionProcessorBuilder = (
  component: CodimoComponent,
  checkers: CheckersCollection,
): ExecutionProcessor => {
  if (
    typeof component.position !== 'string' ||
    typeof component.updatePosition !== 'function'
  ) {
    throw new Error(
      // eslint-disable-next-line max-len
      'The `positioning` engine\'s processor requires the component to have the `positioning` functionality',
    );
  }

  return {
    async instructionProcessor(instruction: Instruction) {
      const direction = instruction.key;
      const times = parseInt(instruction.params[0]);

      if (!directions.hasOwnProperty(direction)) {
        return;
      }
      for (let i = 0; i < times; i++) {
        const oldPosition = component.position;
        const newPosition =
          oldPosition
              .split(',')
              .map((pos, idx) => (parseInt(pos) + directions[direction][idx]))
              .join(',');

        for (const checker of checkers.values()) {
          await checker({
            instruction: direction,
            oldPosition,
            newPosition,
          });
        }

        await component.updatePosition(newPosition);
      }
    },
  };
};

export default positioningExecutionProcessorBuilder;
