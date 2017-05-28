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

import MenuBar from 'components/pages/MenuBar';
import FrontPage from 'components/FrontPage';
import { type RouteDescription } from 'routes/Routes';

type Props = {|
  routes: Array<RouteDescription>,
|};
const GameViewer = ({ routes }: Props) => (
  <Router>
    <div>
      <MenuBar routes={routes} />

      <div>
        <Route
          path="/"
          exact={true}
          component={FrontPage}
        />
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
    </div>
  </Router>
);

export default GameViewer;
