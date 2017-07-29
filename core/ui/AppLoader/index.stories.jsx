/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Container, Sprite } from 'pixi.js';

import { storiesOf } from 'test/storybook-facades';
import basicActorGenerator from 'core/__mocks__/basicActorGenerator';
import gameMetadata, { blocklyData } from 'core/__mocks__/gameMetadata';
import positioningProcessorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/positioningProcessorBuilder';
import engineGenerator from 'core/engines/pixijs/engineGenerator';

import AppLoader from '.';

const metadata = {
  ...gameMetadata,
  blocklyData,
};

storiesOf('ui/AppLoader', module)
    .add('Simple PixiJS & Blockly App', () => {
      const actor = basicActorGenerator(
        gameMetadata.engineData.size,
        gameMetadata.engineData.margin,
      )(Sprite.fromImage('/images/logo.png'), '0,0').build();
      const engineGen = engineGenerator(() => {
        const view = new Container();

        view.addChild(actor.view);

        return view;
      });
      const positioningProcessor = positioningProcessorBuilder(
        actor,
        new Map(),
      );
      const engine = engineGen.addExecutionProcessor('positioning', positioningProcessor).build();

      return (
        <AppLoader
          backgroundImages={[]}
          engine={engine}
          metadata={metadata}
        />
      );
    });
