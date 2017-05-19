/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, */
import React from 'react';
import wait from 'speculation/wait';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import gameMetadataDataWithoutBlocks from 'test/gameMetadataDataWithoutBlocks.json';
import * as actionNames from 'constants/instructions';

import mazeEngineGenerator from './mazeEngineGenerator';

const WIDTH = 1300;
const HEIGHT = 660;
const { mazeData, numericLineData, difficulty } = gameMetadataDataWithoutBlocks;

mazeData.path = new Map(mazeData.path);

storiesOf('engine.containers.mazeEngineGenerator', module)
  .add('simple mazeEngine', () => {
    const mazeEngine = mazeEngineGenerator(mazeData, numericLineData, difficulty);
    const instructions = [
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_RIGHT,
      actionNames.MOVE_RIGHT,
      actionNames.MOVE_RIGHT,
      actionNames.MOVE_RIGHT,
      actionNames.MOVE_RIGHT,
      actionNames.MOVE_BACKWARD,
      actionNames.MOVE_RIGHT,
      actionNames.MOVE_RIGHT,
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_LEFT,
      actionNames.MOVE_FORWARD,
      actionNames.MOVE_FORWARD,
      actionNames.LEAVE_MAZE,
    ];

    (async () => {
      await wait(1000);
      await mazeEngine.excecuteSetOfInstructions(instructions);
    })();

    mazeEngine.view.x += 32;
    mazeEngine.view.y += 16;

    return <PixiWrapper component={mazeEngine.view} isContainer={true} height={HEIGHT} width={WIDTH} />;
  });
