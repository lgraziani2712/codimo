/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container } from 'pixi.js';

import { type EngineData, type EngineGenerator } from '../engineGenerator';
import componentGenerator, {
  type CodimoComponent,
} from '../components/componentGenerator';
import processorGenerator from '../engineGenerator/processors/processorGenerator';
import {
  positioningProcessorBuilder,
  positionResetProcessorBuilder,
} from '../engineGenerator/processors/positioningProcessorBuilder';
import emotionResetProcessorBuilder
  from '../engineGenerator/processors/emotionResetProcessorBuilder';
import theFallenOneResetProcessorBuilder
  from '../engineGenerator/processors/theFallenOneResetProcessorBuilder';
import positioningFunctionalityBuilder
  from '../components/functionalities/positioningFunctionalityBuilder';
import hitTheWallFunctionalityBuilder
  from '../components/functionalities/hitTheWallFunctionalityBuilder';
import emotionFunctionalityBuilder
  from '../components/functionalities/emotionFunctionalityBuilder';
import theFallenOneFunctionalityBuilder
  from '../components/functionalities/theFallenOneFunctionalityBuilder';
import hasHitAWallBuilder
  from '../engineGenerator/processors/checkers/hasHitAWallBuilder';
import hasBecomeTheFallenOneBuilder
  from '../engineGenerator/processors/checkers/hasBecomeTheFallenOneBuilder';
import starvationCheckerBuilder
  from '../engineGenerator/beforeStopExecutionCheckers/starvationCheckerBuilder';

export const actorGenerator = (
  view: Container,
  size: number,
  margin: number,
  startPosition: string,
  endPosition: string,
) => (
  componentGenerator(view, size, margin)
    .addFunctionality(
      'positioning',
      positioningFunctionalityBuilder(startPosition, endPosition),
    )
    .addFunctionality('hitTheWall', hitTheWallFunctionalityBuilder())
    .addFunctionality('emotions', emotionFunctionalityBuilder)
    .addFunctionality('theFallenOne', theFallenOneFunctionalityBuilder)
);

export const actorProcessors = (
  engineData: EngineData,
  actor: CodimoComponent,
  engineGenerator: EngineGenerator,
): EngineGenerator => (
  engineGenerator
  ////////////////////////////
  // Execution Processors
  ////////////////////////////
    .addExecutionProcessor(
      'positioning',
      processorGenerator(engineData, actor, positioningProcessorBuilder)
        .addChecker('hasHitAWall', hasHitAWallBuilder)
        .addChecker('theFallenOne', hasBecomeTheFallenOneBuilder)
        .build(),
    )
  ////////////////////////////
  // Will Stop Checkers
  ////////////////////////////
    .addWillStopExecutionChecker('starvation', starvationCheckerBuilder(actor))
  ////////////////////////////
  // Reset Processors
  ////////////////////////////
    .addResetProcessor('emotions', emotionResetProcessorBuilder(actor))
    .addResetProcessor('theFallenOne', theFallenOneResetProcessorBuilder(actor))
    .addResetProcessor('positioning', positionResetProcessorBuilder(actor))
);
