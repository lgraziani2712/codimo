/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container, Sprite } from 'pixi.js';

import componentGenerator from 'core/engines/pixijs/components/componentGenerator';
import positioningFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/positioningFunctionalityBuilder';
import engineGenerator from 'core/engines/pixijs/engineGenerator';
import { type Metadata } from 'core/ui/AppLoader';
import processorGenerator from 'core/engines/pixijs/engineGenerator/processors/processorGenerator';
import positioningProcessorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/positioningProcessorBuilder';

export default function helloCodimoEngine(metadata: Metadata) {
  // 1. Create the actor.
  const actor = componentGenerator(
    Sprite.fromImage('/images/logo.png'),
    metadata.engineData.size,
    metadata.engineData.margin,
  )
      // 1.1. Add a functionality.
      .addFunctionality('positioning', positioningFunctionalityBuilder('-1,0'))
      .build();

  // 2. Create the engine.
  return engineGenerator(() => {
    const view = new Container();

    view.addChild(actor.view);

    return view;
  })
      // 2.1. Add a processor.
      .addProcessor(
        'positioning',
        processorGenerator(
          metadata.engineData,
          actor,
          positioningProcessorBuilder,
        ).build(),
      ).build();
}
