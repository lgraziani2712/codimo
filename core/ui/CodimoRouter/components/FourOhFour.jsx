/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import gameTextUI from 'core/constants/localize/es/gameTextUI';

import EndGameDifficultyURL from '../images/endGameDifficulty.gif';
import EndGameBackgroundURL from '../images/endGameBackground.jpg';

const blurImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+' +
                  'AAAAG0lEQVQIW2NkYGD4z8DAwMgABXAGNgGwSgwVAFbmAgXxvZSoAAAAAElFTkSuQmCC';
const Modal = styled.div`
  background: rgb(255, 255, 255);
  display: block;
  min-height: 316px;
  padding: 0 20px 20px;
  width: 630px;
`;
const ModalContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;

  &::before {
    background: url(${EndGameBackgroundURL});
    background-size: cover;
    content: '';
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
const ModalImage = styled.img`
  display: block;
`;

type FourOhFour$Props = {|
  location: Object,
|};
/**
 * The temporal End Game announcer.
 *
 * @version 1.0.0
 * @param {Object} location React-router location object.
 * @class
 */
export default function FourOhFour({ location }: FourOhFour$Props) {
  const actualDifficulty = location.pathname.split('/')[2];

  return (
    <ModalContainer className="swal2-fade swal2-shown">
      <Modal role="dialog" className="swal2-modal swal2-show">
        <ModalImage className="swal2-image" src={EndGameDifficultyURL} />
        <h2 className="swal2-title">{gameTextUI.endGameMessage.title}</h2>
        <div className="swal2-content">
          {gameTextUI.endGameMessage.text(actualDifficulty)}
        </div>
      </Modal>
    </ModalContainer>
  );
}
