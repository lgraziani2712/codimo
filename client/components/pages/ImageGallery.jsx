/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { ONE } from 'core/constants/numbers';

import requireScreenshots from './requireScreenshots';

const THREE_SECONDS = 3000;

type State = {|
  imageIdx: number,
|};
export default class ImageGallery extends React.Component {
  state: State;

  randomTextInterval: number;
  imagesURL: Array<string>;

  constructor() {
    super();

    this.state = {
      imageIdx: 0,
    };
    this.randomTextInterval = setInterval(this.timer, THREE_SECONDS);

    this.imagesURL = requireScreenshots();
  }
  componentWillUnmount() {
    clearInterval(this.randomTextInterval);
  }
  timer = () => {
    this.setState(() => ({
      imageIdx: (this.state.imageIdx + ONE) % this.imagesURL.length,
    }));
  }
  render() {
    const imageIdx = this.state.imageIdx;

    return (
      <img src={this.imagesURL[imageIdx]} />
    );
  }
}
