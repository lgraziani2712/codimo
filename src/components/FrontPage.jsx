/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import { COLOR_PALETTE } from 'constants/colors';

import PageContainer from './pages/PageContainer';
import RawContentContainer from './pages/RawContentContainer';
import ImageGallery from './pages/ImageGallery';

const Row = styled.div`
  align-items: center;
  display: flex;
  min-height: 300px;
  padding: 5rem;
`;
const ColoredRow = styled(Row)`
  color: white;
  justify-content: flex-end;
  margin: 0;
  & > img {
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
  }
`;
const RedRow = styled(ColoredRow)`
  background: ${COLOR_PALETTE.red.normal};
`;
const GreenRow = styled(ColoredRow)`
  background: ${COLOR_PALETTE.green.normal};
`;
const WhiteRow = styled(Row)`
  background: white;
  box-shadow: 0 0 4px 4px rgba(85, 95, 110, 0.4);
  justify-content: flex-start;
  position: relative;
  z-index: 1;
  & > img {
    filter: drop-shadow(-2px 2px 2px rgba(0, 0, 0, 0.5));
  }
`;
const Container = styled(RawContentContainer)`

`;
const Title = styled.h1`
  font-size: 4.5em;
  font-weight: 200;
  margin: 0;
  text-shadow: 5px 5px ${COLOR_PALETTE.red.dark};
`;
const Text = styled.div`
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 2em;
  font-weight: lighter;
  padding: 0 0.5em;
  width: 42%;
`;

const FrontPage = () => (
  <PageContainer>
    <RedRow>
      <Container>
        <Title>{'¡Donde el código, la imaginación y la motivación se encuentran!'}</Title>
      </Container>
    </RedRow>
    <WhiteRow>
      <img src="/images/logo.png" />
      <Text>
        {
          // eslint-disable-next-line max-len
          'Es una plataforma que presenta actividades escolares diseñadas para que sean divertidas y ayuden a afianzar los conocimientos de las distintas asignaturas a través de resolverlas de una manera diferente a como se aprenden en clase.'
        }
      </Text>
    </WhiteRow>
    <GreenRow>
      <Text>
        {
          // eslint-disable-next-line max-len
          'Cada actividad está estructurada en niveles. Cada nivel representa un desafío y a medida que se avanza de nivel, más aumenta la dificultad.'
        }
      </Text>
      <ImageGallery />
    </GreenRow>
    <WhiteRow>
      <img src="/images/computer-thinking.png" />
      <Text>
        {'¿Qué es el '}
        <b>{'Pensamiento Computacional'}</b>
        {
          // eslint-disable-next-line max-len
          '? Es un conjunto de habilidades que le permite a una persona poder resolver problemas aplicando los conceptos fundamentales de la ciencia de la computación.'
        }
      </Text>
    </WhiteRow>
  </PageContainer>
);

export default FrontPage;
