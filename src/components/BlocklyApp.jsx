/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import 'blockly/blocks_compressed';
import 'blockly/javascript_compressed';

import 'blockly/localize/es';
import 'blockly/components';

import ExecuteButton from 'components/ExecuteButton';
import BlocklyToolbox from 'components/BlocklyToolbox';

const id = 'blockly-app';

export default class BlocklyApp extends React.Component {
  handleWorkspaceCreation: Function;
  handleClick: Function;
  blocklyApp: HTMLElement;
  workspace: Object;

  constructor() {
    super();

    this.handleWorkspaceCreation = this.handleWorkspaceCreation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * This function is the Blockly workspace constructor. Every Blockly
   * configuration must be placed here.
   *
   * @param {HTMLElement} toolbox   elements to be used on an exercise
   * @returns {void}
   */
  handleWorkspaceCreation(toolbox: HTMLElement) {
    this.workspace = Blockly.inject(id, { toolbox });

    // 1. Will make orphans a little transparent and they won't be
    //    executed even when Blockly ask to parse workspaceToCode
    this.workspace.addChangeListener(Blockly.Events.disableOrphans);

    // 2. Inject the main block into the workspace
    Blockly.Xml.domToWorkspace(
      this.workspace,
      Blockly.Xml.textToDom('<xml><block type="ActionContainer" /></xml>'),
    );
  }

  handleClick() {
    const code = Blockly.JavaScript.workspaceToCode(this.workspace);

    eval(code);
  }
  render() {
    return (
      <div>
        <div id={id} style={{ height: '480px', width: '600px' }}>
          <BlocklyToolbox handleWorkspaceCreation={this.handleWorkspaceCreation} />
        </div>
        <ExecuteButton handleClick={this.handleClick} />
      </div>
    );
  }
}
