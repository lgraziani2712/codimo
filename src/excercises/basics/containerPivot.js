// @flow
import * as PIXI from 'pixi.js';

import {
	BUNNIES,
	BUNNIES_PER_ROW,
	SPACE_BETWEEN_BUNNIES,
	ANCHOR_CENTERED,
	BUNNY_BASE_ROTATION_DEGREE,
} from 'constants/pixi';
import { BUNNY_IMG } from 'constants/routes';
import { getHalfSize } from 'helpers/pixi';

type Props = {
	app: Object,
};
export default function containerPivot({ app }: Props) {
	const container = new PIXI.Container();

	app.stage.addChild(container);
	generateBunnies(container);

	// move container to the center
	container.x = getHalfSize(app.renderer.width);
	container.y = getHalfSize(app.renderer.height);

	// Center bunny sprite in local container coordinates
	container.pivot.x = getHalfSize(container.width);
	container.pivot.y = getHalfSize(container.height);

	// Listen for animate update
	app.ticker.add((delta) => {
		// rotate the container!
		// use delta to create frame-independent tranform
		container.rotation -= BUNNY_BASE_ROTATION_DEGREE / delta;
	});
}

function generateBunnies(container) {
	// Cache images
	const texture = PIXI.Texture.fromImage(BUNNY_IMG);

	// Create a 5x5 grid of bunnies
	for (let i = 0; i < BUNNIES; i++) {
		const bunny = new PIXI.Sprite(texture);

		bunny.anchor.set(ANCHOR_CENTERED);
		bunny.x = (i % BUNNIES_PER_ROW) * SPACE_BETWEEN_BUNNIES;
		bunny.y = Math.floor(i / BUNNIES_PER_ROW) * SPACE_BETWEEN_BUNNIES;
		container.addChild(bunny);
	}
}
