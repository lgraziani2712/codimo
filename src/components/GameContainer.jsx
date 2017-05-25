/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import { getRandomInt } from 'helpers/randomizers';

const blurImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+' +
                  'AAAAG0lEQVQIW2NkYGD4z8DAwMgABXAGNgGwSgwVAFbmAgXxvZSoAAAAAElFTkSuQmCC';
const CenterGame = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  &::before {
    background: url(${({ image }) => image}) repeat;
    content: '';
    filter: contrast(65%) brightness(110%) saturate(75%) sepia(22%) grayscale(20%);
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
  &::after {
    background: url(${blurImage}) repeat;
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
`;

type Props = {|
  children?: any,
  images: Array<string>,
|};
const GameContainer = ({ children, images }: Props) => (
  // eslint-disable-next-line no-magic-numbers
  <CenterGame image={images[getRandomInt(0, images.length - 1)]}>
    {children}
  </CenterGame>
);

export default GameContainer;
