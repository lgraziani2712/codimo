declare var Blockly: {
	inject(elementId: string | HTMLElement, options: Object): Object,
	Blocks: Object,
	JavaScript: {
		workspaceToCode(workspace: Object): string,
		statementToCode(block: Object, name: string): string,
		valueToCode(block: Object, type: string, order: number): any,
		ORDER_ATOMIC: string,
	},
	Msg: Object,
	ALIGN_CENTRE: string,
}
