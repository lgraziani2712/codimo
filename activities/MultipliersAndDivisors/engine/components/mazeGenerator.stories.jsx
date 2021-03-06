/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';

import multipliersMetadata from '../../__mocks__/multipliersMetadata';

import mazeGenerator from './mazeGenerator';

const { engineData } = multipliersMetadata;
const WIDTH = engineData.canvas.width;
const HEIGHT = engineData.canvas.height;

const basicMaze = mazeGenerator(engineData);

storiesOf('MultipliersAndDivisors/engine/components/mazeGenerator', module)
  .add('basic Maze', () => (
    <PixiWrapper
      component={basicMaze.view}
      isContainer={true}
      height={HEIGHT}
      width={WIDTH}
    />
  ));
