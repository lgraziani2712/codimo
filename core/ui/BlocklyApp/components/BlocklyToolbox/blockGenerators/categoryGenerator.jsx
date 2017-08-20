/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import blockGenerator, { type BlocklyBlock } from './blockGenerator';
import sepGenerator, { type BlocklySep } from './sepGenerator';

export type BlocklyCategory = {|
  blocks: Array<BlocklyBlock | BlocklySep>,
  define: 'category',
  name: string,
  color?: number | string,
|};
const categoryGenerator = (element: BlocklyCategory, idx: number) => (
  <category key={idx} name={element.name} color={element.color}>
    {element.blocks.map((block, idx) => (
      block.define === 'block'
        ? blockGenerator(block, idx)
        : sepGenerator(block, idx)
    ))}
  </category>
);

export default categoryGenerator;
