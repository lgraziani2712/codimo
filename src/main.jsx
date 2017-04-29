/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import ReactDOM from 'react-dom';

import BlocklyApp from 'components/BlocklyApp';
import gameMetadata from 'components/gameMetadata.json';

const rootElement = document.getElementById('app');

ReactDOM.render(
  <BlocklyApp gameMetadata={gameMetadata} />,
  rootElement,
);
