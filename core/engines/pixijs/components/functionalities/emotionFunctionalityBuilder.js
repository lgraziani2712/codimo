/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { TimelineLite } from 'gsap';

import { getRandomFloat } from 'core/helpers/randomizers';
import { ZERO, ONE, TWO } from 'core/constants/numbers';
import { EASE_BE_HAPPY, EASE_BE_SAD } from 'core/engines/pixijs/helpers/customEases';

import { type CodimoComponent, type FunctionalityBuilder } from '../componentGenerator';

export type ActorEmotionState = 'start' | 'stop';

export const START_STATE = 'start';
export const STOP_STATE = 'stop';
const SHAKE_DISTANCE = 2.3;

/**
 * This two new methods makes the component jump from happiness
 * and shake from sadness.
 *
 * @version 1.0.0
 * @param  {number}           size      Block's size.
 * @param  {number}           margin    Not used.
 * @param  {CodimoComponent}  component A PixiJS Container.
 * @return {Functionality}              Adds `beHappy` and `beSad` methods.
 */
const emotionFunctionalityBuilder: FunctionalityBuilder = (
  size: number,
  margin: number,
  component: CodimoComponent,
) => ({
  beHappy: emotionTimelineGenerator('happy', size, component),
  beSad: emotionTimelineGenerator('sad', size, component),
});

const emotionTimelineGenerator = (
  state: 'happy' | 'sad',
  size: number,
  component: CodimoComponent,
) => {
  const timeline = new TimelineLite({
    onComplete: () => {
      timeline.restart();
    },
    paused: true,
  });
  const delay = getRandomFloat(ZERO, TWO);

  if (state === 'happy') {
    timeline.to(component.view, ONE, {
      y: 0,
      ease: EASE_BE_HAPPY,
      delay,
    });
  } else {
    timeline.to(component.view, ONE, {
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

export default emotionFunctionalityBuilder;
