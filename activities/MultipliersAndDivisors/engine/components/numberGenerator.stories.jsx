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
import blockGenerator, {
  BLOCK_DEFINITIONS,
} from 'core/engines/pixijs/components/blockGenerator';

import numberGenerator from './numberGenerator';

const POSITION = '0,0';
const SIZES = {
  openingThePortal: 128,
};
const MARGINS = {
  openingThePortal: 20,
};

storiesOf('MultipliersAndDivisors/engine/components/numberGenerator', module)
  .add('Opening the portal', () => {
    const blocker = blockGenerator(
      BLOCK_DEFINITIONS.WALL,
      SIZES.openingThePortal,
      MARGINS.openingThePortal,
    );
    const baseSize = SIZES.openingThePortal + MARGINS.openingThePortal * 2;
    const wrapperHeight = baseSize * 3;
    const wrapperWidth = baseSize * 4;
    const wrapper = new Container();
    const initialBlock = blocker(5, 5);
    const finalBlock = blocker(wrapperWidth - 10, wrapperHeight - 10);
    const number = numberGenerator('normal', initialBlock.view, {
      number: 3,
      startPosition: POSITION,
      endPosition: POSITION,
      size: SIZES.openingThePortal,
      margin: MARGINS.openingThePortal,
    });

    const finalBlockPivot = SIZES.openingThePortal + MARGINS.openingThePortal * 2;

    finalBlock.view.pivot = new Point(finalBlockPivot, finalBlockPivot);

    wrapper
      .addChild(initialBlock.view)
      .addChild(finalBlock.view);

    (async () => {
      await wait(1000);

      await number.openThePortal(finalBlock);
    })();

    return (
      <PixiWrapper
        isContainer={false}
        component={wrapper}
        height={wrapperHeight}
        width={wrapperWidth}
      />
    );
  });
