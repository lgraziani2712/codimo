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
    const textInput = new Blockly.FieldTextInput('4');

    textInput.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ACTION_CONTAINER_TITLE)
        // FIXME harcoded and explicitly for one specific exercise
        .appendField('para el número:')
        .appendField(textInput, 'FIELDNAME');
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
