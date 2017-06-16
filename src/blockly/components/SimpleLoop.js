/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { SIMPLE_LOOP } from 'constants/instructions';
import { TWO } from 'constants/numbers';
import { CONTROL } from 'constants/colors';

const CANT_VAR = 'CANT';
const LOOP_STATEMENT = 'LOOP';

Blockly.Blocks[SIMPLE_LOOP] = {
  init() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.SIMPLE_LOOP_TITLE_1)
        .appendField(new Blockly.FieldNumber(TWO, TWO), CANT_VAR)
        .appendField(Blockly.Msg.SIMPLE_LOOP_TITLE_2);
    this.appendStatementInput(LOOP_STATEMENT)
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(CONTROL);
    this.setTooltip(Blockly.Msg.SIMPLE_LOOP_TOOLTIP);
  },
};

Blockly.JavaScript[SIMPLE_LOOP] = (block) => {
  const cant = block.getFieldValue(CANT_VAR);
  const statements = Blockly.JavaScript.statementToCode(block, LOOP_STATEMENT);

  return statements.repeat(cant);
};
