// @flow
import * as PIXI from 'pixi.js';

export default function spriteSheet() {
	const app = new PIXI.Application();

	document.body.appendChild(app.view);
	PIXI.loader.add('/images/fighter.json').load(onAssetsLoaded);

	function onAssetsLoaded() {
		// create an array of textures from an image path
		const frames = [];
		const FIGHTER_FRAME_SIZE = 30;
		const TWO_DIGITS = 10;

		for (let i = 0; i < FIGHTER_FRAME_SIZE; i++) {
			const val = i < TWO_DIGITS ? `0${i}` : i;

			// magically works since the spritesheet was loaded with the pixi loader
			frames.push(PIXI.Texture.fromFrame(`rollSequence00${val}.png`));
		}

		// create an AnimatedSprite (brings back memories from the days of Flash, right ?)
		const anim = new PIXI.extras.AnimatedSprite(frames);

		/*
		* An AnimatedSprite inherits all the properties of a PIXI sprite
		* so you can change its position, its anchor, mask it, etc
		*/
		const HALF_SIZE = 2;
		const ANCHOR_CENTERED = 0.5;

		anim.x = app.renderer.width / HALF_SIZE;
		anim.y = app.renderer.height / HALF_SIZE;
		anim.anchor.set(ANCHOR_CENTERED);
		anim.animationSpeed = 0.5;
		anim.play();

		app.stage.addChild(anim);

		// Animate the rotation
		app.ticker.add(() => {
			anim.rotation += 0.01;
		});
	}
}
