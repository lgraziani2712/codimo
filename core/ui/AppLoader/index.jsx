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

type Metadata = {|
  difficulty: GameDifficulty,
  engineData: EngineData,
  blocklyData: BlocklyData,
|};
type AppLoader$Props = {|
  backgroundImages: Array<string>,
  engine: Engine,
  metadata: Metadata,
|};

/**
 * The Container is in charge of loading the required apps.
 * Available apps:
 *
 *   - Blockly.
 *   - PixiJS.
 *
 * @todo 1. App async loading.
 * @todo 2. Make it more generic.
 * @todo 3. Add example.
 * @version 1.0.0
 */
export default class AppLoader extends React.Component {
  props: AppLoader$Props;

  image: string;

  constructor(props: AppLoader$Props) {
    super(props);

    this.image = props.backgroundImages[getRandomInt(ZERO, props.backgroundImages.length)];
  }
  /**
   * This callback will be used by the BlocklyApp.
   *
   * @param  {Instructions} instructions Aray of Instructions.
   * @return {Promise<void>}             Animation promise.
   */
  handleSetOfInstructions = (instructions: Instructions): Promise<void> => (
    this.props.engine.excecuteSetOfInstructions(instructions)
        .then(() => (swal(gameTextUI.successMessage).catch(swal.noop)))
        .catch(({ name, ...error }: ClientError) => (swal(error).catch(swal.noop)))
  )
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
