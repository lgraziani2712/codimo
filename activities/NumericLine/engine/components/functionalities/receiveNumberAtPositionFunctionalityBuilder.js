/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  type CodimoComponent,
  type FunctionalityBuilder,
} from 'core/engines/pixijs/components/componentGenerator';

/**
 * This functionality is specific for the numeric line.
 * Receives the component and the position and starts
 * the animation.
 *
 * @version 1.0.0
 * @return {Functionality} The functionality itself.
 */
const receiveNumberAtPositionFunctionalityBuilder: FunctionalityBuilder = () => ({
  receiveNumberAtPosition(number: CodimoComponent, position: number): Promise<void> {
    if (typeof number.enterToNumericLine !== 'function') {
      throw new Error(
        '`receiveNumberAtPosition` functionality requires the component ' +
        'to have the `enterToNumericLine` functionality',
      );
    }

    return number.enterToNumericLine(this.view.getChildAt(position));
  },
});

export default receiveNumberAtPositionFunctionalityBuilder;
