// @flow
import React from 'react';

type Props = {
	blocklyApp: string,
};
export default class BlocklyToolbox extends React.Component {
	props: Props;
	toolbox: Element;

	componentDidMount() {
		const { blocklyApp } = this.props;

		// https://developers.google.com/blockly/guides/configure/web/toolbox
		Blockly.inject(blocklyApp, { toolbox: this.toolbox });
	}
	render() {
		return (
			<xml ref={toolbox => this.toolbox = toolbox} style={{ display: 'none' }}>
				<block type="controls_if" />
				<block type="controls_repeat_ext" />
				<block type="logic_compare" />
				<block type="math_number" />
				<block type="math_arithmetic" />
				<block type="text" />
				<block type="text_print" />
			</xml>
		);
	}
}
