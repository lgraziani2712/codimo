/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import ReactDOM from 'react-dom';

import GameViewer from 'containers/GameViewer';

import routes from './routes';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <GameViewer routes={routes} />,
  rootElement,
);
