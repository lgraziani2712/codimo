/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { colors } from 'blockly/constants';

Blockly.Blocks.MoveLeft = {
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

function MoveLeft() {
  const code = `
    alert('${Blockly.Msg.MOVE_LEFT_TITLE}');
  `;

  return code;
}

Blockly.JavaScript[MoveLeft.name] = MoveLeft;
