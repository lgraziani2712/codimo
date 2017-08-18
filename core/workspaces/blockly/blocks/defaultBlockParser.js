/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { ONE } from 'core/constants/numbers';
import { REPEAT_PARAM } from 'core/constants/instructions';

/**
 * The new function is associated to the `blockName` block.
 * The returning string is an instruction and follow this format:
 *    instruction👋id👋{number}👇
 *
 * @version 1.0.0
 * @param  {Blockly$Block} block The block instance
 * @return {string}              Instruction-as-string.
 */
export default function defaultBlockParser(block: Blockly$Block) {
  const iterations = Blockly.JavaScript.valueToCode(
    block,
    REPEAT_PARAM,
    Blockly.JavaScript.ORDER_ATOMIC,
  );

  return `${block.type}👋${block.id}👋${iterations || ONE}👇`;
}
