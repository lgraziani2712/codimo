/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';

import numberGenerator from './';

const POSITION = '0,0';
const SIZES = {
  one: 64,
  ten: 128,
  negativeOne: 256,
  negativeTen: 512,
};
// eslint-disable-next-line no-magic-numbers
const one = numberGenerator(1, POSITION, SIZES.one).view;
// eslint-disable-next-line no-magic-numbers
const ten = numberGenerator(10, POSITION, SIZES.ten).view;
// eslint-disable-next-line no-magic-numbers
const negativeOne = numberGenerator(-1, POSITION, SIZES.negativeOne).view;
// eslint-disable-next-line no-magic-numbers
const negativeTen = numberGenerator(-10, POSITION, SIZES.negativeTen).view;

storiesOf('engine.components.Number', module)
  .add('one digit', () => (<PixiWrapper component={one} height={SIZES.one} width={SIZES.one} />))
  .add('two digits', () => (<PixiWrapper component={ten} height={SIZES.ten} width={SIZES.ten} />))
  .add('negative one digit', () => (
    <PixiWrapper component={negativeOne} height={SIZES.negativeOne} width={SIZES.negativeOne} />
  ))
  .add('negative two digits', () => (
    <PixiWrapper component={negativeTen} height={SIZES.negativeTen} width={SIZES.negativeTen} />
  ));
