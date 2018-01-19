/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Sprite } from 'pixi.js';

import { TWO } from 'core/constants/numbers';
import blockGenerator, {
  type ActivePathBorders,
} from 'core/engines/pixijs/components/blockGenerator';
import { type CodimoComponent } from 'core/engines/pixijs/components/componentGenerator';
import CodimoEnergyPath from 'core/constants/images/codimo-energy.svg';

const RED = 0xf9524e;
const FIX_CENTER = 5;
/**
 * Extension from the core blockComponent which adds the
 * posibility to create the teleport platform.
 *
 * @version 1.0.0
 * @param  {number} tint      Unused. Block's colour.
 * @param  {number} size      Block's size.
 * @param  {number} margin    Block's margin.
 * @return {CodimoComponent}  A visual component representing a block.
 */
const platformBlockGenerator = (
  tint: number,
  size: number,
  margin: number,
) => {
  const baseBlock = blockGenerator(RED, size, margin);

  return (x: number, y: number, activePathBorders?: ActivePathBorders = {}): CodimoComponent => {
    const block = baseBlock(x, y, activePathBorders);
    const logo = Sprite.fromImage(CodimoEnergyPath);

    logo.width = logo.height = size / TWO;
    logo.x = logo.y = size / TWO - FIX_CENTER;

    block.view.addChild(logo);

    return block;
  };
};

export default platformBlockGenerator;
