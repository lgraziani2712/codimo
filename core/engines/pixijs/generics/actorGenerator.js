/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container } from 'pixi.js';

import { type EngineData, type EngineGenerator } from 'core/engines/pixijs/engineGenerator';
import componentGenerator, {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import processorGenerator from 'core/engines/pixijs/engineGenerator/processors/processorGenerator';
import positioningProcessorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/positioningProcessorBuilder';
import positioningFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/positioningFunctionalityBuilder';
import hitTheWallFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/hitTheWallFunctionalityBuilder';
import emotionFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';
import theFallenOneFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/theFallenOneFunctionalityBuilder';
import hasHitAWallBuilder
  from 'core/engines/pixijs/engineGenerator/processors/checkers/hasHitAWallBuilder';

export const actorGenerator = (size: number, margin: number) =>
  (view: Container, position: string) => (
    componentGenerator(view, size, margin)
        .addFunctionality('positioning', positioningFunctionalityBuilder(position))
        .addFunctionality('hitTheWall', hitTheWallFunctionalityBuilder())
        .addFunctionality('emotions', emotionFunctionalityBuilder)
        .addFunctionality('beTheFallenOne', theFallenOneFunctionalityBuilder)
  );

export const actorProcessors = (
  engineData: EngineData,
  actor: CodimoComponent,
  engineGenerator: EngineGenerator,
): EngineGenerator => (
  engineGenerator
      .addProcessor(
        'positioning',
        processorGenerator(
          engineData,
          actor,
          positioningProcessorBuilder,
        ).addChecker('hashitwall', hasHitAWallBuilder).build(),
      )
);
