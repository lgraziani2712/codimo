/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { type BlocklyBlock } from './blockGenerator';
import { type BlocklySep } from './sepGenerator';

export type BlocklyCategory = {|
  blocks: Array<BlocklyBlock | BlocklySep>,
  define: 'category',
  name: string,
  colour?: number,
  expanded?: boolean,
|};
const categoryGenerator = (element: BlocklyCategory, idx: number) => (
  <category key={idx} name={element.name} colour={element.colour} expanded={element.expanded} />
);

export default categoryGenerator;
