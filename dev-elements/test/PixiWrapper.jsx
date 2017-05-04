/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Application, type Container } from 'pixi.js';

const HALF = 2;

type Props = {|
  component: Container,
  isContainer: boolean,
  height: number,
  width: number,
|};
export default class PixiWrapper extends React.Component {
  props: Props;
  app: Application;
  view: HTMLCanvasElement;

  componentDidMount() {
    const { component, isContainer, width, height } = this.props;

    this.app = new Application(width, height, {
      backgroundColor: 0x2a2a2a,
      view: this.view,
    });
    this.app.stage.addChild(component);

    if (isContainer) {
      component.pivot.x = component.width / HALF;
      component.pivot.y = component.height / HALF;
      component.x = width / HALF;
      component.y = height / HALF;
    }
  }
  componentWillUnmount() {
    this.app.stop();
    this.app.destroy(true);
  }
  render() {
    return <canvas ref={(view) => this.view = view} />;
  }
}
