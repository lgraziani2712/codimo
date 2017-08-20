/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import swal from 'sweetalert2';

import {
  type ClientError,
} from 'core/engines/pixijs/engineGenerator/processors/checkers/engineErrorBuilder';
import { type Instructions } from 'core/workspaces/blockly/parseInstructions';
import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';
import { type EngineData, type Engine } from 'core/engines/pixijs/engineGenerator';
import gameTextUI from 'core/constants/localize/es/gameTextUI';
import { ZERO } from 'core/constants/numbers';
import { getRandomInt } from 'core/helpers/randomizers';

import BlocklyApp, { type BlocklyData } from '../BlocklyApp';
import PixiApp from '../PixiApp';

import BackgroundImage from './components/BackgroundImage';
import TwoColumns from './components/TwoColumns';

export type Metadata = {|
  activityName: string,
  difficulty: GameDifficulty,
  engineData: EngineData,
  blocklyData: BlocklyData,
|};
type Activity$Props = {|
  backgroundImages: Array<string>,
  engine: Engine,
  metadata: Metadata,
  hasNotEnd?: boolean,
|};

/**
 * The Container is in charge of loading the required activity.
 *
 * @version 1.0.0
 * @todo 1. Subcomponents async loading.
 * @todo 2. Make it more generic.
 * @todo 3. Add example.
 */
export default class Activity extends React.Component {
  props: Activity$Props;

  image: string;

  constructor(props: Activity$Props) {
    super(props);

    this.image = props.backgroundImages[getRandomInt(ZERO, props.backgroundImages.length)];
  }
  /**
   * This callback will be used by the BlocklyApp.
   *
   * @param  {Instructions} instructions         Aray of Instructions.
   * @param  {Function}     handleHighlightBlock Highlight a block through blockly.
   * @return {Promise<void>}                     Animation promise.
   */
  handleSetOfInstructions = (
    instructions: Instructions,
    handleHighlightBlock: (id: string) => void,
  ): Promise<void> => {
    const executionPromise = this.props.engine.excecuteSetOfInstructions(
      instructions,
      handleHighlightBlock,
    );

    if (this.props.hasNotEnd) {
      return executionPromise;
    }

    return executionPromise
        .then(() => (swal(gameTextUI.successMessage).catch(swal.noop)))
        .catch((error: ClientError) => {
          if (error.title === undefined) {
            throw error;
          }
          delete error.name;

          return swal(error).catch(swal.noop);
        });
  }
  render() {
    const { engine, metadata } = this.props;

    return (
      <BackgroundImage image={this.image}>
        <TwoColumns>
          <PixiApp
            difficulty={metadata.difficulty}
            engine={engine}
            pixiData={metadata.engineData}
          />
          <BlocklyApp
            activityName={metadata.activityName}
            difficulty={metadata.difficulty}
            blocklyData={metadata.blocklyData}
            handleResetGame={engine.handleResetGame}
            handleSetOfInstructions={this.handleSetOfInstructions}
          />
        </TwoColumns>
      </BackgroundImage>
    );
  }
}
