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
  MOVE_FORWARD,
  MOVE_RIGHT,
  MOVE_BACKWARD,
  MOVE_LEFT,
} from 'core/constants/instructions';
import componentGenerator from 'core/engines/pixijs/components/componentGenerator';
import positioningFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/positioningFunctionalityBuilder';

import positioningProcessorBuilder from './processors/positioningProcessorBuilder';

import engineGenerator from '.';

const metadata = {
  canvas: {
    height: 550,
    width: 700,
  },
  width: 10,
  height: 5,
  margin: 0,
  size: 256,
};
const MOVE_FORWARD_MOCK = {
  key: MOVE_FORWARD,
  params: ['1'],
};
const MOVE_RIGHT_MOCK = {
  key: MOVE_RIGHT,
  params: ['1'],
};
const MOVE_BACKWARD_MOCK = {
  key: MOVE_BACKWARD,
  params: ['1'],
};
const MOVE_LEFT_MOCK = {
  key: MOVE_LEFT,
  params: ['1'],
};
const basicActorGenerator = (size: number, margin: number) =>
  (view: Container, position: string) => (
    componentGenerator(view, size, margin)
        .addFunctionality('positioning', positioningFunctionalityBuilder(position))
  );

storiesOf('engines.pixijs.engineGenerator', module)
    .add('simple engine with positioning', () => {
      const actor = basicActorGenerator(
        metadata.size,
        metadata.margin,
      )(Sprite.fromImage('/images/logo.png'), '0,0').build();
      const engineGen = engineGenerator(() => {
        const view = new Container();

        view.addChild(actor.view);

        return view;
      });
      const positioningProcessor = positioningProcessorBuilder(
        metadata,
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
          height={metadata.canvas.height}
          width={metadata.canvas.width}
        />
      );
    });
