/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const HomeLink = styled(Link)`
  align-items: center;
  display: flex;
  text-decoration: none;
  &:active img {
    animation: ${rotate360} 0.25s linear infinite;
  }
`;
const Title = styled.span`
  color: #f9524e;
  font-family: 'Allerta', sans-serif;
  font-size: 25px;
  font-weight: bold;
  margin-left: 3px;
  text-shadow: 0 1px 2px rgba(85, 95, 110, 0.4);
`;
const ShadowedImg = styled.img`
  filter: drop-shadow(0 1px 2px rgba(85, 95, 110, 0.4));
`;

const CodimoLink = () => (
  <HomeLink to="/">
    <ShadowedImg src="/images/logo-title.png" />
    <Title>{'Códimo'}</Title>
  </HomeLink>
);

export default CodimoLink;
