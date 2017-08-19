/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container, Sprite } from 'pixi.js';

import { ANCHOR_CENTER } from 'core/constants/numbers';
import componentGenerator from 'core/engines/pixijs/components/componentGenerator';
import positioningFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/positioningFunctionalityBuilder';
import engineGenerator from 'core/engines/pixijs/engineGenerator';
import { type Metadata } from 'core/ui/Activity';
import processorGenerator from 'core/engines/pixijs/engineGenerator/processors/processorGenerator';
import {
  positioningProcessorBuilder,
  positionResetProcessorBuilder,
} from 'core/engines/pixijs/engineGenerator/processors/positioningProcessorBuilder';

export default function helloCodimoEngine(metadata: Metadata) {
  /////////////////////////////////////
  // 1. Create the actor's view.
  /////////////////////////////////////
  const view = new Container();
  const actorView = Sprite.fromImage('/images/logo.png');

  view.addChild(actorView);

  /////////////////////////////////////
  // 2. Create the actor's component.
  /////////////////////////////////////
  const actor = componentGenerator(
    actorView,
    metadata.engineData.size,
    metadata.engineData.margin,
  )
      /////////////////////////////////////
      // 2.1. Add a functionality.
      /////////////////////////////////////
      .addFunctionality('positioning', positioningFunctionalityBuilder('0,0'))
      .build();

  actor.view.anchor.set(ANCHOR_CENTER);
  actor.view.width = actor.view.height = metadata.engineData.size;

  /////////////////////////////////////
  // 3. Create the engine.
  /////////////////////////////////////
  return engineGenerator(view)
      /////////////////////////////////////
      // 3.1. Add an execution processor.
      /////////////////////////////////////
      .addExecutionProcessor(
        'positioning',
        processorGenerator(
          metadata.engineData,
          actor,
          positioningProcessorBuilder,
        ).build(),
      )
      /////////////////////////////////////
      // 3.2. Add a reset processor.
      /////////////////////////////////////
      .addResetProcessor('positioning', positionResetProcessorBuilder(actor))
      /////////////////////////////////////
      // 3.3. Build.
      /////////////////////////////////////
      .build();
}
