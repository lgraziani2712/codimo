/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { END_ACTION } from 'core/constants/colors';
import { IMAGE_SIZE } from 'core/constants/numbers';

import {
  LEAVE_MAZE_TITLE,
  LEAVE_MAZE_TOOLTIP,
} from '../../constants';

import JumpAcrossURL from './jump_across.svg';

export default {
  builder(block: Blockly$Block) {
    block.appendDummyInput()
      .appendField(new Blockly.FieldImage(
        JumpAcrossURL,
        IMAGE_SIZE,
        IMAGE_SIZE,
        LEAVE_MAZE_TITLE,
      ));
    block.setPreviousStatement(true);
    block.setColour(END_ACTION);
    block.setTooltip(LEAVE_MAZE_TOOLTIP);
  },
};
