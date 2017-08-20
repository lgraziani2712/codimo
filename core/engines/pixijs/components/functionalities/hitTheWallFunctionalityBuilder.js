/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { TimelineLite, SlowMo } from 'gsap';

import {
  ZERO,
  HALF,
  DEFAULT_MOVEMENT_DURATION,
} from 'core/constants/numbers';

import { type FunctionalityBuilder } from '../componentGenerator';
import { type Direction } from '../blockGenerator';

const HIT_DURATION = 0.4;
const EASE_STRENG_AT_EACH_END = ZERO;

/**
 * A builder with two prerequired params.
 *
 * @version 1.0.0
 * @param  {number} [movementDuration=0.5] Main animation time
 * @param  {number} [hitDuration=0.4]      Hit effect time
 * @return {FunctionalityBuilder}          This new function returns an object with
 *                                         the `hitTheWall` functionality.
 */
const hitTheWallFunctionalityBuilder = (
  movementDuration: number = DEFAULT_MOVEMENT_DURATION,
  hitDuration: number = HIT_DURATION,
): FunctionalityBuilder => (
  size: number,
  margin: number,
) => ({
  /**
   * This animation simulates as if the component has hit a wall.
   * It uses a Linear ease.
   *
   * @param  {Direction} direction what wall has hit.
   * @return {Promise<void>}       animation's promise.
   */
  hitTheWall(direction: Direction) {
    return new Promise((onComplete) => {
      let movement;
      const distance = size / HALF - margin;
      const oldValues = {
        x: this.view.x,
        y: this.view.y,
      };
      const timeline = new TimelineLite({
        // FIXME monkeypatch @see https://github.com/greensock/GreenSock-JS/issues/226
        onComplete: () => {
          this.view.x = oldValues.x;
          this.view.y = oldValues.y;

          onComplete();
        },
      });

      switch (direction) {
      case 'top':
        movement = {
          x: this.view.x,
          y: this.view.y - distance,
        };
        break;
      case 'right':
        movement = {
          x: this.view.x + distance,
          y: this.view.y,
        };
        break;
      case 'bottom':
        movement = {
          x: this.view.x,
          y: this.view.y + distance,
        };
        break;
      case 'left':
        movement = {
          x: this.view.x - distance,
          y: this.view.y,
        };
        break;
      }

      timeline
          .to(this.view, movementDuration, {
            ...movement,
            ease: SlowMo.ease.config(hitDuration, EASE_STRENG_AT_EACH_END, true),
          })
          .to(this.view, movementDuration, {
            ...movement,
            ease: SlowMo.ease.config(hitDuration, EASE_STRENG_AT_EACH_END, true),
          })
          .to(this.view, movementDuration, {
            ...movement,
            ease: SlowMo.ease.config(hitDuration, EASE_STRENG_AT_EACH_END, true),
          });
    });
  },
});

export default hitTheWallFunctionalityBuilder;
