/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  MOVE_BACKWARD_TITLE,
  MOVE_BACKWARD_TOOLTIP,
} from 'core/constants/localize/es/blocklyTextsBlocks';

import backwardArrowURL from './images/backward_arrow.svg';
import moveBuilder from './moveBuilder';

export default moveBuilder(MOVE_BACKWARD_TITLE, MOVE_BACKWARD_TOOLTIP, backwardArrowURL);
