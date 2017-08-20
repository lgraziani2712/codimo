/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';

import CodimoRouter from 'core/ui/CodimoRouter';

import FrontPage from './components/FrontPage';
import MenuBar from './components/pages/MenuBar';
import routes from './routes';

const GameSection = styled.div`
  height: calc(100% - 55px);
`;
const AllHeightBritannia = styled.div`
  height: 100%;
`;
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <AllHeightBritannia>
      <MenuBar routes={routes} />

      <GameSection>
        <Route
          path="/"
          exact={true}
          component={FrontPage}
        />
        <CodimoRouter routes={routes} />
      </GameSection>
    </AllHeightBritannia>
  </Router>,
  rootElement,
);
