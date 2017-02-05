// @flow
import * as PIXI from 'pixi.js';

export default function click() {
	const size = {
		width: 800,
		height: 600,
	};
	const options = { backgroundColor: 0x1099bb };
	const app = new PIXI.Application(size.width, size.height, options);
	const ANCHOR_CENTERED = 0.5;
	const HALF_SIZE = 2;

	document.body.appendChild(app.view);
	// Scale mode for all textures, will retain pixelation
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

	const sprite = PIXI.Sprite.fromImage('/images/bunny.png');

	// Set the initial position
	sprite.anchor.set(ANCHOR_CENTERED);
	sprite.x = app.renderer.width / HALF_SIZE;
	sprite.y = app.renderer.height / HALF_SIZE;

	// Opt-in to interactivity
	sprite.interactive = true;

	// Shows hand cursor
	sprite.buttonMode = true;

	// Pointers normalize touch and mouse
	sprite.on('pointerdown', onClick);

	// Alternatively, use the mouse & touch events:
	// sprite.on('click', onClick); // mouse-only
	// sprite.on('tap', onClick); // touch-only
	app.stage.addChild(sprite);

	function onClick () {
		sprite.scale.x *= 1.25;
		sprite.scale.y *= 1.25;
	}
}
