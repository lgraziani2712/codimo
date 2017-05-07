/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Application } from 'pixi.js';
import styled from 'styled-components';

import { type ActorsToActions } from 'blockly/executorGenerator';
import BlocklyApp, { type BlocklyData } from 'components/BlocklyApp';
import { HALF } from 'constants/numbers';
import mazeEngineGenerator, { type Engine } from 'engine/containers/mazeEngineGenerator';
import { type MazeData } from 'engine/components/mazeGenerator';
import { type ActivePathBorders } from 'engine/components/blockGeneratorConfig';
import { type NumericLineData } from 'engine/components/numericLineGenerator';

const TwoColumns = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  & * {
    margin-left: 3px;
  }
`;

type RawMazeData = {|
  ...MazeData,
  path: Array<[string, ActivePathBorders]>,
|};
type Props = {|
  blocklyData: BlocklyData,
  gameMetadata: {|
    mazeData: RawMazeData,
    numericLineData: NumericLineData,
  |},
|};
export default class MazeGameContainer extends React.Component {
  props: Props;

  app: Application;
  engine: Engine;
  view: HTMLCanvasElement;

  constructor(props: Props) {
    super(props);

    // $FlowDoNotDisturb @see https://github.com/facebook/flow/issues/2405
    const mazeData: MazeData = {
      ...props.gameMetadata.mazeData,
      path: new Map(props.gameMetadata.mazeData.path),
    };

    this.engine = mazeEngineGenerator(mazeData, props.gameMetadata.numericLineData);
  }

  componentDidMount() {
    const { canvas } = this.props.gameMetadata.mazeData;

    this.app = new Application(canvas.width, canvas.height, {
      backgroundColor: 0x2a2a2a,
      view: this.view,
    });
    this.app.stage.addChild(this.engine.view);

    this.engine.view.pivot.x = this.engine.view.width / HALF;
    this.engine.view.pivot.y = this.engine.view.height / HALF;
    this.engine.view.x = canvas.width / HALF;
    this.engine.view.y = canvas.height / HALF;
  }
  // TODO destroy app? reset on new props
  componentWillUnmount() {
    this.app.stop();
    this.app.destroy(true);
  }
  handleSetOfInstructions = (instructions: ActorsToActions) => {
    this.engine.excecuteSetOfInstructions(instructions);
  }
  render() {
    return (
      <TwoColumns>
        <canvas ref={(view) => this.view = view} />
        <BlocklyApp
          blocklyData={this.props.blocklyData}
          handleSetOfInstructions={this.handleSetOfInstructions}
          handleResetGame={this.engine.handleResetGame}
        />
      </TwoColumns>
    );
  }
}
