// @flow
import * as PIXI from 'pixi.js';

import { ANCHOR_CENTERED, HALF_SIZE } from 'constants/pixi';
import { BUNNY_IMG } from 'constants/routes';
import { POINTER_DOWN } from 'constants/events';

type Props = {
	app: Object,
};
export default function click({ app }: Props) {
	// Scale mode for all textures, will retain pixelation
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

	app.stage.addChild(createBunny({ app }));
}

function createBunny({ app }: Props) {
	const sprite = PIXI.Sprite.fromImage(BUNNY_IMG);

	// Set the initial position
	sprite.anchor.set(ANCHOR_CENTERED);
	sprite.x = app.renderer.width / HALF_SIZE;
	sprite.y = app.renderer.height / HALF_SIZE;

	// Opt-in to interactivity
	sprite.interactive = true;

	// Shows hand cursor
	sprite.buttonMode = true;

	// Pointers normalize touch and mouse
	sprite.on(POINTER_DOWN, onClick);

	function onClick () {
		sprite.scale.x *= 1.25;
		sprite.scale.y *= 1.25;
	}

	return sprite;
}
