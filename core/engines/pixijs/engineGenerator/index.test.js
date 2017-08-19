/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-console, no-magic-numbers, */
import { Container } from 'pixi.js';

import engineGenerator from '.';

const wait = (time: number, mock: () => void) => (
  new Promise((resolve) => {
    setTimeout(() => {
      mock();

      resolve();
    }, time);
  })
);
const processorMock = (time) => (mockFunction) => (() => wait(time, mockFunction));

describe('codimo/engines/pixijs/engineGenerator', () => {
  it('should execute all instruction processors', async () => {
    const mockFunction = jest.fn();
    const engineBuilder = engineGenerator(new Container());
    const engine =
      engineBuilder
          .addExecutionProcessor('mock', processorMock(0)(mockFunction))
          .build();

    await engine.excecuteSetOfInstructions([{
      id: '1',
      key: 'instruction1',
      params: [],
    }, {
      id: '2',
      key: 'instruction2',
      params: [],
    }], () => {});

    expect(mockFunction.mock.calls.length).toBe(2);
  });
  it('should execute all reset processors', async () => {
    const mockFunction = jest.fn();
    const engineBuilder = engineGenerator(new Container());
    const engine =
      engineBuilder
          .addResetProcessor('reset', processorMock(0)(mockFunction))
          .build();

    await engine.handleResetGame();

    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
