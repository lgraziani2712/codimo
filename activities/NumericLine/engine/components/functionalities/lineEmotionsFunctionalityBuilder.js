/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type ActorEmotionState }
  from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';
import {
  type CodimoComponent,
  type FunctionalityBuilder,
} from 'core/engines/pixijs/components/componentGenerator';

/**
 * This emotion functionality is specific for the line since
 * is not the line itself who has emotions but its children.
 * Hence, it needs this functionality to invoke each of them.
 *
 * @version 1.0.0
 * @param  {Array<CodimoComponent>} staticNumbers Pre builder parameter.
 * @return {Functionality}                        The Functionality itself.
 */
const lineEmotionsFunctionalityBuilder = (
  staticNumbers: Array<CodimoComponent>,
): FunctionalityBuilder => () => ({
  beHappy: emotionGenerator('happy', staticNumbers),
  beSad: emotionGenerator('sad', staticNumbers),
});

const emotionGenerator = (
  animationState: 'happy' | 'sad',
  staticNumbers: Array<CodimoComponent>,
) => (state: ActorEmotionState) => {
  if (animationState === 'happy') {
    staticNumbers.forEach((number) => {
      number.beHappy(state);
    });
  } else {
    staticNumbers.forEach((number) => {
      number.beSad(state);
    });
  }
};

export default lineEmotionsFunctionalityBuilder;
