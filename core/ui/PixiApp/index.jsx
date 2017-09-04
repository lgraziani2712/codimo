/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Application } from 'pixi.js';

import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';
import { type EngineData, type Engine } from 'core/engines/pixijs/engineGenerator';
import { HALF } from 'core/constants/numbers';

type PixiApp$Props = {|
  difficulty: GameDifficulty,
  pixiData: EngineData,
  engine: Engine,
|};
/**
 * This container is responsible for rendering an
 * engine into a canvas element. Is also responsible
 * for passing the parsed instructions to the engine.
 *
 * @version 1.0.0
 */
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
    this.app.destroy();
  }
  render() {
    return <canvas ref={(view: HTMLCanvasElement) => this.view = view} />;
  }
}
