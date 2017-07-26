/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import * as colors from 'core/constants/colors';
import {
  ACTION_CONTAINER_TITLE,
  ACTION_CONTAINER_TOOLTIP,
} from 'core/constants/localize/es';

const mainInput = 'program';
const ACTION_CONTAINER = 'action_container';

/**
 * This special block is eagerly imported.
 * Everything is defined here.
 *
 * @version 1.0.0
 */
Blockly.Blocks[ACTION_CONTAINER] = {
  init: function init() {
    this.appendDummyInput()
        .appendField(ACTION_CONTAINER_TITLE);
    this.appendStatementInput(mainInput);
    this.setDeletable(false);
    this.setEditable(false);
    this.setMovable(false);
    this.setColour(colors.CONTAINER);
    this.setTooltip(ACTION_CONTAINER_TOOLTIP);
  },
};

Blockly.JavaScript[ACTION_CONTAINER] =
  (block: Blockly$Block) => (Blockly.JavaScript.statementToCode(block, mainInput));
