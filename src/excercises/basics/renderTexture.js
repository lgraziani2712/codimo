// @flow
import * as PIXI from 'pixi.js';

import { BUNNIES, BUNNIES_PER_ROW, SPACE_BETWEEN_BUNNIES, ROTATION_MULTIPLIER } from 'constants/pixi';
import { BUNNY_IMG } from 'constants/routes';

type Props = {
	app: Object,
};
export default function renderTexture({ app }: Props) {
	const container = new PIXI.Container();

	app.stage.addChild(container);
	generateBunnies(container);

	const brtData = {
		width: 300,
		height: 300,
	};
	const brt = new PIXI.BaseRenderTexture(brtData.width, brtData.height, PIXI.SCALE_MODES.LINEAR);
	const renderTexture = new PIXI.RenderTexture(brt);

	const sprite = new PIXI.Sprite(renderTexture);

	sprite.x = 450;
	sprite.y = 60;
	app.stage.addChild(sprite);

	/*
	* All the bunnies are added to the container with the addChild method
	* when you do this, all the bunnies become children of the container, and when a container moves,
	* so do all its children.
	* This gives you a lot of flexibility and makes it easier to position elements on the screen
	*/
	container.x = 100;
	container.y = 60;

	app.ticker.add(() => {
		/**
		 * @param {PIXI.DisplayObject} container       The object to be rendered.
		 * @param {PIXI.RenderTexture} renderTexture   The render texture to render to.
		 */
		app.renderer.render(container, renderTexture);
	});
}

function generateBunnies(container: Object) {
	const texture = PIXI.Texture.fromImage(BUNNY_IMG);

	for (let i = 0; i < BUNNIES; i++) {
		const bunny = new PIXI.Sprite(texture);

		bunny.x = (i % BUNNIES_PER_ROW) * SPACE_BETWEEN_BUNNIES;
		bunny.y = Math.floor(i / BUNNIES_PER_ROW) * SPACE_BETWEEN_BUNNIES;
		bunny.rotation = Math.random() * (Math.PI * ROTATION_MULTIPLIER);
		container.addChild(bunny);
	}
}
