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

const Row = styled.div`
  min-height: 300px;
`;
const ColoredRow = styled(Row)`
  color: white;
  margin: 0;
`;
const RedRow = styled(ColoredRow)`
  background: ${COLOR_PALETTE.red.normal};
  padding: 5rem;
`;
const GreenRow = styled(ColoredRow)`
  background: ${COLOR_PALETTE.green.normal};
`;
const WhiteRow = styled(Row)`
  background: white;
  box-shadow: 0 0 4px 4px rgba(85, 95, 110, 0.4);
  z-index: 1;
`;
const Container = styled(RawContentContainer)`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`;
const Title = styled.h1`
  font-size: 4.5em;
  font-weight: 200;
  margin: 0;
  text-shadow: 5px 5px ${COLOR_PALETTE.red.dark};
`;

const FrontPage = () => (
  <PageContainer>
    <RedRow>
      <Container>
        <Title>{'¡Aprender el Pensamiento Computacional nunca fue tan fácil!'}</Title>
      </Container>
    </RedRow>
    <WhiteRow />
    <GreenRow />
    <WhiteRow />
  </PageContainer>
);

export default FrontPage;
