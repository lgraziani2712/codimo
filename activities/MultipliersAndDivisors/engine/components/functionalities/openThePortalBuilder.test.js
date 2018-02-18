/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import componentGenerator from 'core/engines/pixijs/components/componentGenerator';
import positioningFunctionalityBuilder, {
  NO_START_POSITION,
} from 'core/engines/pixijs/components/functionalities/positioningFunctionalityBuilder';

import openThePortalBuilder from './openThePortalBuilder';

// eslint-disable-next-line max-len
describe('activities/MultipliersAndDivisors/engine/components/functionalities/openThePortalBuilder', () => {
  it('should change parent when teleport', async () => {
    const size = 64;
    const margin = 10;
    const firstParent = new Container();
    const parentSecondParent = new Container();
    const secondParentView = new Container();

    secondParentView.setParent(parentSecondParent);

    const secondParent = {
      position: NO_START_POSITION,
      view: secondParentView,
    };
    const view = new Container();

    view.setParent(firstParent);

    const actor = componentGenerator(view, size, margin)
      .addFunctionality(
        'positioning',
        positioningFunctionalityBuilder(NO_START_POSITION),
      )
      .addFunctionality('openThePortal', openThePortalBuilder)
      .build();

    await actor.openThePortal(secondParent);

    expect(actor.view.parent).toBe(parentSecondParent);
  });
});
