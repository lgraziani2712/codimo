/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import componentGenerator from 'core/engines/pixijs/components/componentGenerator';

import openThePortalBuilder from './openThePortalBuilder';

// eslint-disable-next-line max-len
describe('activities/MultipliersAndDivisors/engine/components/functionalities/openThePortalBuilder', () => {
  it('should change parent when teleport', async () => {
    const size = 64;
    const margin = 10;
    const firstParent = new Container();
    const secondParent = {
      view: new Container(),
    };
    const actor =
      componentGenerator(new Container(), size, margin)
        .addFunctionality('openThePortal', openThePortalBuilder)
        .build();

    actor.view.setParent(firstParent);

    await actor.openThePortal(secondParent);

    expect(actor.view.parent).toBe(secondParent.view);
  });
});
