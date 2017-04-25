/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import { BLOCK_SIZE } from 'constants/numbers';

import numberGenerator from './numberGenerator';

const WIDTH = BLOCK_SIZE;
const HEIGHT = WIDTH;
const POSITION = '0,0';
const one = numberGenerator(1, POSITION).view; // eslint-disable-line no-magic-numbers
const ten = numberGenerator(10, POSITION).view; // eslint-disable-line no-magic-numbers
const negativeOne = numberGenerator(-1, POSITION).view; // eslint-disable-line no-magic-numbers
const negativeTen = numberGenerator(-10, POSITION).view; // eslint-disable-line no-magic-numbers

storiesOf('engine.components.Number', module)
  .add('one digit', () => (<PixiWrapper component={one} height={HEIGHT} width={WIDTH} />))
  .add('two digits', () => (<PixiWrapper component={ten} height={HEIGHT} width={WIDTH} />))
  .add('negative one digit', () => (<PixiWrapper component={negativeOne} height={HEIGHT} width={WIDTH} />))
  .add('negative two digits', () => (<PixiWrapper component={negativeTen} height={HEIGHT} width={WIDTH} />));
