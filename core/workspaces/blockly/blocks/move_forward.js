/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import {
  MOVE_FORWARD_TITLE,
  MOVE_FORWARD_TOOLTIP,
} from 'core/constants/localize/es/blocklyTextsBlocks';

import moveBuilder from './moveBuilder';

export default moveBuilder(MOVE_FORWARD_TITLE, MOVE_FORWARD_TOOLTIP);
