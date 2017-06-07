/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container, Point, Text, TextStyle } from 'pixi.js';
import { TweenLite, TimelineLite, Linear, Power1, SlowMo } from 'gsap';

import { HALF, ONE, ZERO, TWO, ANCHOR_CENTER, ACTOR_MOVEMENT_DURATION } from 'constants/numbers';
import { EASE_BE_HAPPY, EASE_BE_SAD } from 'engine/helpers/customEases';
import { getRandomFloat } from 'helpers/randomizers';

const SIX = 6;
const SHAKE_DISTANCE = 2.3;
const FALL_DISTANCE_MULTIPLIER = 0.95;
const FALL_SPIN_DURATION = 3;
const JUMP_DURATION = 0.4;
const SQUISH_DURATION = 2.5;

export const START_STATE = 'start';
export const STOP_STATE = 'stop';

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

type Direction = 'top' | 'right' | 'bottom' | 'left';
export type NumberActor = {|
  view: Text,
  position: string,
  finalPosition: string,
  beHappy(state: ActorEmotionState): void,
  beSad(state: ActorEmotionState): void,
  beTheFallenOne(): Promise<void>,
  changeActor(number: number): void,
  hasEnteredToNumericLine(emptyBlock: Container): Promise<void>,
  hitTheWall(direction: Direction): Promise<void>,
  resetPosition(): void,
  updatePosition(newPosition: string): Promise<void>,
|};
export type StaticNumberActor = {|
  view: Text,
  beHappy(state: ActorEmotionState): void,
  beSad(state: ActorEmotionState): void,
|};
export type ActorEmotionState = 'start' | 'stop';

const hitTheWallConfig = (
  view: Text,
  size: number,
  margin: number,
) => ((direction: Direction) => (new Promise((onComplete) => {
  let movement;
  const distance = size / HALF - margin;
  const timeline = new TimelineLite({ onComplete });

  switch (direction) {
  case 'top':
    movement = {
      x: view.x,
      y: view.y - distance,
    };
    break;
  case 'right':
    movement = {
      x: view.x + distance,
      y: view.y,
    };
    break;
  case 'bottom':
    movement = {
      x: view.x,
      y: view.y + distance,
    };
    break;
  case 'left':
    movement = {
      x: view.x - distance,
      y: view.y,
    };
    break;
  }

  timeline
    .to(view, ACTOR_MOVEMENT_DURATION, {
      ...movement,
      ease: SlowMo.ease.config(JUMP_DURATION, ZERO, true),
    })
    .to(view, ACTOR_MOVEMENT_DURATION, {
      ...movement,
      ease: SlowMo.ease.config(JUMP_DURATION, ZERO, true),
    })
    .to(view, ACTOR_MOVEMENT_DURATION, {
      ...movement,
      ease: SlowMo.ease.config(JUMP_DURATION, ZERO, true),
    });
})));
const beTheFallenOneConfig = (
  view: Text,
  size: number,
) => (function beTheFallenOne(): Promise<void> {
  /**
   * Has fell into oblivion
   */
  this.position = undefined;

  return new Promise((onComplete) => {
    const timeline = new TimelineLite({ onComplete });

    timeline
      .to(view, ACTOR_MOVEMENT_DURATION, {
        y: view.y - size * FALL_DISTANCE_MULTIPLIER,
        ease: Linear.easeNone,
      })
      .to(view, FALL_SPIN_DURATION, {
        rotation: 50,
        ease: Power1.easeIn,
      }, ZERO)
      .to(view.scale, SQUISH_DURATION, {
        x: 0,
        y: 0,
        ease: Power1.easeIn,
      }, ACTOR_MOVEMENT_DURATION);
  });
});
const emotionConfig = (
  view: Text,
  size: number,
  beHappy: boolean,
) => {
  const timeline = new TimelineLite({
    onComplete: () => {
      timeline.restart();
    },
    paused: true,
  });
  const delay = getRandomFloat(ZERO, TWO);

  if (beHappy) {
    timeline.to(view, ONE, {
      y: 0,
      ease: EASE_BE_HAPPY,
      delay,
    });
  } else {
    timeline.to(view, ONE, {
      x: size / SHAKE_DISTANCE,
      ease: EASE_BE_SAD,
      delay,
    });
  }

  return (state: ActorEmotionState): void => {
    if (state === START_STATE) {
      timeline.restart();
    } else {
      timeline.time(ZERO).stop();
    }
  };
};

export const staticNumberGenerator = (number: number, size: number): StaticNumberActor => {
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size + size / SIX,
  });
  const view = new Text(number.toString(), style);

  view.anchor.set(ANCHOR_CENTER);
  view.x = view.y = size / HALF;
  /**
   * PixiJS recomendation for better text resolution
   * @see https://github.com/pixijs/pixi.js/wiki/Performance-Tips#text
   */
  view.scale.x = view.scale.y = ANCHOR_CENTER;

  return {
    view,
    beHappy: emotionConfig(view, size, true),
    beSad: emotionConfig(view, size, false),
  };
};

const GLOBAL_POINT = new Point();
const hasEnteredToNumericLineConfig = (
  view: Text,
  size: number,
  /**
   * This function needs the number's scope. That's why is a named function.
   *
   * @param {Container} emptyBlock  who is going to be the new parent
   * @return {Promise<void>}        animation promise
   */
) => (function hasEnteredToNumericLine(emptyBlock: Container): Promise<void> {
  this.position = undefined;
  const localPosition = emptyBlock.toLocal(GLOBAL_POINT, view);

  view.setParent(emptyBlock);
  view.position = localPosition;

  return new Promise((onComplete) => {
    const timeline = new TimelineLite({ onComplete });

    timeline
      .to(view, ACTOR_MOVEMENT_DURATION, {
        y: size / HALF,
        x: size / HALF,
        ease: Linear.easeNone,
      })
      .to(view.scale, ACTOR_MOVEMENT_DURATION, {
        x: view.scale.x * TWO,
        y: view.scale.y * TWO,
        ease: SlowMo.ease.config(JUMP_DURATION, ZERO, true),
      }, ZERO);
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
  /**
   * PixiJS recomendation for better text resolution
   * @see https://github.com/pixijs/pixi.js/wiki/Performance-Tips#text
   */
  view.scale.x = view.scale.y = ANCHOR_CENTER;
  view.rotation = 0;
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
    fontSize: size + size / SIX,
  });
  const view = new Text(number.toString(), style);
  const initialPosition = position.split(',').map((string: string): number => (parseInt(string)));

  view.anchor.set(ANCHOR_CENTER);

  view.x = initialPosition[0] * (size + margin) + size / HALF + margin;
  view.y = initialPosition[1] * (size + margin) + size / HALF + margin;
  /**
   * PixiJS recomendation for better text resolution
   * @see https://github.com/pixijs/pixi.js/wiki/Performance-Tips#text
   */
  view.scale.x = view.scale.y = ANCHOR_CENTER;

  return {
    view,
    position,
    finalPosition,
    beHappy: emotionConfig(view, size, true),
    beSad: emotionConfig(view, size, false),
    beTheFallenOne: beTheFallenOneConfig(view, size),
    changeActor: changeActorConfig(view),
    hasEnteredToNumericLine: hasEnteredToNumericLineConfig(view, size),
    hitTheWall: hitTheWallConfig(view, size, margin),
    resetPosition: resetPositionConfig(view, initialPosition, size, margin),
    updatePosition: updatePositionConfig(view, size, margin),
  };
};

export default numberGenerator;
