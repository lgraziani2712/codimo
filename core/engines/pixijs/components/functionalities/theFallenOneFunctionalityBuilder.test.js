/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import { Container } from 'pixi.js';

import componentGenerator from '../componentGenerator';

import positioningFunctionalityBuilder from './positioningFunctionalityBuilder';
import theFallenOneFunctionalityBuilder from './theFallenOneFunctionalityBuilder';

describe('engines/pixijs/components/functionalities/theFallenOneFunctionalityBuilder', async () => {
  it('should disappear on `beTheFallenOne`', async () => {
    const initPosition = '1,1';
    const size = 64;
    const margin = 10;
    const actor =
      componentGenerator(new Container(), size, margin)
          .addFunctionality('positioning', positioningFunctionalityBuilder(initPosition))
          .addFunctionality('beTheFallenOne', theFallenOneFunctionalityBuilder)
          .build();

    await actor.beTheFallenOne();

    expect(actor.position).toBe('');
    expect(actor.view.scale.x).toBe(0);
    expect(actor.view.scale.y).toBe(0);
  });
});
