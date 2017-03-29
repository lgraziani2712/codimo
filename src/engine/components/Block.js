/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Sprite, Texture } from 'pixi.js';

export default function blockCreator(): Sprite {
  const block = new Sprite(Texture.WHITE);

  block.alpha = 1;
  block.tint = 0xda4b4b;
  block.height = block.width = 64;

  return block;
}
