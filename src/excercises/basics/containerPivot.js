// @flow
import * as PIXI from 'pixi.js';

export default function containerPivot() {
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
	const BASE_ROTATION_DEGREE = 0.1;

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

	// move container to the center
	container.x = app.renderer.width / HALF_SIZE;
	container.y = app.renderer.height / HALF_SIZE;

	// Center bunny sprite in local container coordinates
	container.pivot.x = container.width / HALF_SIZE;
	container.pivot.y = container.height / HALF_SIZE;

	// Listen for animate update
	app.ticker.add((delta) => {
		// rotate the container!
		// use delta to create frame-independent tranform
		container.rotation -= BASE_ROTATION_DEGREE / delta;
	});
}
