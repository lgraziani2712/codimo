/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Sprite, Texture } from 'pixi.js';

export const BLOCK_DEFINITIONS = {
  BORDER: 0x7d7d7d,
  PATH: 0x2a2a2a,
  WALL: 0xda4b4b,
};

const blockGenerator = (type: number = BLOCK_DEFINITIONS.WALL) => (): Sprite => {
  const block = new Sprite(Texture.WHITE);

  block.alpha = 1;
  block.height = block.width = 64;
  block.tint = type;

  return block;
};

export default blockGenerator;
