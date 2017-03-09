/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { colors } from 'blockly/constants';

Blockly.Blocks.MoveRight = {
  init: function init() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(Blockly.Msg.MOVE_RIGHT_TITLE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(colors.ACTION);
    this.setTooltip(Blockly.Msg.MOVE_RIGHT_TOOLTIP);
  },
};

function MoveRight() {
  const code = `
    alert('${Blockly.Msg.MOVE_RIGHT_TITLE}');
  `;

  return code;
}

Blockly.JavaScript[MoveRight.name] = MoveRight;
