/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type CodimoComponent } from 'core/engines/pixijs/components/componentGenerator';

type Metadata = Object;

export type Checker = (state: any) => Promise<void | Error>;
type CheckerBuilder = (actor: CodimoComponent) => Checker;

export type ResetProcessor = () => Promise<void>;
export type ExecutionProcessor = {|
  willStartExecutingProcessor?: () => Promise<void>,
  instructionProcessor(instruction: string): Promise<void>,
  willStopExecutingProcessor?: () => Promise<void>,
|};

type ProcessorBuilder = (
  metadata: Metadata,
  actor: CodimoComponent,
  beforeUpdateStateCheckers: Map<string, Checker>,
) => ExecutionProcessor | ResetProcessor;

type ProcessorGenerator = {|
  addChecker(
    key: string,
    checker: CheckerBuilder,
  ): ProcessorGenerator,
  build(): ExecutionProcessor | ResetProcessor,
|};

/**
 * It helps to generate a new processor.
 * The processor is associated to a specific component.
 *
 * @todo Add example
 * @version 1.0.0
 * @param  {Metadata}         metadata         Required by the ProcessorBuilder.
 * @param  {CodimoComponent}  actor            Required by the ProcessorBuilder.
 * @param  {ProcessorBuilder} processorBuilder The ProcessorBuilder itself.
 * @return {ProcessorGenerator}                The generator object.
 */
export default function processorGenerator(
  metadata: Metadata,
  actor: CodimoComponent,
  processorBuilder: ProcessorBuilder,
): ProcessorGenerator {
  const checkers = new Map();

  return {
    /**
     * Adds or replace a Checker for the Processor
     *
     * @param {string}         key     The checker ID.
     * @param {CheckerBuilder} checker The builder function.
     * @return {ProcessorGenerator}    For chaining purpose.
     */
    addChecker(key: string, checker: CheckerBuilder) {
      checkers.set(key, checker(actor));

      return this;
    },
    /**
     * The builder function. Returns a new Processor instance.
     *
     * @return {ExecutionProcessor | ResetProcessor} The processor object.
     */
    build() {
      return processorBuilder(metadata, actor, checkers);
    },
  };
}
