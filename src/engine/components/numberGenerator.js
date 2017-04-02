/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Text, TextStyle } from 'pixi.js';
import { TweenLite, Linear } from 'gsap';

import { BLOCK_SIZE, HALF, ONE } from 'constants/numbers';

const WIDTH = BLOCK_SIZE;
const HEIGHT = WIDTH;
const ACTOR_MOVEMENT_DURATION = 0.5;
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
  initialPosition: Array<number>,
  position: string,
  updatePosition: Function,
  resetPosition: Function,
|};
function updatePosition(newPosition: string): void {
  // Object scope
  this.position = newPosition;
  const positionNumbers = this.position.split(',').map((string: string): number => (parseInt(string)));

  TweenLite.to(this.view, ACTOR_MOVEMENT_DURATION, {
    x: positionNumbers[0] * WIDTH + (WIDTH - this.view.width) / HALF - ONE,
    y: positionNumbers[1] * WIDTH + (HEIGHT - this.view.height) / HALF + ONE,
    ease: Linear.easeNone,
  });
}
function resetPosition(): void {
  this.view.x = this.initialPosition[0] * WIDTH + (WIDTH - this.view.width) / HALF - ONE;
  this.view.y = this.initialPosition[1] * WIDTH + (HEIGHT - this.view.height) / HALF + ONE;
}
const numberGenerator = (number: number, position: string): Actor => {
  const view = new Text(number.toString(), style);
  const positionValues = position.split(',').map((string: string): number => (parseInt(string)));

  view.x = positionValues[0] * WIDTH + (WIDTH - view.width) / HALF - ONE;
  view.y = positionValues[1] * WIDTH + (HEIGHT - view.height) / HALF + ONE;

  return {
    view,
    initialPosition: positionValues,
    position,
    updatePosition,
    resetPosition,
  };
};

export default numberGenerator;
