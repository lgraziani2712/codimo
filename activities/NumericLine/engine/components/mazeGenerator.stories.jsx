/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';

import numericLineMetadata from '../../__mocks__/numericLineMetadata';

import mazeGenerator from './mazeGenerator';

const { engineData } = numericLineMetadata;
const WIDTH = engineData.canvas.width;
const HEIGHT = engineData.canvas.height;

const basicMaze = mazeGenerator(engineData);

storiesOf('NumericLine/engine/components/mazeGenerator', module)
  .add('basic Maze', () => (
    <PixiWrapper component={basicMaze.view} isContainer={true} height={HEIGHT} width={WIDTH} />
  ));
