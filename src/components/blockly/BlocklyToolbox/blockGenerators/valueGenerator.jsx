/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type BlocklyBlock } from './blockGenerator';

export type BlocklyBlockValue = {|
  block: BlocklyBlock,
  define: 'value',
  name: string,
  /**
   * Shadow blocks are placeholder blocks that perform several functions:
   *  - They indicate the default values for their parent block.
   *  - They allow users to type values directly without needing to fetch a number or string block.
   *  - Unlike a regular block, they get replaced if the user drops a block on top of them.
   *  - They inform the user of the type of value expected.
   *
   * @see https://developers.google.com/blockly/guides/configure/web/toolbox#block_groups
   */
  type: 'normal' | 'shadow',
|};
