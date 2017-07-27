/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * NOTE: This stories represents integration tests.
 * They cannot be automated because of PixiJS.
 * Let's see what pixijs@5 hold for us.
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import React from 'react';
import wait from 'speculation/wait';
import { Container, Sprite } from 'pixi.js';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import {
  MOVE_FORWARD_MOCK,
  MOVE_RIGHT_MOCK,
  MOVE_BACKWARD_MOCK,
  MOVE_LEFT_MOCK,
} from 'core/__mocks__/InstructionsMock';
import gameMetadata from 'core/__mocks__/gameMetadata';
import basicActorGenerator from 'core/__mocks__/basicActorGenerator';

import positioningProcessorBuilder from './processors/positioningProcessorBuilder';

import engineGenerator from '.';

storiesOf('engines/pixijs/engineGenerator', module)
    .add('Simple engine with positioning', () => {
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
        gameMetadata.engineData,
        actor,
        new Map(),
      );
      const engine = engineGen.addExecutionProcessor('positioning', positioningProcessor).build();

      const instructions = [
        MOVE_FORWARD_MOCK,
        MOVE_LEFT_MOCK,
        MOVE_BACKWARD_MOCK,
        MOVE_BACKWARD_MOCK,
        MOVE_RIGHT_MOCK,
        MOVE_RIGHT_MOCK,
        MOVE_FORWARD_MOCK,
        MOVE_FORWARD_MOCK,
        MOVE_LEFT_MOCK,
        MOVE_BACKWARD_MOCK,
      ];

      (async () => {
        await wait(1000);
        await engine.excecuteSetOfInstructions(instructions);
      })();

      return (
        <PixiWrapper
          component={engine.view}
          isContainer={true}
          height={gameMetadata.engineData.canvas.height}
          width={gameMetadata.engineData.canvas.width}
        />
      );
    });
