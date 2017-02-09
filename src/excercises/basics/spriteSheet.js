// @flow
import * as PIXI from 'pixi.js';

import { FIGHTER_SPRITE, FIGHTER_FRAME_SIZE, getFighterSequence } from 'constants/routes';
import { ANCHOR_CENTERED } from 'constants/pixi';
import { getHalfSize } from 'helpers/pixi';

type Props = {
	app: Object,
};
export default function spriteSheet({ app }: Props) {
	PIXI.loader.add(FIGHTER_SPRITE).load(() => {
		// create an array of textures from an image path
		const frames = [];

		for (let i = 0; i < FIGHTER_FRAME_SIZE; i++) {
			// magically works since the spritesheet was loaded with the pixi loader
			frames.push(PIXI.Texture.fromFrame(getFighterSequence(i)));
		}

		// create an AnimatedSprite (brings back memories from the days of Flash, right ?)
		const anim = new PIXI.extras.AnimatedSprite(frames);

		/*
		* An AnimatedSprite inherits all the properties of a PIXI sprite
		* so you can change its position, its anchor, mask it, etc
		*/
		anim.x = getHalfSize(app.renderer.width);
		anim.y = getHalfSize(app.renderer.height);
		anim.anchor.set(ANCHOR_CENTERED);
		anim.animationSpeed = 0.5;
		anim.play();

		app.stage.addChild(anim);

		// Animate the rotation
		app.ticker.add(() => {
			anim.rotation += 0.01;
		});
	});
}
