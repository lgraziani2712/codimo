/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Application } from 'pixi.js';
import swal from 'sweetalert2';

import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';
import { type EngineData, type Engine } from 'core/engines/pixijs/engineGenerator';
import {
  type ClientError,
} from 'core/engines/pixijs/engineGenerator/processors/checkers/engineErrorBuilder';
import { type Instructions } from 'core/workspaces/blockly/parseInstructions';
import { HALF } from 'core/constants/numbers';
import gameTextUI from 'core/constants/localize/es/gameTextUI';

type PixiApp$Props = {|
  difficulty: GameDifficulty,
  pixiData: EngineData,
  engine: Engine,
|};
export default class PixiApp extends React.Component {
  props: PixiApp$Props;
  view: HTMLCanvasElement;

  app: Application;

  componentDidMount() {
    const { pixiData, engine } = this.props;

    this.app = new Application(pixiData.canvas.width, pixiData.canvas.height, {
      backgroundColor: 0x2a2a2a,
      view: this.view,
    });
    this.app.stage.addChild(engine.view);

    engine.view.pivot.x = engine.view.width / HALF;
    engine.view.pivot.y = engine.view.height / HALF;
    engine.view.x = pixiData.canvas.width / HALF;
    engine.view.y = pixiData.canvas.height / HALF;
  }
  // TODO destroy app? reset on new props
  componentWillUnmount() {
    this.app.stop();
    this.app.destroy(true);
  }
  handleSetOfInstructions = (instructions: Instructions): Promise<void> => (
    this.props.engine.excecuteSetOfInstructions(instructions)
        .then(() => (swal(gameTextUI.successMessage).catch(swal.noop)))
        .catch(({ name, ...error }: ClientError) => (swal(error).catch(swal.noop)))
  )
  render() {
    return <canvas ref={(view: HTMLCanvasElement) => this.view = view} />;
  }
}
