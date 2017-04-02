/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import PixiWrapper from 'test/PixiWrapper';

import arrowGenerator from './arrowGenerator';

const WIDTH = 104;
const HEIGHT = 204;

/* eslint-disable no-magic-numbers */
storiesOf('engine.components.arrowGenerator', module)
  .add('simple left arrow', () => {
    const arrow = arrowGenerator();

    arrow.x = WIDTH / 4;
    arrow.y = HEIGHT / 4;

    return <PixiWrapper component={arrow} height={HEIGHT} width={WIDTH} />;
  })
  .add('simple right arrow', () => {
    const arrow = arrowGenerator(true);

    arrow.x = WIDTH / 4;
    arrow.y = HEIGHT / 4;

    return <PixiWrapper component={arrow} height={HEIGHT} width={WIDTH} />;
  });
