// @flow
import * as PIXI from 'pixi.js';

export default function container() {
	const size = {
		width: 800,
		height: 600,
	};
	const options = { backgroundColor: 0x1099bb };
	const app = new PIXI.Application(size.width, size.height, options);
	const BUNNIES = 25;
	const BUNNIES_PER_ROW = 5;
	const SPACE_BETWEEN_BUNNIES = 40;
	const ANCHOR_CENTERED = 0.5;
	const HALF_SIZE = 2;

	document.body.appendChild(app.view);

	const container = new PIXI.Container();

	app.stage.addChild(container);

	// Cache images
	const texture = PIXI.Texture.fromImage('/images/bunny.png');

	// Create a 5x5 grid of bunnies
	for (let i = 0; i < BUNNIES; i++) {
		const bunny = new PIXI.Sprite(texture);

		bunny.anchor.set(ANCHOR_CENTERED);
		bunny.x = (i % BUNNIES_PER_ROW) * SPACE_BETWEEN_BUNNIES;
		bunny.y = Math.floor(i / BUNNIES_PER_ROW) * SPACE_BETWEEN_BUNNIES;
		container.addChild(bunny);
	}

	// Center on the screen
	container.x = (app.renderer.width - container.width) / HALF_SIZE;
	container.y = (app.renderer.height - container.height) / HALF_SIZE;
}
