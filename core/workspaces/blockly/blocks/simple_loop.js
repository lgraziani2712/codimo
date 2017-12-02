/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { CONTROL } from 'core/constants/colors';
import { TWO } from 'core/constants/numbers';
import {
  SIMPLE_LOOP_TITLE_1,
  SIMPLE_LOOP_TITLE_2,
  SIMPLE_LOOP_TOOLTIP,
} from 'core/constants/localize/es/blocklyTextsBlocks';

const CANT_VAR = 'CANT';
const LOOP_STATEMENT = 'LOOP';

export default {
  builder(block: Blockly$Block) {
    block.appendDummyInput()
      .appendField(SIMPLE_LOOP_TITLE_1)
      .appendField(new Blockly.FieldNumber(TWO, TWO), CANT_VAR)
      .appendField(SIMPLE_LOOP_TITLE_2);
    block.appendStatementInput(LOOP_STATEMENT);
    block.setPreviousStatement(true);
    block.setNextStatement(true);
    block.setColour(CONTROL);
    block.setTooltip(SIMPLE_LOOP_TOOLTIP);
  },
  parser(block: Blockly$Block) {
    const cant = parseInt(block.getFieldValue(CANT_VAR));
    const statements = Blockly.JavaScript.statementToCode(block, LOOP_STATEMENT);

    return statements.repeat(cant);
  },
};
