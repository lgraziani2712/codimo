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
import blockGenerator, {
  BLOCK_DEFINITIONS,
} from 'core/engines/pixijs/components/blockGenerator';

import numberGenerator from './numberGenerator';

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

storiesOf('NumericLine/engine/components/numberGenerator', module)
  .add('one digit', () => {
    const container = new Container();

    numberGenerator('easy', container, {
      numericLineData: {
        statics: [0, null, 2],
        accesses: [1, 2],
      },
      actorExitIdx: 0,
      startPosition: POSITION,
      exits: [POSITION],
      size: SIZES.one,
      margin: MARGINS.one,
    });

    return (
      <PixiWrapper
        component={container}
        isContainer={false}
        height={SIZES.one + MARGINS.one + MARGINS.one}
        width={SIZES.one + MARGINS.one + MARGINS.one}
      />
    );
  })
  .add('two digits', () => {
    const container = new Container();

    numberGenerator('normal', container, {
      numericLineData: {
        statics: [9, null, 11],
        accesses: [1],
      },
      actorExitIdx: 0,
      startPosition: POSITION,
      exits: [POSITION],
      size: SIZES.ten,
      margin: MARGINS.ten,
    });

    return (
      <PixiWrapper
        component={container}
        isContainer={false}
        height={SIZES.ten + MARGINS.ten + MARGINS.ten}
        width={SIZES.ten + MARGINS.ten + MARGINS.ten}
      />
    );
  })
  .add('happy negative one digit', () => {
    const container = new Container();
    const number = numberGenerator('hard', container, {
      numericLineData: {
        statics: [-2, null, 0],
        accesses: [1],
      },
      actorExitIdx: 0,
      startPosition: POSITION,
      exits: [POSITION],
      size: SIZES.negativeOne,
      margin: MARGINS.negativeOne,
    });

    number.beHappy('start');

    return (
      <PixiWrapper
        component={container}
        isContainer={false}
        height={SIZES.negativeOne + MARGINS.negativeOne + MARGINS.negativeOne}
        width={SIZES.negativeOne + MARGINS.negativeOne + MARGINS.negativeOne}
      />
    );
  })
  .add('sad negative two digits', () => {
    const container = new Container();
    const number = numberGenerator('hard', container, {
      numericLineData: {
        statics: [-11, null, -9],
        accesses: [1],
      },
      actorExitIdx: 0,
      startPosition: POSITION,
      exits: [POSITION],
      size: SIZES.negativeTen,
      margin: MARGINS.negativeTen,
    });

    number.beSad('start');

    return (
      <PixiWrapper
        component={container}
        isContainer={false}
        height={SIZES.negativeTen + MARGINS.negativeTen + MARGINS.negativeTen}
        width={SIZES.negativeTen + MARGINS.negativeTen + MARGINS.negativeTen}
      />
    );
  })
  .add('El Caído, the *fallen one*', () => {
    const container = new Container();
    const number = numberGenerator('hard', container, {
      numericLineData: {
        statics: [-11, null, -9],
        accesses: [1],
      },
      actorExitIdx: 0,
      startPosition: POSITION,
      exits: [POSITION],
      size: SIZES.elCaido,
      margin: MARGINS.elCaido,
    });

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
    const block = blockGenerator(
      BLOCK_DEFINITIONS.PATH,
      SIZES.hitting,
      MARGINS.hitting,
    )(SIZES.hitting / 1.25, SIZES.hitting);
    const number = numberGenerator('hard', block.view, {
      numericLineData: {
        statics: [null, -98],
        accesses: [0],
      },
      actorExitIdx: 0,
      startPosition: POSITION,
      exits: [POSITION],
      size: SIZES.hitting,
      margin: MARGINS.hitting,
    });

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
