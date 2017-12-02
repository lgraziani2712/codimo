/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container, Point } from 'pixi.js';
import { TimelineLite, Linear, SlowMo } from 'gsap';

import { ZERO, TWO, HALF, DEFAULT_MOVEMENT_DURATION } from 'core/constants/numbers';
import {
  type CodimoComponent,
  type FunctionalityBuilder,
} from 'core/engines/pixijs/components/componentGenerator';

const GLOBAL_POINT = new Point();
const JUMP_DURATION = 0.4;

/**
 * It adds to the actor the possibility to jump to the numeric line.
 *
 * @version 1.0.0
 * @param  {number}          size      Block's size.
 * @param  {number}          margin    Block's margin.
 * @param  {CodimoComponent} component The component to add the functionality.
 * @return {Functionality}             The functionality itself.
 */
const enterToNumericLineFunctionalityBuilder: FunctionalityBuilder = (
  size: number,
  margin: number,
  component: CodimoComponent,
) => {
  if (typeof component.position !== 'string') {
    throw new Error(
      // eslint-disable-next-line max-len
      '`enterToNumericLine` functionality requires the component to have the `positioning` functionality',
    );
  }

  return {
    enterToNumericLine(emptyBlock: Container): Promise<void> {
      this.position = '';
      const localPosition = emptyBlock.toLocal(GLOBAL_POINT, this.view);

      this.view.setParent(emptyBlock);
      this.view.position = localPosition;

      return new Promise((onComplete) => {
        const timeline = new TimelineLite({
          onComplete,
        });

        timeline
          .to(this.view, DEFAULT_MOVEMENT_DURATION, {
            y: size / HALF,
            x: size / HALF,
            ease: Linear.easeNone,
          })
          .to(this.view.scale, DEFAULT_MOVEMENT_DURATION, {
            x: this.view.scale.x * TWO,
            y: this.view.scale.y * TWO,
            ease: SlowMo.ease.config(JUMP_DURATION, ZERO, true),
          }, ZERO);
      });
    },
  };
};

export default enterToNumericLineFunctionalityBuilder;
