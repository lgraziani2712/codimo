/**
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Luciano Graziani @LucianoGraziani
 */
// @flow
import { colors } from 'blockly/constants';

Blockly.Blocks.MoveBackward = {
	init: function init() {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField(Blockly.Msg.MOVE_BACKWARD_TITLE);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(colors.ACTION);
		this.setTooltip(Blockly.Msg.MOVE_BACKWARD_TOOLTIP);
	},
};

function MoveBackward() {
	const code = `
		alert('${Blockly.Msg.MOVE_BACKWARD_TITLE}');
	`;

	return code;
}

Blockly.JavaScript[MoveBackward.name] = MoveBackward;
