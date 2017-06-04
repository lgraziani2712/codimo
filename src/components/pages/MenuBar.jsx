/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import { type RouteDescription } from 'routes';

import CodimoLink from './logos/CodimoLink';
import GithubLink from './logos/GithubLink';
import HeaderLink from './links/HeaderLink';
import RawContentContainer from './RawContentContainer';

const Background = styled.div`
  background: rgba(240, 240, 240, 0.9);
  box-shadow: 0 0 4px 4px rgba(85, 95, 110, 0.4);
  height: 55px;
  position: relative;
  width: 100%;
  z-index: 1;
`;
const ContentContainer = styled(RawContentContainer)`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;
const LinksContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;
const LocalLinksContainer = styled.ul`
  display: flex;
  margin: 0;
  padding: 0 0 0 1.5rem;
`;
const ExternalLinksContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  & > * {
    padding-left: 0.5rem;
  }
`;

type Props = {|
  routes: Array<RouteDescription>,
|};
const MenuBar = ({ routes }: Props) => (
  <Background>
    <ContentContainer>
      <CodimoLink />

      <LinksContainer>
        <LocalLinksContainer>
          {routes.map((route, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <HeaderLink key={key} title={route.title}>
              {route.children.map((child, key2) => (
                // eslint-disable-next-line react/no-array-index-key
                <HeaderLink key={key2} to={`/${route.game}/${child.path}`} title={child.title} />
              ))}
            </HeaderLink>
          ))}
        </LocalLinksContainer>

        <ExternalLinksContainer>
          <GithubLink />
        </ExternalLinksContainer>
      </LinksContainer>
    </ContentContainer>
  </Background>
);

export default MenuBar;
