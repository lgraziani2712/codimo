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

import { ACTION_CONTAINER } from 'constants/instructions';
import executorGenerator, { type Instructions, type Executor } from 'blockly/executorGenerator';

import BlocklyToolbox, { type BlocklyToolboxElement } from './BlocklyToolbox';
import Button from './Button';

const ID = 'blockly-app';
const ActionBar = styled.div`
  align-items: center;
  background-color: #e3e3e3;
  border: 1px solid #ddd;
  border-bottom: 0;
  display: flex;
  height: 68px;
  width: 628px;
  & * {
    margin: 0 0 0 10px;
  }
`;
const BlocklyWorkspace = styled.div`
  height: 500px;
  width: 630px;
`;

type BlocklyDataShape = {
  blockDefinitions: Array<BlockDefinition>,
  defaultElements: string,
  elements: Array<BlocklyToolboxElement>,
};
// TODO exact shapes to this workaround
// @see https://github.com/facebook/flow/issues/2405
export type BlocklyData = BlocklyDataShape & $Shape<BlocklyDataShape>;

type BlockDefinition = {|
  name: string,
|};
type Props = {|
  blocklyData: BlocklyData,
  handleSetOfInstructions(instructions: Instructions): Promise<void>;
  handleResetGame(): void;
|};
type State = {|
  isExecuting: boolean,
  isStopped: boolean,
|};
export default class BlocklyApp extends React.Component {
  props: Props;
  state: State;

  handleWorkspaceCreation: (toolbox: HTMLElement) => void;
  handleClick: () => void;
  workspace: Object;
  executor: Executor;

  constructor(props: Props) {
    super(props);

    Blockly.Events.recordUndo = false;

    this.executor = executorGenerator();
    this.state = {
      isExecuting: false,
      isStopped: true,
    };

    props.blocklyData.blockDefinitions.forEach(({ name }) => {
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
    this.workspace = Blockly.inject(ID, {
      scrollbars: true,
      toolbox,
      zoom: {
        startScale: 1.25,
      },
    });

    // 1. Will make orphans a little transparent and they won't be
    //    executed even when Blockly ask to parse workspaceToCode
    this.workspace.addChangeListener(Blockly.Events.disableOrphans);

    // 2. Inject the main block into the workspace
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(`
        <xml>
          <block type="${ACTION_CONTAINER}">
            <statement name="program">
              ${this.props.blocklyData.defaultElements}
            </statement>
          </block>
        </xml>
      `),
      this.workspace,
    );
  }
  handleResetGame = () => {
    this.setState(() => ({ isStopped: true }));

    this.props.handleResetGame();
  }
  handleStartGame = () => {
    const rawInstructions = Blockly.JavaScript.workspaceToCode(this.workspace);

    this.setState(() => ({
      isExecuting: true,
      isStopped: false,
    }));

    this.props.handleSetOfInstructions(this.executor.parseInstructions(rawInstructions))
      .then(() => {
        this.setState(() => ({ isExecuting: false }));
      })
      .catch((err) => {
        this.setState(() => ({ isExecuting: false }));
        throw err;
      });
  }
  render() {
    const { blocklyData } = this.props;
    const { isExecuting, isStopped } = this.state;

    return (
      <div>
        <ActionBar>
          {/* FIXME hardcoded title */}
          {isStopped ?
            <Button
              title="▶ Dale play!"
              type="green"
              handleClick={this.handleStartGame}
            /> :
            <Button
              disabled={isExecuting}
              title="⏹ Reseteá!"
              type="orange"
              handleClick={this.handleResetGame}
            />
          }
        </ActionBar>
        <BlocklyWorkspace id={ID}>
          <BlocklyToolbox
            elements={blocklyData.elements}
            handleWorkspaceCreation={this.handleWorkspaceCreation}
          />
        </BlocklyWorkspace>
      </div>
    );
  }
}
