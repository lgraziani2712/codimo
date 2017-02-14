/**
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Luciano Graziani @LucianoGraziani
 */
// @flow
import { colors } from 'blockly/constants';

const mainInput = 'program';

Blockly.Blocks.ActionContainer = {
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

function ActionContainer(block) {
	const code = Blockly.JavaScript.statementToCode(block, mainInput);

	return code;
}

Blockly.JavaScript[ActionContainer.name] = ActionContainer;
