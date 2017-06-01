/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container, Sprite, Texture } from 'pixi.js';

export const BLOCK_DEFINITIONS = {
  BORDER: 0x7d7d7d,
  PATH: 0x2a2a2a,
  WALL: 0xda4b4b,
};

export type ActivePathBorders = {|
  bottom?: boolean,
  left?: boolean,
  right?: boolean,
  top?: boolean,
|};
type Block = {|
  view: Container,
  position: string,
|};
const blockGeneratorConfig = (
  type: number,
  size: number,
  margin: number,
  // $FlowDoNotDisturb @see https://github.com/facebook/flow/issues/2386
) => (x: number, y: number, activePathBorders?: ActivePathBorders = {}): Block => {
  const view = new Container();
  const block = new Sprite(Texture.WHITE);
  //////////////////////////////
  // Borders
  //////////////////////////////
  const borderBottom = new Sprite(Texture.WHITE);
  const borderLeft = new Sprite(Texture.WHITE);
  const borderRight = new Sprite(Texture.WHITE);
  const borderTop = new Sprite(Texture.WHITE);
  //////////////////////////////
  // Corners
  //////////////////////////////
  const cornerTopLeft = new Sprite(Texture.WHITE);
  const cornerTopRight = new Sprite(Texture.WHITE);
  const cornerBottomLeft = new Sprite(Texture.WHITE);
  const cornerBottomRight = new Sprite(Texture.WHITE);

  block.alpha = 1;
  block.tint = type;
  block.height = block.width = size;
  block.x = block.y = margin;

  borderLeft.width = borderRight.width = margin;
  borderLeft.height = borderRight.height = size;
  borderTop.width = borderBottom.width = size;
  borderTop.height = borderBottom.height = margin;

  borderLeft.alpha = borderRight.alpha = borderTop.alpha = borderBottom.alpha = 1;

  borderTop.x = borderLeft.y = margin;
  borderBottom.y = borderRight.x = size + margin;
  borderBottom.x = borderRight.y = margin;

  if (activePathBorders.bottom) {
    borderBottom.tint = type;
  }
  if (activePathBorders.left) {
    borderLeft.tint = type;
  }
  if (activePathBorders.right) {
    borderRight.tint = type;
  }
  if (activePathBorders.top) {
    borderTop.tint = type;
  }

  cornerBottomLeft.width = cornerBottomLeft.height = margin;
  cornerBottomRight.width = cornerBottomRight.height = margin;
  cornerTopLeft.width = cornerTopLeft.height = margin;
  cornerTopRight.width = cornerTopRight.height = margin;

  cornerTopRight.x = cornerBottomRight.x = size + margin;
  cornerBottomLeft.y = cornerBottomRight.y = size + margin;

  view.x = x;
  view.y = y;

  view.addChild(
    block,
    borderBottom,
    borderLeft,
    borderRight,
    borderTop,
    cornerBottomLeft,
    cornerBottomRight,
    cornerTopLeft,
    cornerTopRight,
  );

  return {
    view,
    position: `${x},${y}`,
  };
};

export default blockGeneratorConfig;
