/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container, Sprite, Texture } from 'pixi.js';

import { ZERO, ONE } from 'core/constants/numbers';

import { type CodimoComponent } from './componentGenerator';

const SHADOW_WALL = 0.075;

export const BLOCK_DEFINITIONS = {
  BORDER: 0x7d7d7d,
  PATH: 0x2a2a2a,
  WALL: 0xda4b4b,
};

export type ActivePathBorders = {
  bottom?: boolean,
  left?: boolean,
  right?: boolean,
  top?: boolean,

  [any]: empty,
};
export type Direction = 'top' | 'right' | 'bottom' | 'left';
type CornerDirection = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

const cornerGenerator = (position: CornerDirection, size: number, margin: number) => {
  const corner = new Sprite(Texture.WHITE);

  corner.width = corner.height = margin;
  corner.x = position === 'topRight' || position === 'bottomRight' ? size + margin : ZERO;
  corner.y = position === 'bottomLeft' || position === 'bottomRight' ? size + margin : ZERO;

  return corner;
};
const wallGenerator = (
  position: Direction,
  activePathBorders: ActivePathBorders,
  size: number,
  margin: number,
) => {
  const wall = new Sprite(Texture.WHITE);

  // If is the wall is an active path, then it is transparent.
  wall.alpha = activePathBorders[position] ? SHADOW_WALL : ONE;

  wall.width = position === 'right' || position === 'left' ? margin : size;
  wall.height = position === 'right' || position === 'left' ? size : margin;

  return wall;
};
const blockBuilder = (tint: $Values<typeof BLOCK_DEFINITIONS>, size: number, margin: number) => {
  const block = new Sprite(Texture.WHITE);

  block.alpha = BLOCK_DEFINITIONS.PATH === tint ? ZERO : ONE;
  block.tint = tint;
  block.height = block.width = size;
  block.x = block.y = margin;

  return block;
};

/**
 * This visual component represent a block.
 * One step for a movable component means moving from
 * one block to another.
 *
 * @version 1.0.0
 * @param {number} tint Block's colour.
 * @param {number} size Block's size.
 * @param {number} margin Block's margin.
 * @return {CodimoComponent} A visual component representing a block.
 */
const blockGenerator = (
  tint: number,
  size: number,
  margin: number,
) => (x: number, y: number, activePathBorders?: ActivePathBorders = {}): CodimoComponent => {
  const view = new Container();
  const block = blockBuilder(tint, size, margin);
  //////////////////////////////
  // Borders
  //////////////////////////////
  const topWall = wallGenerator('top', activePathBorders, size, margin);
  const rightWall = wallGenerator('right', activePathBorders, size, margin);
  const bottomWall = wallGenerator('bottom', activePathBorders, size, margin);
  const leftWall = wallGenerator('left', activePathBorders, size, margin);
  //////////////////////////////
  // Corners
  //////////////////////////////
  const topLeftCorner = cornerGenerator('topLeft', size, margin);
  const topRightCorner = cornerGenerator('topRight', size, margin);
  const bottomLeftCorner = cornerGenerator('bottomLeft', size, margin);
  const bottomRightCorner = cornerGenerator('bottomRight', size, margin);

  // TODO move it to the generator.
  topWall.x = leftWall.y = bottomWall.x = rightWall.y = margin;
  bottomWall.y = rightWall.x = size + margin;

  view.x = x;
  view.y = y;

  view.addChild(
    block,
    topWall,
    rightWall,
    bottomWall,
    leftWall,
    topLeftCorner,
    topRightCorner,
    bottomLeftCorner,
    bottomRightCorner,
  );

  return {
    view,
  };
};

export default blockGenerator;
