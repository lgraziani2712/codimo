declare var __VERSION__: string;
declare var process: {
	env: {
		[key: string]: ?string,
	},
};
declare var module: {
	hot: {
		accept: Function,
	},
};
declare var Blockly: {
	inject(elementId: string, options: Object): Object,
}
