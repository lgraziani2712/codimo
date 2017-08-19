/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  MOVE_LEFT_TITLE,
  MOVE_LEFT_TOOLTIP,
} from 'core/constants/localize/es/blocklyTextsBlocks';

import leftArrowURL from './images/left_arrow.svg';
import moveBuilder from './moveBuilder';

export default moveBuilder(MOVE_LEFT_TITLE, MOVE_LEFT_TOOLTIP, leftArrowURL);
