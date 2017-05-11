/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Text, TextStyle } from 'pixi.js';
import { TweenLite, TimelineLite, Linear } from 'gsap';

import { HALF, ONE, ZERO, TWO, ANCHOR_CENTER, ACTOR_MOVEMENT_DURATION } from 'constants/numbers';
import { UnableToLeaveTheNumericLine } from 'engine/helpers/errors';
import { EASE_BE_HAPPY } from 'engine/helpers/customEases';
import { getRandomFloat } from 'engine/helpers/randomConfigurations';

const EIGHT = 8;

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
  finalPosition: string,
  beHappy(state: BeHappyState): void,
  changeActor(number: number): void,
  hasEnteredToNumericLine(): Promise<void>,
  resetPosition(): void,
  updatePosition(newPosition: string): Promise<void>,
|};
export type StaticNumberActor = {|
  view: Text,
  beHappy(state: BeHappyState): void,
|};
export type BeHappyState = 'start' | 'stop';

const beHappyConfig = (
  view: Text,
) => {
  const timeline = new TimelineLite({
    onComplete: () => {
      timeline.restart();
    },
    paused: true,
  });
  const delay = getRandomFloat(ZERO, TWO);

  timeline.to(view, ONE, {
    y: 0,
    ease: EASE_BE_HAPPY,
    delay,
  });

  return (state: BeHappyState): void => {
    if (state === 'start') {
      timeline.restart();
    } else {
      timeline.stop();
    }
  };
};

export const staticNumberGenerator = (number: number, size: number): StaticNumberActor => {
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size / HALF + size / EIGHT,
  });
  const view = new Text(number.toString(), style);

  view.anchor.set(ANCHOR_CENTER);
  view.x = view.y = size / HALF;

  return {
    view,
    beHappy: beHappyConfig(view),
  };
};

const hasEnteredToNumericLineConfig = (
  view: Text,
  size: number,
  margin: number,
  /**
   * This function needs the number's scope. That's why is a named function.
   *
   * @return {Promise<void>} animation promise
   */
) => (function hasEnteredToNumericLine(): Promise<void> {
  this.position = undefined;

  view.x = size / HALF;
  view.y = size + view.x + margin + margin;

  return new Promise((onComplete) => {
    TweenLite.to(view, ACTOR_MOVEMENT_DURATION, {
      y: size / HALF,
      ease: Linear.easeNone,
      onComplete,
    });
  });
});

const updatePositionConfig = (
  view: Text,
  size: number,
  margin: number,
  /**
   * This function needs the number's scope. That's why is a named function.
   *
   * @param  {string} newPosition  to go
   * @return {Promise<void>}       animation promise
   */
) => (function updatePosition(newPosition: string): Promise<void> {
  if (!this.position) {
    throw new UnableToLeaveTheNumericLine();
  }
  this.position = newPosition;
  const positionNumbers = this.position.split(',').map((string: string): number => (parseInt(string)));

  return new Promise((onComplete) => {
    TweenLite.to(view, ACTOR_MOVEMENT_DURATION, {
      x: positionNumbers[0] * (size + margin) + size / HALF + margin,
      y: positionNumbers[1] * (size + margin) + size / HALF + margin,
      ease: Linear.easeNone,
      onComplete,
    });
  });
});
const resetPositionConfig = (
  view: Text,
  initialPosition: Array<number>,
  size: number,
  margin: number,
) => (function resetPosition() {
  this.position = `${initialPosition[0]},${initialPosition[1]}`;

  view.x = initialPosition[0] * (size + margin) + size / HALF + margin;
  view.y = initialPosition[1] * (size + margin) + size / HALF + margin;
});
const changeActorConfig = (
  view: Text,
) => (number: number) => {
  view.text = number.toString();
};

/**
 * This generator returns a new instance of NumberActor.
 *
 * TODO validate number is between valid range.
 *
 * @param  {number} number        What number will be rendered. Valid values: [-99, 99].
 * @param  {string} position      Follows the format 'x,y'.
 * @param  {string} finalPosition Follows the format 'x,y'.
 * @param  {number} size          The size of a block used as relative value
 * @param  {number} margin        Size of block's margin
 * @return {NumberActor}          Used for animate a number
 */
const numberGenerator = (
  number: number,
  position: string,
  finalPosition: string,
  size: number,
  margin: number,
): NumberActor => {
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size / HALF + size / EIGHT,
  });
  const view = new Text(number.toString(), style);
  const initialPosition = position.split(',').map((string: string): number => (parseInt(string)));

  view.anchor.set(ANCHOR_CENTER);

  view.x = initialPosition[0] * (size + margin) + size / HALF + margin;
  view.y = initialPosition[1] * (size + margin) + size / HALF + margin;

  return {
    view,
    position,
    finalPosition,
    beHappy: beHappyConfig(view),
    changeActor: changeActorConfig(view),
    hasEnteredToNumericLine: hasEnteredToNumericLineConfig(view, size, margin),
    resetPosition: resetPositionConfig(view, initialPosition, size, margin),
    updatePosition: updatePositionConfig(view, size, margin),
  };
};

export default numberGenerator;
