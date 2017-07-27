/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

type Props = {|
  children?: React.Element<*>,
  image: string,
|};
const blurImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+' +
                  'AAAAG0lEQVQIW2NkYGD4z8DAwMgABXAGNgGwSgwVAFbmAgXxvZSoAAAAAElFTkSuQmCC';
const CenterGame = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  &::before {
    background: url(${({ image }: Props) => image}) repeat;
    content: '';
    filter: contrast(65%) brightness(110%) saturate(75%) sepia(22%) grayscale(20%);
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
  &::after {
    background: url(${blurImage}) repeat;
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
`;

const BackgroundImage = ({ children, image }: Props) => (
  <CenterGame image={image}>
    {children}
  </CenterGame>
);

export default BackgroundImage;
