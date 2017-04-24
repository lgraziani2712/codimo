/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import wait from 'speculation/wait';

import PixiWrapper from 'test/PixiWrapper';
import mazeData from 'engine/components/mazeData.json';

import gameGenerator from './gameGenerator';

const WIDTH = 960;
const HEIGHT = 460;

storiesOf('engine.containers.Game', module)
  .add('simple game', () => {
    const game = gameGenerator(mazeData);
    const ACTOR = 0;

    (async () => {
      await wait(1000); // eslint-disable-line no-magic-numbers
      await game.moveNumberTo(ACTOR, 'up');
      await game.moveNumberTo(ACTOR, 'up');
      await game.moveNumberTo(ACTOR, 'right');
      await game.moveNumberTo(ACTOR, 'right');
      await game.moveNumberTo(ACTOR, 'right');
      await game.moveNumberTo(ACTOR, 'right');
      await game.moveNumberTo(ACTOR, 'right');
      await game.moveNumberTo(ACTOR, 'down');
      await game.moveNumberTo(ACTOR, 'right');
      await game.moveNumberTo(ACTOR, 'right');
      await game.moveNumberTo(ACTOR, 'up');
      await game.moveNumberTo(ACTOR, 'up');
      await game.moveNumberTo(ACTOR, 'up');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'left');
      await game.moveNumberTo(ACTOR, 'up');

      await game.numberHasLeftMaze(0); // eslint-disable-line no-magic-numbers
    })();

    return <PixiWrapper component={game.view} height={HEIGHT} width={WIDTH} />;
  });
