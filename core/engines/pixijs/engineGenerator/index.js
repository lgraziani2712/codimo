/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container } from 'pixi.js';

import { type Instructions } from '../executorGenerator';

import { type ExecutionProcessor, type ResetProcessor } from './processors/processorGenerator';

export type Metadata = {
  canvas: {|
    height: number,
    width: number,
  |},
  width: number,
  height: number,
  margin: number,
  size: number,
};
export type Engine = {|
  view: Container,
  excecuteSetOfInstructions(instructions: Instructions): Promise<void>,
  handleResetGame(): Promise<void>,
|};

type EngineViewBuilder = () => Container;
type EngineGenerator = {|
  addExecutionProcessor(
    key: string,
    processor: ExecutionProcessor,
  ): EngineGenerator,
  addResetProcessor(
    key: string,
    processor: ResetProcessor,
  ): EngineGenerator,
  build(): Engine,
|};

export default function engineGenerator(
  viewBuilder: EngineViewBuilder,
): EngineGenerator {
  const willStartExecutingProcessors = new Map();
  const instructionProcessors = new Map();
  const willStopExecutingProcessors = new Map();

  const resetProcessors = new Map();

  return {
    addExecutionProcessor(key: string, processor: ExecutionProcessor) {
      if (processor.willStartExecutingProcessor) {
        willStartExecutingProcessors.set(key, processor.willStartExecutingProcessor);
      }
      if (processor.willStopExecutingProcessor) {
        willStopExecutingProcessors.set(key, processor.willStopExecutingProcessor);
      }
      instructionProcessors.set(key, processor.instructionProcessor);

      return this;
    },
    addResetProcessor(key: string, processor: ResetProcessor) {
      resetProcessors.set(key, processor);

      return this;
    },
    build() {
      const view = viewBuilder();

      return {
        view,
        async excecuteSetOfInstructions(instructions: Instructions) {
          const willStartExecutingProcessorsPromises = [];
          const willStopExecutingProcessorsPromises = [];

          // 1. Run all the willStartExecutingProcessors at the same time
          for (const willStartExecutingProcessor of willStartExecutingProcessors.values()) {
            willStartExecutingProcessorsPromises.push(willStartExecutingProcessor());
          }

          await Promise.all(willStartExecutingProcessorsPromises);

          // 2. Run each of the instructionProcessors sequentially
          for (let i = 0; i < instructions.length; i++) {
            for (const instructionProcessor of instructionProcessors.values()) {
              await instructionProcessor(instructions[i]);
            }
          }

          // 3. Run all the willStopExecutingProcessors at the same time
          for (const willStopExecutingProcessor of willStopExecutingProcessors.values()) {
            willStopExecutingProcessorsPromises.push(willStopExecutingProcessor());
          }

          await Promise.all(willStopExecutingProcessorsPromises);
        },
        async handleResetGame() {
          const resetProcessorsPromises = [];

          for (const resetProcessor of resetProcessors.values()) {
            resetProcessorsPromises.push(resetProcessor());
          }

          await Promise.all(resetProcessorsPromises);
        },
      };
    },
  };
}
