/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

type Props = {
  handleWorkspaceCreation: (toolbox: HTMLElement) => void,
};
export default class BlocklyToolbox extends React.Component {
  props: Props;
  toolbox: HTMLElement;

  componentDidMount() {
    // https://developers.google.com/blockly/guides/configure/web/toolbox
    this.props.handleWorkspaceCreation(this.toolbox);
  }
  render() {
    return (
      <xml ref={toolbox => this.toolbox = toolbox} style={{ display: 'none' }}>
        <category name="Control">
          <block type="controls_if" />
          <block type="controls_repeat_ext" />
        </category>
        <category name="Logic">
          <block type="logic_compare" />
          <block type="math_number" />
          <block type="math_arithmetic" />
        </category>
        <category name="Acciones">
          <block type="MoveForward" />
          <block type="MoveBackward" />
          <block type="MoveRight" />
          <block type="MoveLeft" />
        </category>
      </xml>
    );
  }
}
