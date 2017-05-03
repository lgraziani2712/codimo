/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import 'blockly/blocks_compressed';
import 'blockly/javascript_compressed';

import 'blockly/localize/es';
import 'blockly/components';

import executorGenerator, { type ActorsToActions, type Executor } from 'blockly/executorGenerator';
import BlocklyToolbox, { type BlocklyToolboxElement } from 'components/BlocklyToolbox';
import ExecuteButton from 'components/ExecuteButton';
import { blockNames } from 'blockly/constants';

const ID = 'blockly-app';
const BlocklyWorkspace = styled.div`
  height: 420px;
  width: 600px;
`;

type GameMetadataShape = {|
  blockDefinitions: Array<BlockDefinition>,
  defaultElements: string,
  elements: Array<BlocklyToolboxElement>,
|};
// TODO exact shapes to this workaround
// @see https://github.com/facebook/flow/issues/2405
export type GameMetadata = GameMetadataShape & $Shape<GameMetadataShape>;

type BlockDefinition = {|
  name: string,
|};
type Props = {|
  gameMetadata: GameMetadata,
  handleSetOfInstructions(instructions: ActorsToActions): void;
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

    props.gameMetadata.blockDefinitions.forEach(({ name }) => {
      this.executor.addBlockExecutor(name);
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
    const rawInstructions = Blockly.JavaScript.workspaceToCode(this.workspace);

    this.props.handleSetOfInstructions(this.executor.parseInstructions(rawInstructions));
  }
  render() {
    const { gameMetadata } = this.props;

    return (
      <div>
        <BlocklyWorkspace id={ID}>
          <BlocklyToolbox
            elements={gameMetadata.elements}
            handleWorkspaceCreation={this.handleWorkspaceCreation}
          />
        </BlocklyWorkspace>
        <ExecuteButton handleClick={this.handleClick} />
      </div>
    );
  }
}
