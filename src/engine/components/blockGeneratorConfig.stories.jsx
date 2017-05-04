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
import mazeData from 'test/mazeData.json';
import { ZERO } from 'constants/numbers';

import blockGeneratorConfig, { BLOCK_DEFINITIONS } from './blockGeneratorConfig';

const WIDTH = 256;
const HEIGHT = 256;
const container = new Container();
const wallBlockGenerator = blockGeneratorConfig(BLOCK_DEFINITIONS.WALL, mazeData.size, mazeData.margin);
const borderBlockGenerator = blockGeneratorConfig(BLOCK_DEFINITIONS.BORDER, mazeData.size, mazeData.margin);
const borderTopLeft = wallBlockGenerator(ZERO, ZERO, {});
const borderTop = borderBlockGenerator(mazeData.size + mazeData.margin, ZERO, {});
const borderLeft = borderBlockGenerator(ZERO, mazeData.size + mazeData.margin, {});
const borderBottomRight = wallBlockGenerator(
  mazeData.size + mazeData.margin,
  mazeData.size + mazeData.margin,
  {},
);

container.x = container.y = 32;
container.addChild(
  borderTopLeft.view,
  borderTop.view,
  borderLeft.view,
  borderBottomRight.view,
);

storiesOf('engine.components.blockGenerator', module)
  .add('wall block at 0,0', () => (
    <PixiWrapper isContainer={true} component={container} height={HEIGHT} width={WIDTH} />
  ));
