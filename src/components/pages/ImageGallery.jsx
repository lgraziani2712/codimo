/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { ONE } from 'constants/numbers';

const THREE_SECONDS = 3000;
const IMAGE_LENGTH = 3;

type State = {|
  imageIdx: number,
|};
export default class ImageGallery extends React.Component {
  state: State;

  randomTextInterval: number;

  constructor() {
    super();

    this.state = {
      imageIdx: 0,
    };
    this.randomTextInterval = setInterval(this.timer, THREE_SECONDS);
  }
  componentWillUnmount() {
    clearInterval(this.randomTextInterval);
  }
  timer = () => {
    this.setState(() => ({
      imageIdx: (this.state.imageIdx + ONE) % IMAGE_LENGTH,
    }));
  }
  render() {
    const imageIdx = this.state.imageIdx;

    return (
      <img src={`/images/game-ss${imageIdx}.png`} />
    );
  }
}
