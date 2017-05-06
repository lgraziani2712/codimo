/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { colors, blockNames } from 'blockly/constants';

const mainInput = 'program';

Blockly.Blocks[blockNames.ACTION_CONTAINER] = {
  init: function init() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ACTION_CONTAINER_TITLE);
    this.appendStatementInput(mainInput);
    this.setDeletable(false);
    this.setEditable(false);
    this.setMovable(false);
    this.setColour(colors.CONTAINER);
    this.setTooltip(Blockly.Msg.ACTION_CONTAINER_TOOLTIP);
  },
};

Blockly.JavaScript[blockNames.ACTION_CONTAINER] =
  (block: Object) => (Blockly.JavaScript.statementToCode(block, mainInput));
