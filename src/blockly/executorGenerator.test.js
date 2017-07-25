/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * This tester must evaluate every component.
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import 'test/BlocklyMock';

import { MOVE_BACKWARD } from 'constants/instructions';

import executorGenerator from './executorGenerator';

describe('blockly > executorGenerator', () => {
  it('should generate a Map of actions', () => {
    const blockData = {
      type: 'block_data',
    };
    const executor = executorGenerator();

    executor.addBlockExecutor(MOVE_BACKWARD);

    // $FlowDoNotDisturb it's a mock
    const code = Blockly.JavaScript[MOVE_BACKWARD](blockData);

    expect(code).toMatchSnapshot();
    expect(Blockly.JavaScript[MOVE_BACKWARD]).toBeInstanceOf(Function);

    const instructions = executor.parseInstructions(code + code);

    expect(instructions).toBeInstanceOf(Array);
    expect(instructions).toHaveLength(2);

    instructions.forEach(instruction => {
      expect(instruction).toBe(MOVE_BACKWARD);
    });
  });
});
