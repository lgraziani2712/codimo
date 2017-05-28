/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { type BlocklyBlockValue } from './valueGenerator';
import { type BlocklyBlockField } from './fieldGenerator';

export type BlocklyBlock = {|
  define: 'block',
  type: string,
  props?: Array<BlocklyBlockValue | BlocklyBlockField>,
|};
const blockGenerator = (element: BlocklyBlock, idx: number) => (
  <block key={idx} type={element.type} />
);

export default blockGenerator;
