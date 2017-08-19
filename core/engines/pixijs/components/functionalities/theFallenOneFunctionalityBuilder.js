/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { TimelineLite, Linear, Power1 } from 'gsap';

import { ZERO, DEFAULT_MOVEMENT_DURATION, ANCHOR_CENTER } from 'core/constants/numbers';

import { type CodimoComponent, type FunctionalityBuilder } from '../componentGenerator';

const FALL_DISTANCE_MULTIPLIER = 0.95;
const FALL_SPIN_DURATION = 3;
const SQUISH_DURATION = 2.5;

/**
 * This method is intended to animate when the component
 * falls from the stage.
 *
 * @version 1.0.0
 * @param  {number}           size      Block's size.
 * @param  {number}           margin    Not used.
 * @param  {CodimoComponent}  component A PixiJS Container.
 * @return {Functionality}              Adds `beTheFallenOne` method.
 */
const theFallenOneFunctionalityBuilder: FunctionalityBuilder = (
  size: number,
  margin: number,
  component: CodimoComponent,
) => {
  if (typeof component.position !== 'string') {
    throw new Error(
      '`theFallenOne` functionality requires the component to have the `positioning` functionality',
    );
  }

  return {
    beTheFallenOne() {
      /**
       * Has fell into oblivion
       */
      this.position = '';

      return new Promise((onComplete) => {
        const timeline = new TimelineLite({ onComplete });

        timeline
            .to(this.view, DEFAULT_MOVEMENT_DURATION, {
              y: this.view.y - size * FALL_DISTANCE_MULTIPLIER,
              ease: Linear.easeNone,
            })
            .to(this.view, FALL_SPIN_DURATION, {
              rotation: 50,
              ease: Power1.easeIn,
            }, ZERO)
            .to(this.view.scale, SQUISH_DURATION, {
              x: 0,
              y: 0,
              ease: Power1.easeIn,
            }, DEFAULT_MOVEMENT_DURATION);
      });
    },
    resetTheFallenOne() {
      this.view.scale.x = this.view.scale.y = ANCHOR_CENTER;
      this.view.rotation = 0;
    },
  };
};

export default theFallenOneFunctionalityBuilder;
