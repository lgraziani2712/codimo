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
const one = numberGenerator(ONE, POSITION, POSITION, SIZES.one, MARGINS.one).view;
const ten = numberGenerator(TEN, POSITION, POSITION, SIZES.ten, MARGINS.ten).view;

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
  .add('happy negative one digit', () => {
    const negativeOne = numberGenerator(-ONE, POSITION, POSITION, SIZES.negativeOne, MARGINS.negativeOne);

    negativeOne.beHappy('start');

    return (
      <PixiWrapper
        component={negativeOne.view}
        isContainer={false}
        height={SIZES.negativeOne + MARGINS.negativeOne + MARGINS.negativeOne}
        width={SIZES.negativeOne + MARGINS.negativeOne + MARGINS.negativeOne}
      />
    );
  })
  .add('sad negative two digits', () => {
    const negativeTen = numberGenerator(-TEN, POSITION, POSITION, SIZES.negativeTen, MARGINS.negativeTen);

    negativeTen.beSad('start');

    return (
      <PixiWrapper
        component={negativeTen.view}
        isContainer={false}
        height={SIZES.negativeTen + MARGINS.negativeTen + MARGINS.negativeTen}
        width={SIZES.negativeTen + MARGINS.negativeTen + MARGINS.negativeTen}
      />
    );
  });
