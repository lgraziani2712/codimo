/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import { TEN, ONE } from 'constants/numbers';

import numberGenerator from './';

const POSITION = '0,0';
const SIZES = {
  one: 64,
  ten: 128,
  negativeOne: 256,
  negativeTen: 512,
};
const MARGINS = {
  one: 10,
  ten: 20,
  negativeOne: 30,
  negativeTen: 40,
};
const one = numberGenerator(ONE, POSITION, SIZES.one, MARGINS.one).view;
const ten = numberGenerator(TEN, POSITION, SIZES.ten, MARGINS.ten).view;
const negativeOne = numberGenerator(-ONE, POSITION, SIZES.negativeOne, MARGINS.negativeOne).view;
const negativeTen = numberGenerator(-TEN, POSITION, SIZES.negativeTen, MARGINS.negativeTen).view;

storiesOf('engine.components.Number', module)
  .add('one digit', () => (
    <PixiWrapper
      component={one}
      isContainer={false}
      height={SIZES.one + MARGINS.one + MARGINS.one}
      width={SIZES.one + MARGINS.one + MARGINS.one}
    />
  ))
  .add('two digits', () => (
    <PixiWrapper
      component={ten}
      isContainer={false}
      height={SIZES.ten + MARGINS.ten + MARGINS.ten}
      width={SIZES.ten + MARGINS.ten + MARGINS.ten}
    />
  ))
  .add('negative one digit', () => (
    <PixiWrapper
      component={negativeOne}
      isContainer={false}
      height={SIZES.negativeOne + MARGINS.negativeOne + MARGINS.negativeOne}
      width={SIZES.negativeOne + MARGINS.negativeOne + MARGINS.negativeOne}
    />
  ))
  .add('negative two digits', () => (
    <PixiWrapper
      component={negativeTen}
      isContainer={false}
      height={SIZES.negativeTen + MARGINS.negativeTen + MARGINS.negativeTen}
      width={SIZES.negativeTen + MARGINS.negativeTen + MARGINS.negativeTen}
    />
  ));
