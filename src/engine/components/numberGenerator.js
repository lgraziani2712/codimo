/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Text, TextStyle } from 'pixi.js';
import { TweenLite, Linear } from 'gsap';

import { BLOCK_SIZE, HALF, ONE, ACTOR_MOVEMENT_DURATION } from 'constants/numbers';

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

export type NumberActor = {|
  view: Text,
  initialPosition: Array<number>,
  position: string,
  updatePosition(newPosition: string): Promise<void>,
  resetPosition(): void,
|};

export const staticNumberGenerator = (number: number) => {
  const view = new Text(number.toString(), style);

  view.anchor.x = view.anchor.y = 0.5;

  return {
    view,
  };
};

function updatePosition(newPosition: string): Promise<void> {
  // Object scope
  this.position = newPosition;
  const positionNumbers = this.position.split(',').map((string: string): number => (parseInt(string)));

  return new Promise((onComplete) => {
    TweenLite.to(this.view, ACTOR_MOVEMENT_DURATION, {
      x: positionNumbers[0] * WIDTH + (WIDTH - this.view.width) / HALF - ONE,
      y: positionNumbers[1] * HEIGHT + (HEIGHT - this.view.height) / HALF + ONE,
      ease: Linear.easeNone,
      onComplete,
    });
  });
}
function resetPosition(): void {
  this.view.x = this.initialPosition[0] * WIDTH + (WIDTH - this.view.width) / HALF - ONE;
  this.view.y = this.initialPosition[1] * HEIGHT + (HEIGHT - this.view.height) / HALF + ONE;
}
const numberGenerator = (number: number, position: string): NumberActor => {
  const view = new Text(number.toString(), style);
  const initialPosition = position.split(',').map((string: string): number => (parseInt(string)));

  view.x = initialPosition[0] * WIDTH + (WIDTH - view.width) / HALF - ONE;
  view.y = initialPosition[1] * HEIGHT + (HEIGHT - view.height) / HALF + ONE;

  return {
    view,
    initialPosition,
    position,
    updatePosition,
    resetPosition,
  };
};

export default numberGenerator;
