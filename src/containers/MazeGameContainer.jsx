/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Application } from 'pixi.js';
import styled from 'styled-components';

import { type Instructions } from 'blockly/executorGenerator';
import BlocklyApp, { type BlocklyData } from 'components/BlocklyApp';
import GameContainer from 'components/GameContainer';
import { HALF, ZERO, ONE } from 'constants/numbers';
import mazeEngineGenerator, {
  type Engine,
  type GameDifficulty,
} from 'engine/containers/mazeEngineGenerator';
import { type MazeData } from 'engine/components/mazeGenerator';
import { type ActivePathBorders } from 'engine/components/blockGeneratorConfig';
import { type NumericLineData } from 'engine/components/numericLineGenerator';
import { getRandomInt } from 'helpers/randomizers';

const TwoColumns = styled.div`
  align-items: flex-end;
  display: flex;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.8));
`;
const images = [
  '/images/numbers-wp1.jpg',
  '/images/numbers-wp2.jpg',
  '/images/numbers-wp3.jpg',
  '/images/numbers-wp4.jpg',
  '/images/numbers-wp5.jpg',
];

type RawMazeData = {|
  ...MazeData,
  path: Array<[string, ActivePathBorders]>,
|};
type Props = {|
  blocklyData: BlocklyData,
  gameMetadata: {|
    difficulty: GameDifficulty,
    mazeData: RawMazeData,
    numericLineData: NumericLineData,
  |},
|};
export default class MazeGameContainer extends React.Component {
  props: Props;

  app: Application;
  engine: Engine;
  image: string;
  view: HTMLCanvasElement;

  constructor(props: Props) {
    super(props);

    // $FlowDoNotDisturb @see https://github.com/facebook/flow/issues/2405
    const mazeData: MazeData = {
      ...props.gameMetadata.mazeData,
      path: new Map(props.gameMetadata.mazeData.path),
    };
    const { numericLineData, difficulty } = props.gameMetadata;

    this.engine = mazeEngineGenerator(mazeData, numericLineData, difficulty);
    this.image = images[getRandomInt(ZERO, images.length)];
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
  handleSetOfInstructions = (instructions: Instructions) => (
    this.engine.excecuteSetOfInstructions(instructions)
  )
  render() {
    return (
      <GameContainer image={this.image}>
        <TwoColumns>
          <canvas ref={(view) => this.view = view} />
          <BlocklyApp
            blocklyData={this.props.blocklyData}
            handleResetGame={this.engine.handleResetGame}
            handleSetOfInstructions={this.handleSetOfInstructions}
          />
        </TwoColumns>
      </GameContainer>
    );
  }
}
