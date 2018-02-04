/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import {
  type ClientError,
} from 'core/engines/pixijs/engineGenerator/processors/checkers/engineErrorBuilder';
import { type Instructions } from 'core/workspaces/blockly/parseInstructions';
import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';
import { type EngineData, type Engine } from 'core/engines/pixijs/engineGenerator';
import { ZERO } from 'core/constants/numbers';
import { getRandomInt } from 'core/helpers/randomizers';

import BlocklyApp, { type BlocklyData } from '../BlocklyApp';
import PixiApp from '../PixiApp';

import BackgroundImage from './components/BackgroundImage';
import TwoColumns from './components/TwoColumns';
import parseExerciseDescription from './helpers/parseExerciseDescription';
import handleNextLevelRedirection from './helpers/handleNextLevelRedirection';

export type SwalObject = {
  html: string,
  imageUrl: string,
  title: string,
};
export type Metadata = {|
  activityName: string,
  difficulty: GameDifficulty,
  engineData: EngineData,
  blocklyData: BlocklyData,
  exerciseDescription?: SwalObject,
|};
type Activity$Props = {|
  backgroundImages: Array<string>,
  engine: Engine,
  metadata: Metadata,
  hasNoEnd?: boolean,
  // react-router props
  history: Object,
  location: Object,
  match: Object,
|};

/**
 * The Container is in charge of loading the required activity.
 *
 * @version 1.1.0
 * @todo 1. Subcomponents async loading.
 * @todo 2. Make it more generic.
 * @todo 3. Add example.
 */
class Activity extends React.Component {
  props: Activity$Props;

  image: string;
  handleNextLevelRedirection: () => Promise<void>;

  constructor(props: Activity$Props) {
    super(props);

    this.image = props.backgroundImages[getRandomInt(ZERO, props.backgroundImages.length)];
    this.handleNextLevelRedirection = handleNextLevelRedirection(
      this.props.metadata.activityName,
      this.props.metadata.difficulty,
      this.props.location,
      this.props.history,
    );

    // If `props.metadata.exerciseDescription` exists, show it
    // with SweetAlert.
    props.metadata.exerciseDescription
      && swal(
        parseExerciseDescription(props.metadata.exerciseDescription),
      ).catch(swal.noop);
  }
  /**
   * This callback will be used by the BlocklyApp.
   *
   * @param {Instructions} instructions Aray of Instructions.
   * @param {Function} handleHighlightBlock Highlight a block through blockly.
   * @return {Promise<void>} Animation promise.
   */
  handleSetOfInstructions = (
    instructions: Instructions,
    handleHighlightBlock: (id: string) => void,
  ): Promise<void> => {
    const executionPromise = this.props.engine.excecuteSetOfInstructions(
      instructions,
      handleHighlightBlock,
    );

    if (this.props.hasNoEnd) {
      return executionPromise;
    }

    return executionPromise
      .then(this.handleNextLevelRedirection)
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
            engineData={metadata.engineData}
            blocklyData={metadata.blocklyData}
            handleResetGame={engine.handleResetGame}
            handleSetOfInstructions={this.handleSetOfInstructions}
          />
        </TwoColumns>
      </BackgroundImage>
    );
  }
}

export default withRouter(Activity);
