/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import { Container } from 'pixi.js';

import componentGenerator from '../componentGenerator';

import hitTheWallFunctionalityBuilder from './hitTheWallFunctionalityBuilder';

describe('engines/pixijs/components/functionalities/hitTheWallFunctionalityBuilder', () => {
  it('should animate the hitting without altering the position', async () => {
    const size = 64;
    const margin = 10;
    const actor =
      componentGenerator(new Container(), size, margin)
        .addFunctionality('hitTheWall', hitTheWallFunctionalityBuilder())
        .build();
    const initX = 1;
    const initY = 1;

    actor.view.x = actor.view.y = 1;

    await actor.hitTheWall('top');

    expect(actor.view.x).toBe(initX);
    expect(actor.view.y).toBe(initY);
  });
});
