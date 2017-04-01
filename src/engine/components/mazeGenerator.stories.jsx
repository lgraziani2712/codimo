/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import wait from 'speculation/wait';

import { ONE } from 'constants/numbers';
import PixiWrapper from 'test/PixiWrapper';

import mazeGenerator from './mazeGenerator';
import MazeData from './MazeData.json';
import numberGenerator from './numberGenerator';

const WIDTH = 960;
const HEIGHT = 448;
const basicMaze = mazeGenerator();

storiesOf('engine > components > Maze', module)
  .add('basic Maze', () => (<PixiWrapper component={basicMaze} height={HEIGHT} width={WIDTH} />))
  .add('one moving number Maze', () => {
    const number = numberGenerator(ONE);

    basicMaze.addChild(number.view);

    number.position = MazeData[0].split(',').map((string: string): number => (parseInt(string)));
    number.updatePosition(number.position);

    (async () => {
      for (let i = 1; i < MazeData.length; i++) {
        await wait(250); // eslint-disable-line no-magic-numbers
        number.position = MazeData[i].split(',').map((string: string): number => (parseInt(string)));
        number.updatePosition(number.position);
      }
    })();

    return <PixiWrapper component={basicMaze} height={HEIGHT} width={WIDTH} />;
  });
