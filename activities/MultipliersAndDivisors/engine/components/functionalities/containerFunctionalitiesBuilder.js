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
 * This functionalities allow the actorsContainer to
 * interact with the objects related to it.
 *
 * @version 1.0.0
 * @param {Array<CodimoComponent>} actors List of movable numbers.
 * @param {CodimoComponent} portalPlatform The portal where the numbers teleport.
 * @return {FunctionalityBuilder} It builds the actorsContainer Mixin.
 */
const containerFunctionalitiesBuilder = (
  actors: Array<CodimoComponent>,
  portalPlatform: CodimoComponent,
): FunctionalityBuilder => () => ({
  resetAllActors() {
    actors.forEach(actor => {
      actor.resetPosition();
    });
  },
  actors: () => actors,
  openThePortal: (actor: number) => actors[actor].openThePortal(portalPlatform),
});

export default containerFunctionalitiesBuilder;
