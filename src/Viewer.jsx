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

import Sidebar from './Sidebar';

const MainWrapper = styled.div`
  display: flex;
`;
const ContentViewer = styled.div`
  flex: 1;
  padding: 10px;
`;

export type RouteDescription = {|
  exact?: boolean,
  id: number,
  main: ReactClass<*>,
  path: string,
  title: string,
|};
type Props = {|
  routes: Array<RouteDescription>,
|};
const Viewer = ({ routes }: Props) => (
  <Router>
    <MainWrapper>
      <Sidebar routes={routes} />

      <ContentViewer>
        {routes.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </ContentViewer>
    </MainWrapper>
  </Router>
);

export default Viewer;
