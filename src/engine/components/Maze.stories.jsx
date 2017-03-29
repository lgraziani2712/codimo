/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Application, Container, Sprite } from 'pixi.js';

import blockCreator from './Block';
import MazeData from './MazeData.json';

// The Block component has the main purpose of defining element position for the display.
// What we need is a 32px square.
// First colored.
type Props = {
  component: Sprite,
  height: number,
  width: number,
};
class PixiWrapper extends React.Component {
  props: Props;
  app: Application;
  view: HTMLElement;

  componentDidMount() {
    const { component, width, height } = this.props;

    this.app = new Application(width, height, {
      backgroundColor: 0x2a2a2a,
      view: this.view,
    });

    this.app.stage.addChild(component);
  }
  render() {
    return <canvas ref={(view) => this.view = view} />;
  }
}
const ONE = 1;
const WIDTH = 960;
const HEIGHT = 448;
const BLOCKS_LENGHT = {
  X: 15,
  Y: 7,
};
const BLOCK_SIZE = 64;
const BLOCK_FIRST = 0;
const BLOCKS_LAST = {
  X: BLOCKS_LENGHT.X - ONE,
  Y: BLOCKS_LENGHT.Y - ONE,
};
const BLOCK_BORDER = 0x7d7d7d;
const BLOCK_WALL = 0xda4b4b;
const BLOCK_PATH = 0x2a2a2a;

storiesOf('engine > components > Maze', module)
  .add('basic Block', () => {
    const component = new Container();

    for (let x = 0; x < BLOCKS_LENGHT.X; x++) {
      for (let y = 0; y < BLOCKS_LENGHT.Y; y++) {
        const block = blockCreator();

        block.position.x = x * BLOCK_SIZE;
        block.position.y = y * BLOCK_SIZE;
        block.tint = x === BLOCK_FIRST || x === BLOCKS_LAST.X || y === BLOCK_FIRST || y === BLOCKS_LAST.Y ? BLOCK_BORDER : BLOCK_WALL;
        block.tint = MazeData.includes(`${x},${y}`) ? BLOCK_PATH : block.tint;

        component.addChild(block);
      }
    }

    return (
      <PixiWrapper component={component} height={HEIGHT} width={WIDTH} />
    );
  });
