/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, object-property-newline */
import { Container } from 'pixi.js';

import {
  MOVE_FORWARD,
  MOVE_LEFT,
} from 'core/constants/instructions';
import componentGenerator from 'core/engines/pixijs/components/componentGenerator';
import positioningFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/positioningFunctionalityBuilder';
import hitTheWallFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/hitTheWallFunctionalityBuilder';

import { positioningProcessorBuilder } from './positioningProcessorBuilder';
import hasHitAWallBuilder from './checkers/hasHitAWallBuilder';

const size = 64;
const margin = 10;
const initialPosition = '1,4';
const positioningMetadata = {
  canvas: {
    height: 569,
    width: 450,
  },
  width: 3,
  height: 5,
  margin: 10,
  size: 64,
  path: [
    ['1,4', { top: true }],
    ['1,3', { top: true, bottom: true }],
    ['1,2', { top: true, bottom: true }],
    ['1,1', { top: true, bottom: true }],
    ['1,0', { top: true, bottom: true }],
  ],
};

describe('engines/pixijs/engineGenerator/processors/positioningProcessorBuilder', () => {
  it('should do nothing if the instruction is unknown', async () => {
    const actorView = new Container();

    actorView.setParent(new Container());

    const actor =
      componentGenerator(actorView, size, margin)
        .addFunctionality(
          'positioning',
          positioningFunctionalityBuilder(initialPosition),
        )
        .build();
    const beforeUpdateStateCheckers = new Map();
    const positioningProcessor = positioningProcessorBuilder(
      actor,
      beforeUpdateStateCheckers,
    );

    await positioningProcessor({
      id: '1',
      key: 'doNothing',
      params: [],
    });

    expect(actor.position).toBe(initialPosition);
  });
  it('should update the position if is a known instruction', async () => {
    const actorView = new Container();

    actorView.setParent(new Container());

    const actor =
      componentGenerator(actorView, size, margin)
        .addFunctionality(
          'positioning',
          positioningFunctionalityBuilder(initialPosition),
        )
        .build();
    const beforeUpdateStateCheckers = new Map();
    const positioningProcessor = positioningProcessorBuilder(
      actor,
      beforeUpdateStateCheckers,
    );

    await positioningProcessor({
      id: '1',
      key: MOVE_FORWARD,
      params: ['1'],
    });

    expect(actor.position).toBe('1,3');
  });
  it('should throw a HasHitAWallError if has hit a wall', async () => {
    const actorView = new Container();

    actorView.setParent(new Container());

    const actor =
      componentGenerator(actorView, size, margin)
        .addFunctionality(
          'positioning',
          positioningFunctionalityBuilder(initialPosition),
        )
        .addFunctionality('hitthewall', hitTheWallFunctionalityBuilder())
        .build();
    const beforeUpdateStateCheckers = new Map([
      ['hashitwall', hasHitAWallBuilder(actor, positioningMetadata)],
    ]);
    const positioningProcessor = positioningProcessorBuilder(
      actor,
      beforeUpdateStateCheckers,
    );

    try {
      await positioningProcessor({
        id: '1',
        key: MOVE_LEFT,
        params: ['1'],
      });
    } catch (error) {
      expect(error.name).toBe('HasHitAWallError');
      expect(error.html).toMatchSnapshot();

      return;
    }

    expect('true').toBe('not evaluated');
  });
});
