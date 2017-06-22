/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import React from 'react';
import wait from 'speculation/wait';
import { Container } from 'pixi.js';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import { TEN, ONE } from 'constants/numbers';
import blockGeneratorConfig, { BLOCK_DEFINITIONS } from 'engine/components/blockGeneratorConfig';

import numberGenerator from './';

const POSITION = '0,0';
const SIZES = {
  one: 64,
  ten: 128,
  negativeOne: 256,
  negativeTen: 512,
  elCaido: 128,
  hitting: 64,
};
const MARGINS = {
  one: 10,
  ten: 20,
  negativeOne: 30,
  negativeTen: 40,
  elCaido: 20,
  hitting: 10,
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
      const number = numberGenerator(
        -ONE,
        POSITION,
        POSITION,
        SIZES.negativeOne,
        MARGINS.negativeOne,
      );

      number.beHappy('start');

      return (
        <PixiWrapper
          component={number.view}
          isContainer={false}
          height={SIZES.negativeOne + MARGINS.negativeOne + MARGINS.negativeOne}
          width={SIZES.negativeOne + MARGINS.negativeOne + MARGINS.negativeOne}
        />
      );
    })
    .add('sad negative two digits', () => {
      const number = numberGenerator(
        -TEN,
        POSITION,
        POSITION,
        SIZES.negativeTen,
        MARGINS.negativeTen,
      );

      number.beSad('start');

      return (
        <PixiWrapper
          component={number.view}
          isContainer={false}
          height={SIZES.negativeTen + MARGINS.negativeTen + MARGINS.negativeTen}
          width={SIZES.negativeTen + MARGINS.negativeTen + MARGINS.negativeTen}
        />
      );
    })
    .add('El Caído, the _fallen one_', () => {
      const number = numberGenerator(-TEN, POSITION, POSITION, SIZES.elCaido, MARGINS.elCaido);
      const container = new Container();

      container.addChild(number.view);

      container.x = SIZES.elCaido / 1.25;
      container.y = SIZES.elCaido;

      (async () => {
        await wait(1000);
        await number.beTheFallenOne();
      })();

      return (
        <PixiWrapper
          component={container}
          isContainer={false}
          height={SIZES.elCaido * 3}
          width={SIZES.elCaido * 3}
        />
      );
    })
    .add('Hitting the Wall', () => {
      const number = numberGenerator(-99, POSITION, POSITION, SIZES.hitting, MARGINS.hitting);
      const block = blockGeneratorConfig(
        BLOCK_DEFINITIONS.PATH,
        SIZES.hitting,
        MARGINS.hitting,
      )(SIZES.hitting / 1.25, SIZES.hitting);

      block.view.addChild(number.view);

      (async () => {
        await wait(1000);
        await number.hitTheWall('top');
        await number.hitTheWall('right');
        await number.hitTheWall('bottom');
        await number.hitTheWall('left');
      })();

      return (
        <PixiWrapper
          component={block.view}
          isContainer={false}
          height={SIZES.hitting * 3}
          width={SIZES.hitting * 3}
        />
      );
    });
