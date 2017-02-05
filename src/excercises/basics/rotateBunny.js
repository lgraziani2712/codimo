// @flow
import * as PIXI from 'pixi.js';

export default function rotateBunny() {
	const size = {
		width: 800,
		height: 600,
	};
	const options = { backgroundColor: 0x1099bb };
	const app = new PIXI.Application(size.width, size.height, options);
	const HALF_SIZE = 2;
	const ANCHOR_CENTERED = 0.5;
	const BASE_ROTATION_DEGREE = 0.1;

	document.body.appendChild(app.view);

	const bunny = PIXI.Sprite.fromImage('/images/bunny.png');


	// center the sprite's anchor point
	bunny.anchor.set(ANCHOR_CENTERED);

	// move the sprite to the center of the screen
	bunny.x = app.renderer.width / HALF_SIZE;
	bunny.y = app.renderer.height / HALF_SIZE;

	app.stage.addChild(bunny);

	// Listen for animate update
	app.ticker.add(delta => {
		// just for fun, let's rotate mr rabbit a little
		// delta is 1 if running at 100% performance
		// creates frame-independent tranformation
		bunny.rotation += BASE_ROTATION_DEGREE / delta;
	});
}
