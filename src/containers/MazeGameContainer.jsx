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
import BlocklyApp, { type GameMetadata } from 'components/BlocklyApp';
import mazeEngineGenerator, { type Engine } from 'engine/containers/mazeEngineGenerator';
import { type MazeDataStructure } from 'engine/components/mazeGenerator';

const WIDTH = 300;
const HEIGHT = 420;
const TwoColumns = styled.div`
  display: flex;
`;

type Props = {|
  gameMetadata: {|
    blocksData: GameMetadata,
    mazeData: MazeDataStructure,
  |},
|};
export default class MazeGameContainer extends React.Component {
  props: Props;

  app: Application;
  engine: Engine;
  view: HTMLCanvasElement;

  constructor(props: Props) {
    super(props);

    this.engine = mazeEngineGenerator(props.gameMetadata.mazeData);
  }

  componentDidMount() {
    this.app = new Application(WIDTH, HEIGHT, {
      transparent: true,
      view: this.view,
    });

    this.app.stage.addChild(this.engine.view);
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
          gameMetadata={this.props.gameMetadata.blocksData}
          handleSetOfInstructions={this.handleSetOfInstructions}
        />
      </TwoColumns>
    );
  }
}
