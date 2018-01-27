/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import React from 'react';
import wait from 'speculation/wait';
import { Container, Point } from 'pixi.js';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import { TEN, HALF, ZERO } from 'core/constants/numbers';

import numberGenerator from '../numberGenerator';

import arrowGenerator from './arrowGenerator';
import lineGenerator from './lineGenerator';

import numericLineGenerator from '.';

const POSITION = '0,0';
const GLOBAL_POSITION = new Point(0, 0);
const SIZE = 64;
const MARGIN = TEN;
const WIDTH_NUMERIC_LINE = 960;
const HEIGHT_NUMERIC_LINE = 300;
const WIDTH_ARROW = 104;
const HEIGHT_ARROW = 204;

storiesOf('MultipliersAndDivisors/engine/components/numericLineGenerator', module)
//////////////////////////////////
// Arrows
//////////////////////////////////
  .add('simple left arrow', () => {
    const arrow = arrowGenerator(SIZE, TEN);

    return (
      <PixiWrapper
        component={arrow.view}
        isContainer={true}
        height={HEIGHT_ARROW}
        width={WIDTH_ARROW}
      />
    );
  })
  .add('simple right arrow', () => {
    const arrow = arrowGenerator(SIZE, TEN, true);

    return (
      <PixiWrapper
        component={arrow.view}
        isContainer={true}
        height={HEIGHT_ARROW}
        width={WIDTH_ARROW}
      />
    );
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
    const container = new Container();
    const ten = numberGenerator('normal', container, {
      number: TEN,
      startPosition: POSITION,
      endPosition: POSITION,
      size: SIZE,
      margin: TEN,
    });
    const CHILD = ZERO;

    line.view.x = 32;
    line.view.y = 28;
    const globalPos = line.view.getChildAt(CHILD).toGlobal(GLOBAL_POSITION);

    ten.view.x = globalPos.x + SIZE / HALF;
    ten.view.y = globalPos.y + SIZE * 2;

    (async () => {
      await wait(500);
      await line.receiveNumberAtPosition(ten, CHILD);
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
  .add('It\'s a happy number line after all 🎵', () => {
    const line = lineGenerator([-99, -45, 0, null, 12, 45, 78, 99], SIZE, TEN);
    const container = new Container();
    const ten = numberGenerator('normal', container, {
      number: TEN,
      startPosition: POSITION,
      endPosition: POSITION,
      size: SIZE,
      margin: TEN,
    });
    const CHILD = 3;

    line.view.x = 32;
    line.view.y = 28;
    const globalPos = line.view.getChildAt(CHILD).toGlobal(GLOBAL_POSITION);

    ten.view.x = globalPos.x + SIZE / HALF;
    ten.view.y = globalPos.y + SIZE * 2;

    (async () => {
      await wait(500);
      await line.receiveNumberAtPosition(ten, CHILD);
      ten.beHappy('start');
      line.beHappy('start');
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
  .add('a sad number line', () => {
    const line = lineGenerator([-99, -45, null, 0, 12, 45, 78, 99], SIZE, TEN);
    const container = new Container();
    const ten = numberGenerator('normal', container, {
      number: TEN,
      startPosition: POSITION,
      endPosition: POSITION,
      size: SIZE,
      margin: TEN,
    });
    const CHILD = 2;

    line.view.x = 32;
    line.view.y = 28;
    const globalPos = line.view.getChildAt(CHILD).toGlobal(GLOBAL_POSITION);

    ten.view.x = globalPos.x + SIZE / HALF;
    ten.view.y = globalPos.y + SIZE * 2;

    (async () => {
      await wait(500);
      await line.receiveNumberAtPosition(ten, CHILD);
      line.beSad('start');
      ten.beSad('start');
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
    const numericLine = numericLineGenerator({
      numericLineData: {
        statics: [null, null, null, null, null, null, null, null, null, null],
        accesses: [],
      },
      size: SIZE,
      margin: TEN,
    });

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
    const numericLine = numericLineGenerator({
      numericLineData: {
        statics: [1, 2, 3, 4, 5, 6, 7, 8, 9, null],
        accesses: [],
      },
      size: SIZE,
      margin: TEN,
    });
    const container = new Container();
    const ten = numberGenerator('normal', container, {
      number: TEN,
      startPosition: POSITION,
      endPosition: POSITION,
      size: SIZE,
      margin: TEN,
    });
    const CHILD = 9;

    numericLine.view.y = (HEIGHT_NUMERIC_LINE - numericLine.view.height) / HALF;
    const globalPos = numericLine.view.getChildAt(1).getChildAt(CHILD).toGlobal(GLOBAL_POSITION);

    ten.view.x = globalPos.x + SIZE + MARGIN * 2;
    ten.view.y = globalPos.y + SIZE * 2;

    (async () => {
      await wait(500);
      await numericLine.receiveNumberAtPosition(ten, CHILD);
    })();

    return (
      <PixiWrapper
        component={numericLine.view}
        isContainer={true}
        height={HEIGHT_NUMERIC_LINE}
        width={WIDTH_NUMERIC_LINE}
      />
    );
  })
  .add('a happy numeric line', () => {
    const numericLine = numericLineGenerator({
      numericLineData: {
        statics: [1, 2, 3, 4, 5, 6, 7, 8, 9, null],
        accesses: [],
      },
      size: SIZE,
      margin: TEN,
    });
    const container = new Container();
    const ten = numberGenerator('normal', container, {
      number: TEN,
      startPosition: POSITION,
      endPosition: POSITION,
      size: SIZE,
      margin: TEN,
    });
    const CHILD = 9;

    numericLine.view.y = (HEIGHT_NUMERIC_LINE - numericLine.view.height) / HALF;
    const globalPos = numericLine.view.getChildAt(1).getChildAt(CHILD).toGlobal(GLOBAL_POSITION);

    ten.view.x = globalPos.x + SIZE + MARGIN * 2;
    ten.view.y = globalPos.y + SIZE * 2;

    (async () => {
      await wait(500);
      await numericLine.receiveNumberAtPosition(ten, CHILD);
      ten.beHappy('start');
      numericLine.beHappy('start');
    })();

    return (
      <PixiWrapper
        component={numericLine.view}
        isContainer={true}
        height={HEIGHT_NUMERIC_LINE}
        width={WIDTH_NUMERIC_LINE}
      />
    );
  })
  .add('a sad numeric line', () => {
    const numericLine = numericLineGenerator({
      numericLineData: {
        statics: [1, 2, 3, 4, 5, 6, 7, 8, 11, null],
        accesses: [],
      },
      size: SIZE,
      margin: TEN,
    });
    const container = new Container();
    const ten = numberGenerator('normal', container, {
      number: TEN,
      startPosition: POSITION,
      endPosition: POSITION,
      size: SIZE,
      margin: TEN,
    });
    const CHILD = 9;

    numericLine.view.y = (HEIGHT_NUMERIC_LINE - numericLine.view.height) / HALF;
    const globalPos = numericLine.view.getChildAt(1).getChildAt(CHILD).toGlobal(GLOBAL_POSITION);

    ten.view.x = globalPos.x + SIZE + MARGIN * 2;
    ten.view.y = globalPos.y + SIZE * 2;

    (async () => {
      await wait(500);
      await numericLine.receiveNumberAtPosition(ten, CHILD);
      ten.beSad('start');
      numericLine.beSad('start');
    })();

    return (
      <PixiWrapper
        component={numericLine.view}
        isContainer={true}
        height={HEIGHT_NUMERIC_LINE}
        width={WIDTH_NUMERIC_LINE}
      />
    );
  });
