/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * This tester must evaluate every component.
 *
 * @flow
 */
import 'test/BlocklyMock';

import { blockNames } from 'blockly/constants';

import executorGenerator from './executorGenerator';

describe('blockly > components', () => {
  it('should generate a new Blockly.Javascript element', () => {
    const blockData = {
      number: 1,
    };
    const helloNumber = (number: number, action: string) => {
      expect(number).toBe(blockData.number);
      expect(action).toBe(blockNames.MOVE_BACKWARD);
    };
    const excecutor = executorGenerator();

    excecutor.addBlockExecutor(blockNames.MOVE_BACKWARD, helloNumber);

    const code = Blockly.JavaScript[blockNames.MOVE_BACKWARD](blockData);

    excecutor.run(code);

    expect(code).toMatchSnapshot();
    expect(Blockly.JavaScript[blockNames.MOVE_BACKWARD]).toBeInstanceOf(Function);
  });
});
