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

import { ACTION_CONTAINER } from 'constants/instructions';
import executorGenerator, { type Instructions, type Executor } from 'blockly/executorGenerator';
import { type BlocklyToolboxElement } from 'components/blockly/BlocklyToolbox';
import ActionBar from 'components/blockly/ActionBar';
import BlocklyWorkspace from 'components/blockly/BlocklyWorkspace';

// FIXME MonkeyPatch https://github.com/google/blockly/issues/299
// $FlowDoNotDisturb is a monkeypatch
// eslint-disable-next-line no-underscore-dangle
Blockly.WorkspaceSvg.prototype.preloadAudio_ = () => {};

const ID = 'blockly-app';

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
      trashcan: true,
      zoom: {
        startScale: 1.25,
      },
    });

    const widgetDiv = Blockly.WidgetDiv.DIV;

    // This is in charge of deleting the useless widget!!
    if (widgetDiv.parentNode) {
      widgetDiv.parentNode.removeChild(widgetDiv);
    }

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
      .catch((err: Error) => {
        this.setState(() => ({ isExecuting: false }));
        throw err;
      });
  }
  render() {
    const { blocklyData } = this.props;
    const { isExecuting, isStopped } = this.state;

    return (
      <div>
        <ActionBar
          isExecuting={isExecuting}
          isStopped={isStopped}
          handleResetGame={this.handleResetGame}
          handleStartGame={this.handleStartGame}
        />
        <BlocklyWorkspace
          id={ID}
          elements={blocklyData.elements}
          handleWorkspaceCreation={this.handleWorkspaceCreation}
        />
      </div>
    );
  }
}
