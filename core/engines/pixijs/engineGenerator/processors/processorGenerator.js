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

export default function processorGenerator(
  metadata: Metadata,
  actor: CodimoComponent,
  processorBuilder: ProcessorBuilder,
): ProcessorGenerator {
  const checkers = new Map();

  return {
    addChecker(key: string, checker: CheckerBuilder) {
      checkers.set(key, checker(actor));

      return this;
    },
    build() {
      return processorBuilder(metadata, actor, checkers);
    },
  };
}
