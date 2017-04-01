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

type Actor = {|
  view: Text,
  position: string,
  updatePosition: Function,
|};
function updatePosition(newPosition: string): void {
  // Object scope
  this.position = newPosition.split(',');
  const positionNumbers = this.position.map((string: string): number => (parseInt(string)));

  this.view.x = positionNumbers[0] * WIDTH + (WIDTH - this.view.width) / HALF - ONE;
  this.view.y = positionNumbers[1] * WIDTH + (HEIGHT - this.view.height) / HALF + ONE;
}
const numberGenerator = (number: number): Actor => {
  const view = new Text(number.toString(), style);

  view.x = (WIDTH - view.width) / HALF - ONE;
  view.y = (HEIGHT - view.height) / HALF + ONE;

  return {
    view,
    position: '',
    updatePosition,
  };
};

export default numberGenerator;
