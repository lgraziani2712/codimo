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
import { TEN } from 'constants/numbers';

import mazeGenerator from './mazeGenerator';
import MazeData from './MazeData.json';
import numberGenerator from './numberGenerator';

const WIDTH = 960;
const HEIGHT = 448;
const basicMaze = mazeGenerator();
const simpleNumberMaze = mazeGenerator();
const number = numberGenerator(-TEN, MazeData[0]);

storiesOf('engine.components.Maze', module)
  .add('basic Maze', () => (<PixiWrapper component={basicMaze} height={HEIGHT} width={WIDTH} />))
  .add('one moving number Maze', () => {
    simpleNumberMaze.addChild(number.view);

    (async () => {
      for (let i = 1; i < MazeData.length; i++) {
        await wait(500); // eslint-disable-line no-magic-numbers
        number.updatePosition(MazeData[i]);
      }
      await wait(2000); // eslint-disable-line no-magic-numbers
      number.resetPosition();
    })();

    return <PixiWrapper component={simpleNumberMaze} height={HEIGHT} width={WIDTH} />;
  });
