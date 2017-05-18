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

import { MOVE_BACKWARD } from 'constants/actions';

import executorGenerator from './executorGenerator';

describe('blockly > executorGenerator', () => {
  it('should generate a Map of actions', () => {
    const blockData = {
      number: 0,
    };
    const executor = executorGenerator();

    executor.addBlockExecutor(MOVE_BACKWARD);

    const code = Blockly.JavaScript[MOVE_BACKWARD](blockData);

    expect(code).toMatchSnapshot();
    expect(Blockly.JavaScript[MOVE_BACKWARD]).toBeInstanceOf(Function);

    const instructions = executor.parseInstructions(code + code);
    const actions = instructions.get(blockData.number);

    expect(instructions).toBeInstanceOf(Map);
    expect(instructions.size).toBe(1);
    expect(actions).toBeInstanceOf(Array);
    expect(actions).toHaveLength(2);
    // $FlowDoNotDisturb is NOT undefined
    actions.forEach(action => {
      expect(action).toBe(MOVE_BACKWARD);
    });
  });
});
