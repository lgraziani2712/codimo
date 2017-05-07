/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import wait from 'speculation/wait';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import gameMetadataDataWithoutBlocks from 'test/gameMetadataDataWithoutBlocks.json';
import { blockNames } from 'blockly/constants';

import mazeEngineGenerator from './mazeEngineGenerator';

const WIDTH = 1300;
const HEIGHT = 660;
const { mazeData, numericLineData } = gameMetadataDataWithoutBlocks;

mazeData.path = new Map(mazeData.path);

storiesOf('engine.containers.mazeEngineGenerator', module)
  .add('simple mazeEngine', () => {
    const mazeEngine = mazeEngineGenerator(mazeData, numericLineData);
    const actions = new Map();
    const ACTOR = 0;

    actions.set(ACTOR, [
      blockNames.MOVE_FORWARD,
      blockNames.MOVE_FORWARD,
      blockNames.MOVE_RIGHT,
      blockNames.MOVE_RIGHT,
      blockNames.MOVE_RIGHT,
      blockNames.MOVE_RIGHT,
      blockNames.MOVE_RIGHT,
      blockNames.MOVE_BACKWARD,
      blockNames.MOVE_RIGHT,
      blockNames.MOVE_RIGHT,
      blockNames.MOVE_FORWARD,
      blockNames.MOVE_FORWARD,
      blockNames.MOVE_FORWARD,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_LEFT,
      blockNames.MOVE_FORWARD,
      blockNames.MOVE_FORWARD,
    ]);

    (async () => {
      await wait(1000); // eslint-disable-line no-magic-numbers
      await mazeEngine.excecuteSetOfInstructions(actions);
    })();

    mazeEngine.view.x += 32;
    mazeEngine.view.y += 16;

    return <PixiWrapper component={mazeEngine.view} isContainer={true} height={HEIGHT} width={WIDTH} />;
  });
