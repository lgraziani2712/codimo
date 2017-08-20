/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  MOVE_RIGHT_TITLE,
  MOVE_RIGHT_TOOLTIP,
} from 'core/constants/localize/es/blocklyTextsBlocks';

import rightArrowURL from './images/right_arrow.svg';
import moveBuilder from './moveBuilder';

export default moveBuilder(MOVE_RIGHT_TITLE, MOVE_RIGHT_TOOLTIP, rightArrowURL);
