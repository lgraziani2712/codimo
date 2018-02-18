/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type FunctionalityBuilder } from 'core/engines/pixijs/components/componentGenerator';
import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';

/**
 * To make things a little more entertain, the number will change every
 * time the game resets. The key point here is that it generates a new
 * number between a valid range for a specific difficulty.
 *
 * @version 1.0.0
 * @param {GameDifficulty} difficulty Metadata required to verify if
 *                                    the randomizer needs to be called.
 * @param {Array<number>} randomizeActor Randomizer function.
 * @param {number} actorExitIdx Index used by the randomizer.
 * @return {FunctionalityBuilder} The functionality itself.
 */
const changeActorFunctionalityBuilder = (
  difficulty: GameDifficulty,
  randomizeActor: () => Array<number>,
  actorExitIdx: number,
): FunctionalityBuilder => () => ({
  changeActor() {
    if (difficulty !== 'hard') {
      return;
    }
    const number = randomizeActor()[actorExitIdx];

    this.view.text = number.toString();
  },
});

export default changeActorFunctionalityBuilder;
