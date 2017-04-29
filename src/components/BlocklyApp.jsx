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

import executorGenerator, { type Executor } from 'blockly/executorGenerator';
import BlocklyToolbox, { type BlocklyToolboxElement } from 'components/BlocklyToolbox';
import ExecuteButton from 'components/ExecuteButton';
import { blockNames } from 'blockly/constants';

const ID = 'blockly-app';

export type GameMetadata = {|
  blockDefinitions: Array<BlockDefinition>,
  defaultElements: string,
  elements: Array<BlocklyToolboxElement>,
|};

type BlockDefinition = {|
  name: string,
  blockExecutor: (...args: Array<*>) => void,
|};
type Props = {|
  gameMetadata: GameMetadata,
|};

export default class BlocklyApp extends React.Component {
  props: Props;

  handleWorkspaceCreation: (toolbox: HTMLElement) => void;
  handleClick: () => void;
  workspace: Object;
  executor: Executor;

  constructor(props: Props) {
    super(props);

    this.executor = executorGenerator();

    props.gameMetadata.blockDefinitions.forEach(({ name, blockExecutor }) => {
      this.executor.addBlockExecutor(name, blockExecutor);
    });
  }

  /**
   * This function is the Blockly workspace constructor. Every Blockly
   * configuration must be placed here.
   *
   * @param {HTMLElement} toolbox   elements to be used on an exercise
   * @returns {void}
   */
  handleWorkspaceCreation = (toolbox: HTMLElement) => {
    this.workspace = Blockly.inject(ID, { toolbox });

    // 1. Will make orphans a little transparent and they won't be
    //    executed even when Blockly ask to parse workspaceToCode
    this.workspace.addChangeListener(Blockly.Events.disableOrphans);

    // 2. Inject the main block into the workspace
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(`
        <xml>
          <block type="${blockNames.ACTION_CONTAINER}">
            <statement name="program">
              ${this.props.gameMetadata.defaultElements}
            </statement>
          </block>
        </xml>
      `),
      this.workspace,
    );
  }

  handleClick = () => {
    const code = Blockly.JavaScript.workspaceToCode(this.workspace);

    this.executor.run(code);
  }
  render() {
    const { gameMetadata } = this.props;

    return (
      <div>
        <div id={ID} style={{ height: '420px', width: '600px' }}>
          <BlocklyToolbox
            elements={gameMetadata.elements}
            handleWorkspaceCreation={this.handleWorkspaceCreation}
          />
        </div>
        <ExecuteButton handleClick={this.handleClick} />
      </div>
    );
  }
}
