/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import { ZERO } from 'core/constants/numbers';
import { COLOR_PALETTE } from 'core/constants/colors';
import gameTextUI from 'core/constants/localize/es/gameTextUI';
import { getRandomInt } from 'core/helpers/randomizers';

import LoadingAnimalGif from './loading-animal.gif';

const LoadingAnimal = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;
const RandomText = styled.div`
  color: ${COLOR_PALETTE.orange.normal};
  font-size: 2em;
`;
const THREE_SECONDS = 3000;

type State = {|
  loadingText: string,
|};
export default class Loading extends React.Component {
  state: State;

  randomTextInterval: number;

  constructor() {
    super();

    this.state = {
      loadingText:
        gameTextUI.loadingMessages[getRandomInt(ZERO, gameTextUI.loadingMessages.length)],
    };
    this.randomTextInterval = setInterval(this.timer, THREE_SECONDS);
  }
  componentWillUnmount() {
    clearInterval(this.randomTextInterval);
  }
  timer = () => {
    this.setState(() => ({
      loadingText:
        gameTextUI.loadingMessages[getRandomInt(ZERO, gameTextUI.loadingMessages.length)],
    }));
  }
  render() {
    return (
      <LoadingAnimal>
        <img src={LoadingAnimalGif} />
        <RandomText>
          {gameTextUI.loadingMessages[getRandomInt(ZERO, gameTextUI.loadingMessages.length)]}
        </RandomText>
      </LoadingAnimal>
    );
  }
}
