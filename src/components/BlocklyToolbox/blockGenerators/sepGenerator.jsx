/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

export type BlocklySep = {|
  define: 'sep',
  /**
   * By default every block is separated from its lower neighbour by 24 pixels.
   * This separation may be changed using the 'gap' attribute,
   * which will replace the default gap.
   *
   * @see https://developers.google.com/blockly/guides/configure/web/toolbox#separators
   */
  gap?: number,
|};
const sepGenerator = (element: BlocklySep, idx: number) => (
  <sep key={idx} gap={element.gap} />
);

export default sepGenerator;
