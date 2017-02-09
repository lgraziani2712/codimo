// @flow
import React from 'react';

import BlocklyToolbox from 'components/BlocklyToolbox';

export default function BlocklyApp() {
	const id = 'blockly-app';

	return (
		<div id={id} style={{ height: '480px', width: '600px' }}>
			<BlocklyToolbox blocklyApp={id} />
		</div>
	);
}
