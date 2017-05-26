/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import GithubLink from 'components/logos/GithubLink';
import CodimoLink from 'components/logos/CodimoLink';
import { type RouteDescription } from 'routes/Routes';

const Background = styled.div`
  align-items: center;
  background: rgba(240, 240, 240, 0.9);
  box-shadow: 0 2px 2px 0 rgba(85, 95, 110, 0.4);
  display: flex;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 980px;
`;
const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
`;
const LocalLinksContainer = styled.ul`
  display: flex;
  flex-direction: row;
  font-family: 'Allerta', sans-serif;
  list-style-type: none;
  padding: 0 0 0 1rem;
  & li {
    padding: 0 0.5rem 0 0;
    & a {
      color: rgba(0, 0, 0, 0.6);
      font-size: 18px;
      text-decoration: none;
    }
  }
`;
const ExternalLinksContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
  & * {
    padding: 0 0 0 0.5rem;
  }
`;

type Props = {|
  routes: Array<RouteDescription>,
|};
const MenuBar = ({ routes }: Props) => (
  <Background>
    <Container>
      <CodimoLink />

      <LinksContainer>
        <LocalLinksContainer>
          {routes.map((route, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={key}>
              <Link to={route.path}>{route.title}</Link>
            </li>
          ))}
        </LocalLinksContainer>

        <ExternalLinksContainer>
          <GithubLink />
        </ExternalLinksContainer>
      </LinksContainer>
    </Container>
  </Background>
);

export default MenuBar;
