/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Container } from 'pixi.js';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import { ZERO, TWO } from 'core/constants/numbers';

import blockGeneratorConfig, { BLOCK_DEFINITIONS } from './blockGenerator';

const WIDTH = 256;
const HEIGHT = 256;
const SIZE = 64;
const MARGIN = 10;
const wallBlockGenerator = blockGeneratorConfig(
  BLOCK_DEFINITIONS.WALL,
  SIZE,
  MARGIN,
);
const borderBlockGenerator = blockGeneratorConfig(
  BLOCK_DEFINITIONS.BORDER,
  SIZE,
  MARGIN,
);
const pathBlockGenerator = blockGeneratorConfig(
  BLOCK_DEFINITIONS.PATH,
  SIZE,
  MARGIN,
);
const onePosition = SIZE + MARGIN;
const twoPositions = (SIZE + MARGIN) * TWO;

storiesOf('engines/pixijs/components/blockGenerator', module)
  .add('2x2 wall and border blocks', () => {
    const container = new Container();
    const topLeftWall = wallBlockGenerator(ZERO, ZERO);
    const bottomRightWall = wallBlockGenerator(onePosition, onePosition);
    const topRightBorder = borderBlockGenerator(onePosition, ZERO);
    const bottomLeftBorder = borderBlockGenerator(ZERO, onePosition);

    container.x = container.y = 32;
    container.addChild(
      topLeftWall.view,
      topRightBorder.view,
      bottomLeftBorder.view,
      bottomRightWall.view,
    );

    return (
      <PixiWrapper isContainer={true} component={container} height={HEIGHT} width={WIDTH} />
    );
  })
  .add('3x3 wall, border and path blocks', () => {
    const container = new Container();

    const topLeftWall = wallBlockGenerator(ZERO, ZERO);
    const centerLeftWall = wallBlockGenerator(ZERO, onePosition);
    const botomLeftWall = wallBlockGenerator(ZERO, twoPositions);

    const topRightBorder = borderBlockGenerator(twoPositions, ZERO);
    const centerRightBorder = borderBlockGenerator(twoPositions, onePosition);
    const bottomRightBorder = borderBlockGenerator(twoPositions, twoPositions);

    const topCenterPath = pathBlockGenerator(onePosition, ZERO, { bottom: true });
    const centerCenterPath = pathBlockGenerator(onePosition, onePosition, {
      top: true,
      bottom: true,
    });
    const bottomCenterPath = pathBlockGenerator(onePosition, twoPositions, { top: true });

    container.x = container.y = 32;
    container.addChild(
      topLeftWall.view,
      centerLeftWall.view,
      botomLeftWall.view,

      topRightBorder.view,
      centerRightBorder.view,
      bottomRightBorder.view,

      topCenterPath.view,
      centerCenterPath.view,
      bottomCenterPath.view,
    );

    return (
      <PixiWrapper
        isContainer={true}
        component={container}
        height={HEIGHT + HEIGHT}
        width={WIDTH + WIDTH}
      />
    );
  });
