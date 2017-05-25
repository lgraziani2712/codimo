/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import * as colors from 'constants/colors';
import { MOVE_FORWARD } from 'constants/instructions';

Blockly.Blocks[MOVE_FORWARD] = {
  init: function init() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(Blockly.Msg.MOVE_FORWARD_TITLE);
    this.contextMenu = false;
    this.setColour(colors.ACTION);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setTooltip(Blockly.Msg.MOVE_FORWARD_TOOLTIP);
  },
};
