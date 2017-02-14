/**
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Luciano Graziani @LucianoGraziani
 */
// @flow
import React from 'react';

type Props = {
	handleWorkspaceCreation: Function,
};
export default class BlocklyToolbox extends React.Component {
	props: Props;
	toolbox: Element;

	componentDidMount() {
		const { handleWorkspaceCreation } = this.props;

		// https://developers.google.com/blockly/guides/configure/web/toolbox
		handleWorkspaceCreation(this.toolbox);
	}
	render() {
		return (
			<xml ref={toolbox => this.toolbox = toolbox} style={{ display: 'none' }}>
				<category name="Control">
					<block type="controls_if" />
					<block type="controls_repeat_ext" />
				</category>
				<category name="Logic">
					<block type="logic_compare" />
					<block type="math_number" />
					<block type="math_arithmetic" />
				</category>
				<category name="Acciones">
					<block type="MoveForward" />
					<block type="MoveBackward" />
					<block type="MoveRight" />
					<block type="MoveLeft" />
				</category>
			</xml>
		);
	}
}
