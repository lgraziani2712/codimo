/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import wait from 'speculation/wait';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import numberGenerator from 'engine/components/numberGenerator';
import { TEN, HALF, ZERO } from 'constants/numbers';

import arrowGenerator from './arrowGenerator';
import lineGenerator from './lineGenerator';

import numericLineGenerator from './index';

const SIZE = 64;
const WIDTH_NUMERIC_LINE = 960;
const HEIGHT_NUMERIC_LINE = 300;
const WIDTH_ARROW = 104;
const HEIGHT_ARROW = 204;
const QUARTER = 4;
const NINE = 9;

storiesOf('engine.components.numericLine', module)
  //////////////////////////////////
  // Arrows
  //////////////////////////////////
  .add('simple left arrow', () => {
    const arrow = arrowGenerator(SIZE, TEN);

    arrow.x = WIDTH_ARROW / QUARTER;
    arrow.y = HEIGHT_ARROW / QUARTER;

    return <PixiWrapper component={arrow} isContainer={true} height={HEIGHT_ARROW} width={WIDTH_ARROW} />;
  })
  .add('simple right arrow', () => {
    const arrow = arrowGenerator(SIZE, TEN, true);

    arrow.x = WIDTH_ARROW / QUARTER;
    arrow.y = HEIGHT_ARROW / QUARTER;

    return <PixiWrapper component={arrow} isContainer={true} height={HEIGHT_ARROW} width={WIDTH_ARROW} />;
  })
  //////////////////////////////////
  // Line
  //////////////////////////////////
  .add('simple line', () => {
    const line = lineGenerator([null, null, null, null, null, null, null, null], SIZE, TEN);

    line.view.x = 32;
    line.view.y = 28;

    return (
      <PixiWrapper
        component={line.view}
        isContainer={true}
        height={line.view.height + SIZE}
        width={line.view.width + SIZE}
      />
    );
  })
  .add('line with static numbers', () => {
    // eslint-disable-next-line no-magic-numbers
    const line = lineGenerator([0, 1, 2, 3, 4, 5, 6, 7], SIZE, TEN);

    line.view.x = 32;
    line.view.y = 28;

    return (
      <PixiWrapper
        component={line.view}
        isContainer={true}
        height={line.view.height + SIZE}
        width={line.view.width + SIZE}
      />
    );
  })
  .add('line with an animated number', () => {
    const line = lineGenerator([null, null, null, null, null, null, null, null], SIZE, TEN);
    const ten = numberGenerator(TEN, '0,0', SIZE, TEN);

    line.view.x = 32;
    line.view.y = 28;

    (async () => {
      await wait(500); // eslint-disable-line no-magic-numbers
      await line.receiveNumberAtPosition(ten, ZERO);
    })();

    return (
      <PixiWrapper
        component={line.view}
        isContainer={true}
        height={line.view.height + SIZE + SIZE}
        width={line.view.width + SIZE}
      />
    );
  })
  //////////////////////////////////
  // Numeric Line
  //////////////////////////////////
  .add('basic numeric line', () => {
    const numericLine = numericLineGenerator(
      [null, null, null, null, null, null, null, null, null, null],
      SIZE,
      TEN,
    );

    numericLine.view.y = (HEIGHT_NUMERIC_LINE - numericLine.view.height) / HALF;

    return (
      <PixiWrapper
        component={numericLine.view}
        isContainer={true}
        height={HEIGHT_NUMERIC_LINE}
        width={WIDTH_NUMERIC_LINE}
      />
    );
  })
  .add('numeric line with animated and static numbers', () => {
    // eslint-disable-next-line no-magic-numbers
    const numericLine = numericLineGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, null], SIZE, TEN);
    const ten = numberGenerator(TEN, '0,0', SIZE, TEN);

    (async () => {
      await wait(500); // eslint-disable-line no-magic-numbers
      await numericLine.receiveNumberAtPosition(ten, NINE);
    })();

    numericLine.view.y = (HEIGHT_NUMERIC_LINE - numericLine.view.height) / HALF;

    return (
      <PixiWrapper
        component={numericLine.view}
        isContainer={true}
        height={HEIGHT_NUMERIC_LINE}
        width={WIDTH_NUMERIC_LINE}
      />
    );
  });
