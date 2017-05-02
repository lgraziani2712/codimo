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
import mazeData from 'test/mazeData.json';
import { blockNames } from 'blockly/constants';

import mazeEngineGenerator from './mazeEngineGenerator';

const WIDTH = 960;
const HEIGHT = 460;

storiesOf('engine.containers.mazeEngineGenerator', module)
  .add('simple mazeEngine', () => {
    const mazeEngine = mazeEngineGenerator(mazeData);
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
    ]);

    (async () => {
      await wait(1000); // eslint-disable-line no-magic-numbers
      await mazeEngine.excecuteSetOfInstructions(actions);
    })();

    return <PixiWrapper component={mazeEngine.view} height={HEIGHT} width={WIDTH} />;
  });
