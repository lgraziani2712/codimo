/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Viewer from './Viewer';
import Routes from './Routes';

const rootElement = document.getElementById('app');

ReactDOM.render(
  <Viewer routes={Routes} />,
  rootElement,
);
