/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import parseInstructions from './parseInstructions';

describe('workspaces/core/blockly/parseInstructions', () => {
  it('should parse correctly a set of instructions-as-string', () => {
    const rawInstructions = 'instruction1,param1,param2;instruction2,param1;';
    const instructions = parseInstructions(rawInstructions);

    expect(instructions.length).toBe(2);
    expect(instructions[0].key).toBe('instruction1');
    expect(instructions[0].params.length).toBe(2);
    expect(instructions[0].params[0]).toBe('param1');
    expect(instructions[0].params[1]).toBe('param2');
    expect(instructions[1].key).toBe('instruction2');
    expect(instructions[1].params.length).toBe(1);
    expect(instructions[1].params[0]).toBe('param1');
  });
});
