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
const resetProcessorMock = (time) => (resetMock) => (() => wait(time, resetMock));
const executionProcessorMock = (time) => (willStartMock, instructionMock, willStopMock) => ({
  willStartExecutingProcessor() {
    return wait(time, willStartMock);
  },
  instructionProcessor() {
    return wait(time, instructionMock);
  },
  willStopExecutingProcessor() {
    return wait(time, willStopMock);
  },
});

describe('codimo/engines/pixijs/engineGenerator', () => {
  it('should execute all instruction processors', async () => {
    const mockFunction = jest.fn();
    const engineBuilder = engineGenerator(() => (new Container()));
    const engine =
      engineBuilder
          .addExecutionProcessor('mock', executionProcessorMock(0)(
            mockFunction,
            mockFunction,
            mockFunction,
          ))
          .build();

    await engine.excecuteSetOfInstructions(['instruction1', 'instruction2']);

    expect(mockFunction.mock.calls.length).toBe(4);
  });
  it('should execute all reset processors', async () => {
    const mockFunction = jest.fn();
    const engineBuilder = engineGenerator(() => (new Container()));
    const engine =
      engineBuilder
          .addResetProcessor('reset', resetProcessorMock(0)(mockFunction))
          .build();

    await engine.handleResetGame();

    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
