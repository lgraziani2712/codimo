/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import * as colors from 'constants/colors';
import { MOVE_RIGHT } from 'constants/instructions';

Blockly.Blocks[MOVE_RIGHT] = {
  init: function init() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(Blockly.Msg.MOVE_RIGHT_TITLE);
    this.contextMenu = false;
    this.setColour(colors.ACTION);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setTooltip(Blockly.Msg.MOVE_RIGHT_TOOLTIP);
  },
};
