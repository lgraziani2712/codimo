// @flow
import * as PIXI from 'pixi.js';

import { BKG_GRASS_IMG, CUSTOM_SHADER_SHD } from 'playground/pixi/constants/routes';

const FILTER_VEL = 0.035;

type Props = {
	app: Object,
};
export default function customFilter({ app }: Props) {
	// Create background image
	const background = PIXI.Sprite.fromImage(BKG_GRASS_IMG);

	background.width = app.renderer.width;
	background.height = app.renderer.height;
	app.stage.addChild(background);

	// Stop application wait for load to finish
	app.stop();

	PIXI.loader.add('shader', CUSTOM_SHADER_SHD).load(onLoaded);

	let filter;

	// Handle the load completed
	function onLoaded (loader, res) {
		// Create the new filter, arguments: (vertexShader, framentSource)
		filter = new PIXI.Filter(null, res.shader.data);

		// Add the filter
		background.filters = [filter];

		// Resume application update
		app.start();
	}

	// Animate the filter
	app.ticker.add((delta) => {
		filter.uniforms.customUniform += FILTER_VEL / delta;
	});
}
