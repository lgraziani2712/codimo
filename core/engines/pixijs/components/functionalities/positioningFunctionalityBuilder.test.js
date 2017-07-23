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

describe('engines/pixijs/components/functionalities/positioningFunctionalityBuilder', () => {
  it('should update its position acording to the new position', async () => {
    const initPosition = '1,1';
    const newPosition = '2,2';
    const size = 64;
    const margin = 10;
    const actor =
      componentGenerator(new Container(), size, margin)
          .addFunctionality('positioning', positioningFunctionalityBuilder(initPosition))
          .build();
    const initX = actor.view.x;
    const initY = actor.view.y;

    await actor.updatePosition(newPosition);

    expect(actor.position).toBe(newPosition);
    expect(actor.view.x).not.toBe(initX);
    expect(actor.view.y).not.toBe(initY);

    await actor.resetPosition();

    expect(actor.position).toBe(initPosition);
    expect(actor.view.x).toBe(initX);
    expect(actor.view.y).toBe(initY);
  });
});
