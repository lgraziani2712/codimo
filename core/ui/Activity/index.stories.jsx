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
import {
  positioningProcessorBuilder,
} from 'core/engines/pixijs/engineGenerator/processors/positioningProcessorBuilder';
import engineGenerator from 'core/engines/pixijs/engineGenerator';

import Activity from '.';

const metadata = {
  activityName: 'Simple PixiJS & Blockly App',
  ...gameMetadata,
  blocklyData,
};

storiesOf('ui/Activity', module)
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
        <Activity
          backgroundImages={[]}
          engine={engine}
          metadata={metadata}
        />
      );
    });
