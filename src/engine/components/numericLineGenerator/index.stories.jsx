/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import numberGenerator from 'engine/components/numberGenerator';
import { TEN, HALF, ZERO } from 'constants/numbers';

import arrowGenerator from './arrowGenerator';
import lineGenerator from './lineGenerator';

import numericLineGenerator from './index';

const WIDTH_NUMERIC_LINE = 960;
const HEIGHT_NUMERIC_LINE = 300;
const WIDTH_ARROW = 104;
const HEIGHT_ARROW = 204;
const WIDTH_LINE = 640;
const HEIGHT_LINE = 200;
const QUARTER = 4;
const NINE = 9;

storiesOf('engine.components.numericLine', module)
  //////////////////////////////////
  // Arrows
  //////////////////////////////////
  .add('simple left arrow', () => {
    const arrow = arrowGenerator();

    arrow.x = WIDTH_ARROW / QUARTER;
    arrow.y = HEIGHT_ARROW / QUARTER;

    return <PixiWrapper component={arrow} height={HEIGHT_ARROW} width={WIDTH_ARROW} />;
  })
  .add('simple right arrow', () => {
    const arrow = arrowGenerator(true);

    arrow.x = WIDTH_ARROW / QUARTER;
    arrow.y = HEIGHT_ARROW / QUARTER;

    return <PixiWrapper component={arrow} height={HEIGHT_ARROW} width={WIDTH_ARROW} />;
  })
  //////////////////////////////////
  // Line
  //////////////////////////////////
  .add('simple line', () => {
    const line = lineGenerator([null, null, null, null, null, null, null, null]);

    line.view.x = 32;
    line.view.y = HEIGHT_LINE / QUARTER;

    return <PixiWrapper component={line.view} height={HEIGHT_LINE} width={WIDTH_LINE} />;
  })
  .add('line with static numbers', () => {
    // eslint-disable-next-line no-magic-numbers
    const line = lineGenerator([0, 1, 2, 3, 4, 5, 6, 7]);

    line.view.x = 32;
    line.view.y = HEIGHT_LINE / QUARTER;

    return (
      <PixiWrapper component={line.view} height={HEIGHT_LINE} width={WIDTH_LINE} />
    );
  })
  .add('line with an animated number', () => {
    const line = lineGenerator([null, null, null, null, null, null, null, null]);
    const ten = numberGenerator(TEN, '0,0');

    line.view.x = 32;
    line.view.y = HEIGHT_LINE / QUARTER;

    line.receiveNumberAtPosition(ten, ZERO);

    return (
      <PixiWrapper component={line.view} height={HEIGHT_LINE} width={WIDTH_LINE} />
    );
  })
  //////////////////////////////////
  // Numeric Line
  //////////////////////////////////
  .add('basic numeric line', () => {
    const numericLine = numericLineGenerator([null, null, null, null, null, null, null, null, null, null]);

    numericLine.view.x = (WIDTH_NUMERIC_LINE - numericLine.view.width) / HALF;
    numericLine.view.y = (HEIGHT_NUMERIC_LINE - numericLine.view.height) / HALF;

    return (
      <PixiWrapper component={numericLine.view} height={HEIGHT_NUMERIC_LINE} width={WIDTH_NUMERIC_LINE} />
    );
  })
  .add('numeric line with animated and static numbers', () => {
    // eslint-disable-next-line no-magic-numbers
    const numericLine = numericLineGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, null]);
    const ten = numberGenerator(TEN, '0,0');

    numericLine.receiveNumberAtPosition(ten, NINE);

    numericLine.view.x = (WIDTH_NUMERIC_LINE - numericLine.view.width) / HALF;
    numericLine.view.y = (HEIGHT_NUMERIC_LINE - numericLine.view.height) / HALF;

    return (
      <PixiWrapper component={numericLine.view} height={HEIGHT_NUMERIC_LINE} width={WIDTH_NUMERIC_LINE} />
    );
  });
