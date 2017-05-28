/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import blockGenerator, { type BlocklyBlock } from './blockGenerators/blockGenerator';
import sepGenerator, { type BlocklySep } from './blockGenerators/sepGenerator';
import categoryGenerator, { type BlocklyCategory } from './blockGenerators/categoryGenerator';

type BlocklyBaseElement = BlocklyBlock | BlocklySep;
export type BlocklyToolboxElement = BlocklyCategory | BlocklyBaseElement;

type Props = {|
  elements: Array<BlocklyToolboxElement>,
  handleWorkspaceCreation: (toolbox: HTMLElement) => void,
|};
export default class BlocklyToolbox extends React.Component {
  props: Props;
  toolbox: HTMLElement;

  componentDidMount() {
    // https://developers.google.com/blockly/guides/configure/web/toolbox
    this.props.handleWorkspaceCreation(this.toolbox);
  }
  render() {
    const { elements } = this.props;

    return (
      <xml ref={toolbox => this.toolbox = toolbox} style={{ display: 'none' }}>
        {elements.map((element, idx) => {
          if (element.define === 'block') {
            return blockGenerator(element, idx);
          }
          if (element.define === 'sep') {
            return sepGenerator(element, idx);
          }
          if (element.define === 'category') {
            return categoryGenerator(element, idx);
          }
          throw new Error(`The element definition '${element.define}' does not exist`);
        })}
      </xml>
    );
  }
}

// const blocklyGenerators = {
//   block: blockGenerator,
//   category: categoryGenerator,
//   sep: sepGenerator,
// };
//
//
// const generator = blocklyGenerators[element.define];
//
// if (typeof generator !== 'function') {
//   throw new Error(`The element definition '${element.define}' does not exist`);
// }
//
// return generator(element, idx);
