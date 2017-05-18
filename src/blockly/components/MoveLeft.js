/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import * as colors from 'constants/colors';
import { MOVE_LEFT } from 'constants/actions';

Blockly.Blocks[MOVE_LEFT] = {
  init: function init() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(Blockly.Msg.MOVE_LEFT_TITLE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colors.ACTION);
    this.setTooltip(Blockly.Msg.MOVE_LEFT_TOOLTIP);
  },
};
