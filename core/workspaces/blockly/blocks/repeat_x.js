/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { ZERO, TWO } from 'core/constants/numbers';
import {
  REPEAT_X_TITLE,
  REPEAT_X_TOOLTIP,
} from 'core/constants/localize/es/blocklyTextsBlocks';

const PURPLE = 230;
const CANT_VAR = 'CANT';

export default {
  builder(block: Blockly$Block) {
    block.appendDummyInput()
      .appendField(new Blockly.FieldNumber(ZERO, TWO), CANT_VAR)
      .appendField(REPEAT_X_TITLE);
    block.setOutput(true, 'repeat');
    block.setColour(PURPLE);
    block.setTooltip(REPEAT_X_TOOLTIP);
  },
  /**
   * This parser returns just a number because it's a param block.
   * Not an instruction block but a param block. This means it fits
   * into the instruction block's socket.
   *
   * @param {Blockly$Block} block The block instance
   * @return {string} cant
   */
  parser(block: Blockly$Block) {
    return block.getFieldValue(CANT_VAR);
  },
};
