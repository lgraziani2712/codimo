/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { TimelineLite } from 'gsap';

import {
  ZERO,
  ONE,
  DEFAULT_MOVEMENT_DURATION,
} from 'core/constants/numbers';
import {
  type CodimoComponent,
  type FunctionalityBuilder,
} from 'core/engines/pixijs/components/componentGenerator';

/**
 * It adds the hability to teleport to another component.
 *
 * @version 1.0.0
 * @return {Functionality} The functionality itself.
 */
const openThePortalBuilder: FunctionalityBuilder = () =>
  // TODO Make pre-execution checks
  ({
    openThePortal(componentToTeleportTo: CodimoComponent) {
      return new Promise((onComplete) => {
        const timeline = new TimelineLite({
          onComplete,
        });

        timeline
          .to(this.view, DEFAULT_MOVEMENT_DURATION, {
            alpha: ZERO,
            onComplete: () => {
              this.view.setParent(componentToTeleportTo.view);
            },
          })
          .to(this.view, DEFAULT_MOVEMENT_DURATION, {
            alpha: ONE,
            onComplete: () => {
              this.setPosition(componentToTeleportTo.position);
              this.view.setParent(componentToTeleportTo.view.parent);
            },
          });
      });
    },
  });

export default openThePortalBuilder;
