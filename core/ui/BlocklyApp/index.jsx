/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import 'vendors/blockly/blocks_compressed';
import 'vendors/blockly/javascript_compressed';
import 'vendors/blockly/msg/js/es';

import 'core/workspaces/blockly/blocks/action_container';

import { ACTION_CONTAINER } from 'core/constants/instructions';
import parseInstructions, {
  type Instructions,
} from 'core/workspaces/blockly/parseInstructions';
import instanciateEveryBlock, {
  type GameDifficulty,
} from 'core/workspaces/blockly/instanciateEveryBlock';
import { type BlocklyToolboxElement } from 'core/ui/BlocklyApp/components/BlocklyToolbox';
import ActionBar from 'core/ui/BlocklyApp/components/ActionBar';
import BlocklyWorkspace from 'core/ui/BlocklyApp/components/BlocklyWorkspace';

const ID = 'blockly-app';

type BlockDefinition = string;
export type BlocklyData = {|
  blockDefinitions: Array<BlockDefinition>,
  defaultElements: string,
  elements: Array<BlocklyToolboxElement>,
|};

type BlocklyApp$Props = {|
  activityName: string,
  difficulty: GameDifficulty,
  blocklyData: BlocklyData,
  handleSetOfInstructions(
    instructions: Instructions,
    handleHighlightBlock: (id: string) => void,
  ): Promise<void>,
  handleResetGame(): Promise<void>,
|};
type BlocklyApp$State = {|
  isExecuting: boolean,
  isStopped: boolean,
  blocksAreLoaded: boolean,
|};
/**
 * This container is responsible for instanciating
 * everything related to Blockly. This means:
 *
 * 1. Require the blockly JS deps.
 * 2. Require all the needed blocks for the activity.
 * 3. Instanciate the Blockly workspace.
 *
 * It also requires two callbacks from the engine, one
 * for passing the array of Instructions and one for
 * resetting the game.
 *
 * @version 1.0.1
 */
export default class BlocklyApp extends React.Component {
  props: BlocklyApp$Props;
  state: BlocklyApp$State;

  handleWorkspaceCreation: (toolbox: HTMLElement) => void;
  handleClick: () => void;
  highlightBlock: (id: string) => void;
  workspace: Object;

  constructor(props: BlocklyApp$Props) {
    super(props);

    // Blockly configuration
    Blockly.Events.recordUndo = false;

    this.state = {
      isExecuting: false,
      isStopped: true,
      blocksAreLoaded: false,
    };

    instanciateEveryBlock(
      props.activityName,
      props.difficulty,
      props.blocklyData.blockDefinitions,
    )
        .then(() => {
          this.setState(() => ({ blocksAreLoaded: true }));
        });
  }
  /**
   * This function is the Blockly workspace constructor.
   * Every Blockly configuration must be placed here.
   *
   * @param {HTMLElement} toolbox   Elements to be used on an exercise.
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
    this.highlightBlock = (id: string) => {
      this.workspace.highlightBlock(id);
    };

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
  /**
   * This callback will be sent to the reset button.
   * On click will reset the engine state.
   *
   * @return {void}
   */
  handleResetGame = () => {
    this.props.handleResetGame().then(() => {
      this.setState(() => ({ isStopped: true }));
    });
  }
  /**
   * This callback will be sent to the play button.
   * When clicked it'll do the following:
   *
   * 1. Request the raw instructions to Blockly.
   * 2. Pass the raw instructions to the
   *    parseInstructions function.
   * 3. Pass the Array<Instructions> to the
   *    `handleSetOfInstructions` callback.
   *
   * @return {void}
   */
  handleStartGame = () => {
    const rawInstructions = Blockly.JavaScript.workspaceToCode(this.workspace);

    this.setState(() => ({
      isExecuting: true,
      isStopped: false,
    }));

    this.props
        .handleSetOfInstructions(
          parseInstructions(rawInstructions),
          this.highlightBlock,
        )
        .then(() => {
          this.setState(() => ({ isExecuting: false }));
        });
  }
  render() {
    if (!this.state.blocksAreLoaded) {
      return null;
    }
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
