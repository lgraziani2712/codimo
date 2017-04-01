/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Text, TextStyle } from 'pixi.js';

import { BLOCK_SIZE, HALF, ONE } from 'constants/numbers';

const WIDTH = BLOCK_SIZE;
const HEIGHT = WIDTH;
const style = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 38,
  fontWeight: 'bold',
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  // eslint-disable-next-line no-magic-numbers
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 2,
});

const numberGenerator = (number: number): Text => {
  const texturedNumber = new Text(number.toString(), style);

  texturedNumber.x = (WIDTH - texturedNumber.width) / HALF - ONE;
  texturedNumber.y = (HEIGHT - texturedNumber.height) / HALF + ONE;

  return texturedNumber;
};

export default numberGenerator;
