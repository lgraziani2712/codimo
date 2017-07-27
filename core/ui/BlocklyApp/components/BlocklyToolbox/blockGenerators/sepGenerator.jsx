/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

const DEFAULT_GAAP = 24;

export type BlocklySep = {|
  define: 'sep',
  /**
   * By default every block is separated from its lower neighbour by 24 pixels.
   * This separation may be changed using the 'gap' attribute,
   * which will replace the default gap.
   *
   * @see https://developers.google.com/blockly/guides/configure/web/toolbox#separators
   */
  gaap?: number,
|};
const sepGenerator = (element: BlocklySep, idx: number) => (
  <sep key={idx} gap={element.gaap === undefined ? DEFAULT_GAAP : element.gaap} />
);

export default sepGenerator;
