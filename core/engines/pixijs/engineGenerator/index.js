/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container } from 'pixi.js';

import { type Instructions } from 'core/workspaces/blockly/parseInstructions';

import { type ExecutionProcessor, type ResetProcessor } from './processors/processorGenerator';

/**
 * Custom props needs to define its type like the following
 *
 * @example
 * type EngineData$Prop = Type;
 *
 * TODO Add documentation for the basic shape.
 */
export type EngineData = Object;
export type Engine = {|
  view: Container,
  excecuteSetOfInstructions(
    instructions: Instructions,
    handleHighlightBlock: (id: string) => void,
  ): Promise<void>,
  handleResetGame(): Promise<void>,
|};

type EngineViewBuilder = () => Container;
export type EngineGenerator = {|
  addExecutionProcessor(
    key: string,
    processor: ExecutionProcessor,
  ): EngineGenerator,
  addResetProcessor(
    key: string,
    processor: ResetProcessor,
  ): EngineGenerator,
  addWillStopExecutionChecker(
    key: string,
    checker: WillStopExecutionChecker,
  ): EngineGenerator,
  build(): Engine,
|};
export type WillStopExecutionChecker = () => void;

/**
 * Returns an EngineGenerator object for generating a specific
 * engine
 *
 * @todo Add example
 * @version v1.0.0
 * @param  {EngineViewBuilder} viewBuilder This function returns
 *                                         a consistent view.
 * @return {EngineGenerator}               The generator object.
 */
export default function engineGenerator(
  viewBuilder: EngineViewBuilder,
): EngineGenerator {
  const executionProcessors = new Map();
  const willStopExecutionCheckers = new Map();
  const resetProcessors = new Map();

  return {
    /**
     * Adds or replace an ExecutionProcessor
     *
     * @param {string}             key       The processor ID.
     * @param {ExecutionProcessor} processor The processor object.
     * @return {EngineGenerator}             For chaining purpose.
     */
    addExecutionProcessor(key: string, processor: ExecutionProcessor) {
      executionProcessors.set(key, processor);

      return this;
    },
    addWillStopExecutionChecker(key: string, checker: WillStopExecutionChecker) {
      willStopExecutionCheckers.set(key, checker);

      return this;
    },
    /**
     * Adds or replace an ResetProcessor
     *
     * @param {string}         key       The processor ID.
     * @param {ResetProcessor} processor The processor object.
     * @return {EngineGenerator}         For chaining purpose.
     */
    addResetProcessor(key: string, processor: ResetProcessor) {
      resetProcessors.set(key, processor);

      return this;
    },
    /**
     * The builder function. Returns a new Engine instance.
     *
     * @return {Engine} The engine object.
     */
    build(): Engine {
      const view = viewBuilder();

      return {
        view,
        /**
         * Invokes each of the processors in the corresponding order.
         *
         * @param  {Instructions}  instructions         An array of instructions.
         * @param  {Function}      handleHighlightBlock Highlight a block through blockly.
         * @return {Promise<void>}                      The animation Promise.
         */
        async excecuteSetOfInstructions (
          instructions: Instructions,
          handleHighlightBlock: (id: string) => void,
        ) {
          for (let i = 0; i < instructions.length; i++) {
            // 1. Run each of the instructionProcessors sequentially
            for (const execute of executionProcessors.values()) {
              handleHighlightBlock(instructions[i].id);

              await execute(instructions[i]);
            }
          }

          // 2. Run all the willStopExecutingProcessors at the same time
          for (const willStopExecutionCheck of willStopExecutionCheckers.values()) {
            willStopExecutionCheck();
          }
        },
        /**
         * It resets the game.
         *
         * @return {Promise<void>} The animation Promise.
         */
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
