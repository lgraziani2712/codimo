/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import PixiWrapper from 'test/PixiWrapper';

import lineGenerator from './lineGenerator';

const WIDTH = 640;
const HEIGHT = 200;

/* eslint-disable no-magic-numbers */
storiesOf('engine.components.lineGenerator', module)
  .add('simple line', () => {
    const line = lineGenerator(8);

    line.x = 32;
    line.y = HEIGHT / 4;

    return <PixiWrapper component={line} height={HEIGHT} width={WIDTH} />;
  });
