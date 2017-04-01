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
type Block = {|
  view: Sprite,
  position: string,
|};
const blockGenerator = (type: number = BLOCK_DEFINITIONS.WALL) => (): Block => {
  const view = new Sprite(Texture.WHITE);

  view.alpha = 1;
  view.height = view.width = 64;
  view.tint = type;

  return {
    view,
    position: '',
  };
};

export default blockGenerator;
