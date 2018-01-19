/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
export type Instruction = {|
  id: string,
  key: string,
  params: Array<string>,
|};
export type Instructions = Array<Instruction>;

/**
 * Parse the instructions-as-string generated by Blockly.
 * Emojis are required because the `blockly id` contains
 * commas and semicolons. Each instruction follows this format:
 *
 *                instruction👋id👋...params👇
 *
 * Parameter divisor: 👋
 * Instruction divisor: 👇
 *
 * @version 1.0.0
 * @param {string} rawInstructions a sequence of raw instructions
 * @return {Instructions} an array of instructions
 */
export default function parseInstructions(rawInstructions: string): Instructions {
  const instructions = rawInstructions.replace(/ /g, '').split('👇');

  // Deletes the last & empty value
  instructions.pop();

  return instructions.map(instruction => {
    const [key, id, ...params] = instruction.split('👋');

    return {
      id,
      key,
      params,
    };
  });
}
