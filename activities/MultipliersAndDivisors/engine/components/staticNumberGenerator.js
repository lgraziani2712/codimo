/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Text, TextStyle } from 'pixi.js';

import { HALF, ANCHOR_CENTER } from 'core/constants/numbers';
import componentGenerator, {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import emotionFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';

const SIX = 6;
const styleRaw = {
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
  fill: ['#ffffff', '#cccccc'],
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / SIX,
  dropShadowDistance: 3,
};

/**
 * Static generator for the numeric line's numbers.
 *
 * @version 1.0.0
 * @param {number} number The actor shape.
 * @param {number} size Block's size.
 * @param {number} margin Block's margin.
 * @return {CodimoComponent} The new static component.
 */
const staticNumberGenerator = (
  number: number,
  size: number,
  margin: number,
): CodimoComponent => {
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size + size / SIX,
  });
  const view = new Text(number.toString(), style);

  view.x = view.y = size / HALF;
  /**
   * PixiJS recomendation for better text resolution
   * @see https://github.com/pixijs/pixi.js/wiki/Performance-Tips#text
   */
  view.scale.x = view.scale.y = ANCHOR_CENTER;
  view.anchor.set(ANCHOR_CENTER);

  return componentGenerator(view, size, margin)
    .addFunctionality('emotions', emotionFunctionalityBuilder)
    .build();
};

export default staticNumberGenerator;
