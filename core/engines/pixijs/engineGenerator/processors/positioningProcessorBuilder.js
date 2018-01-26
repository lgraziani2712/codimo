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

import { type ExecutionProcessor, type ResetProcessor } from './processorGenerator';

export type PositioningState = {|
  instruction: Instruction,
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
 * Positioning Processor Builder.
 *
 * @todo Add example
 * @version 1.1.0
 * @param { CodimoComponent | Array<CodimoComponent> } components
 *  The component that will have attached the processor.
 * @param {CheckersCollection} checkers A collection of Checker objects.
 * @return {ExecutionProcessor} The new instance.
 */
export const positioningProcessorBuilder = (
  components: CodimoComponent | Array<CodimoComponent>,
  checkers: CheckersCollection,
): ExecutionProcessor => {
  if (!Array.isArray(components)) {
    if (
      typeof components.position !== 'string' ||
      typeof components.updatePosition !== 'function'
    ) {
      throw new Error(
        '`positioning` processor requires the component to have the `positioning` functionality',
      );
    }
  } else {
    components.forEach(component => {
      if (
        typeof component.position !== 'string' ||
        typeof component.updatePosition !== 'function'
      ) {
        throw new Error(
          '`positioning` processor requires the component to have the `positioning` functionality',
        );
      }
    });
  }

  /**
   * This ExecutionProcessor updates the component's position
   * while animating it.
   *
   * @version 1.1.0
   * @param {Instruction} instruction The new instruction object.
   * @param {string} instruction.key The name of the instruction.
   * @param {Array<string>} instruction.params The instruction parameters.
   * @return {Promise} An animation promise.
   */
  return async (instruction: Instruction) => {
    const direction = instruction.key;

    // Checks if the name of the instruction is one of those four.
    if (!directions.hasOwnProperty(direction)) {
      return;
    }
    const times = parseInt(instruction.params[0]);
    const idxActor = parseInt(instruction.params[1]);
    const component =
      Array.isArray(components) ? components[idxActor] : components;

    for (let i = 0; i < times; i++) {
      const oldPosition = component.position;
      const newPosition =
        oldPosition
          .split(',')
          .map((pos, idx) => (parseInt(pos) + directions[direction][idx]))
          .join(',');

      for (const checker of checkers.values()) {
        await checker({
          instruction,
          oldPosition,
          newPosition,
        });
      }

      await component.updatePosition(newPosition);
    }
  };
};

/**
 * Positioning Processor Builder.
 *
 * @todo Add example
 * @version 1.1.0
 * @param { CodimoComponent | Array<CodimoComponent> } components
 *  The component that will have attached the processor.
 * @return {Promise<void>} Promise to reset the component(s)' position.
 */
export const positionResetProcessorBuilder = (
  components: CodimoComponent | Array<CodimoComponent>,
): ResetProcessor => {
  if (!Array.isArray(components)) {
    if (typeof components.resetPosition !== 'function') {
      throw new Error(
        '`positioning` reset processor requires the component to have the ' +
        '`positioning` functionality',
      );
    }
  } else {
    components.forEach(component => {
      if (typeof component.resetPosition !== 'function') {
        throw new Error(
          '`positioning` reset processor requires the component to have the ' +
          '`positioning` functionality',
        );
      }
    });
  }

  return () => (
    !Array.isArray(components)
      ? Promise.resolve(components.resetPosition())
      : Promise.resolve(
        components.forEach(component => {
          component.resetPosition();
        }),
      )
  );
};
