/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import PixiWrapper from 'test/PixiWrapper';
import { TEN, HALF } from 'constants/numbers';

import numericLineGenerator from './index';

const WIDTH = 960;
const HEIGHT = 300;
const numericLine = numericLineGenerator(TEN);

numericLine.x = (WIDTH - numericLine.width) / HALF;
numericLine.y = (HEIGHT - numericLine.height) / HALF;

storiesOf('engine.components.NumericLine', module)
  .add('basic numeric line', () => (<PixiWrapper component={numericLine} height={HEIGHT} width={WIDTH} />));
