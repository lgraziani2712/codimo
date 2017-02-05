// @flow
import * as PIXI from 'pixi.js';

export default function tilingSprite() {
	const app = new PIXI.Application();
	const TILING_SCALE_VELOCITY = 0.005;
	const TILING_SCALE_BASE = 2;

	document.body.appendChild(app.view);

	// create a texture from an image path
	const texture = PIXI.Texture.fromImage('/images/p2.jpeg');

	/* create a tiling sprite ...
	* requires a texture, a width and a height
	* in WebGL the image size should preferably be a power of two
	*/
	const tilingSprite = new PIXI.extras.TilingSprite(
		texture,
		app.renderer.width,
		app.renderer.height,
	);

	app.stage.addChild(tilingSprite);

	let count = 0;

	app.ticker.add(() => {
		count += TILING_SCALE_VELOCITY;

		tilingSprite.tileScale.x = TILING_SCALE_BASE + Math.sin(count);
		tilingSprite.tileScale.y = TILING_SCALE_BASE + Math.cos(count);

		tilingSprite.tilePosition.x += 1;
		tilingSprite.tilePosition.y += 1;
	});
}
