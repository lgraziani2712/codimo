// @flow
import 'blockly/blocks_compressed';
import React from 'react';
import ReactDOM from 'react-dom';

import 'blockly/msg/js/es';

import BlocklyApp from 'components/BlocklyApp';

const rootElement = document.getElementById('app');

ReactDOM.render(
	<BlocklyApp />,
	rootElement,
);
