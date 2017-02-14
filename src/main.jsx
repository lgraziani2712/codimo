/**
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Luciano Graziani @LucianoGraziani
 */
// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import BlocklyApp from 'components/BlocklyApp';

const rootElement = document.getElementById('app');

ReactDOM.render(
	<BlocklyApp />,
	rootElement,
);
