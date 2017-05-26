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

import MenuBar from 'components/MenuBar';
import { type RouteDescription } from 'routes/Routes';

const MainWrapper = styled.div`
  display: grid;
  grid-template-rows: 52px auto;
  height: 100%;
`;

type Props = {|
  routes: Array<RouteDescription>,
|};
const GameViewer = ({ routes }: Props) => (
  <Router>
    <MainWrapper>
      <MenuBar routes={routes} />

      <div>
        {routes.map((route, key) => (
          <Route
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </MainWrapper>
  </Router>
);

export default GameViewer;
