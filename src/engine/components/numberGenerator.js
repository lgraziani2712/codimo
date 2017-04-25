/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Text, TextStyle } from 'pixi.js';
import { TweenLite, Linear } from 'gsap';

import { HALF, ONE, ACTOR_MOVEMENT_DURATION } from 'constants/numbers';

const HEIGHT = 8;

const styleRaw = {
  fontFamily: 'Arial',
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
};

export type NumberActor = {|
  view: Text,
  position: string,
  updatePosition(newPosition: string): Promise<void>,
  resetPosition(): void,
|};

export const staticNumberGenerator = (number: number, size: number) => {
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size / HALF + size / HEIGHT,
  });
  const view = new Text(number.toString(), style);

  view.anchor.x = view.anchor.y = 0.5;

  return {
    view,
  };
};

const updatePositionConfig = (
  view: Text,
  size: number,
  /**
   * This function needs the number's scope. That's why is a named function.
   *
   * @param  {string} newPosition represents the new position.
   * @return {Promise<void>}      the animation promise.
   */
) => (function updatePosition(newPosition: string): Promise<void> {
  this.position = newPosition;
  const positionNumbers = this.position.split(',').map((string: string): number => (parseInt(string)));

  return new Promise((onComplete) => {
    TweenLite.to(view, ACTOR_MOVEMENT_DURATION, {
      x: positionNumbers[0] * size + (size - view.width) / HALF - ONE,
      y: positionNumbers[1] * size + (size - view.height) / HALF + ONE,
      ease: Linear.easeNone,
      onComplete,
    });
  });
});
const resetPositionConfig = (view: Text, initialPosition: Array<number>, size: number) => (): void => {
  view.x = initialPosition[0] * size + (size - view.width) / HALF - ONE;
  view.y = initialPosition[1] * size + (size - view.height) / HALF + ONE;
};
const numberGenerator = (number: number, position: string, size: number): NumberActor => {
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size / HALF + size / HEIGHT,
  });
  const view = new Text(number.toString(), style);
  const initialPosition = position.split(',').map((string: string): number => (parseInt(string)));

  view.x = initialPosition[0] * size + (size - view.width) / HALF - ONE;
  view.y = initialPosition[1] * size + (size - view.height) / HALF + ONE;

  return {
    view,
    position,
    resetPosition: resetPositionConfig(view, initialPosition, size),
    updatePosition: updatePositionConfig(view, size),
  };
};

export default numberGenerator;
