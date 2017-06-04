/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';

import MenuBar from 'components/pages/MenuBar';
import FrontPage from 'components/FrontPage';
import { type RouteDescription } from 'routes';

import gameLoader from './gameLoader';

const GameSection = styled.div`
  height: calc(100% - 55px);
`;
const AllHeightBritannia = styled.div`
  height: 100%;
`;

type Props = {|
  routes: Array<RouteDescription>,
|};
const GameViewer = ({ routes }: Props) => (
  <Router>
    <AllHeightBritannia>
      <MenuBar routes={routes} />

      <GameSection>
        <Route
          path="/"
          exact={true}
          component={FrontPage}
        />
        {routes.map((route) => (route.children.map((child, key) => (
          <Route
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            path={`/${route.game}/${child.path}`}
            exact={route.exact}
            component={gameLoader(route.game, child.path)}
          />
        ))))}
      </GameSection>
    </AllHeightBritannia>
  </Router>
);

export default GameViewer;
