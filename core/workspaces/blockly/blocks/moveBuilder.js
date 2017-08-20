/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import * as colors from 'core/constants/colors';
import { IMAGE_SIZE } from 'core/constants/numbers';
import { REPEAT_PARAM } from 'core/constants/instructions';
import {
  type BlockDefinition,
  type GameDifficulty,
} from 'core/workspaces/blockly/instanciateEveryBlock';

/**
 * It builds a move block.
 *
 * @version 1.0.0
 * @param  {string}  title      The block's title.
 * @param  {string}  tooltip    The block's tooltip.
 * @param  {string}  [imageURL] The SVG to show as title.
 * @return {BlockDefinition}    The new block definition.
 */
const moveBuilder = (
  title: string,
  tooltip: string,
  imageURL?: string,
): BlockDefinition => ({
  builder(block: Blockly$Block, difficulty: GameDifficulty) {
    const input =
      difficulty === 'easy'
        ? block.appendDummyInput()
        : block.appendValueInput(REPEAT_PARAM);

    input.setAlign(Blockly.ALIGN_CENTRE)
        .appendField(
          imageURL
            ? new Blockly.FieldImage(imageURL, IMAGE_SIZE, IMAGE_SIZE, title)
            : title,
        );
    block.setColour(colors.ACTION);
    block.setNextStatement(true);
    block.setPreviousStatement(true);
    block.setTooltip(tooltip);
  },
});

export default moveBuilder;
