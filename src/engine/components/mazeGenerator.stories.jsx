/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import PixiWrapper from 'test/PixiWrapper';

import mazeGenerator from './mazeGenerator';

const WIDTH = 960;
const HEIGHT = 448;
const basicMaze = mazeGenerator();

storiesOf('engine > components > Maze', module)
  .add('basic Maze', () => (<PixiWrapper component={basicMaze} height={HEIGHT} width={WIDTH} />));
