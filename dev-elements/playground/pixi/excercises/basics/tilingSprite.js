// @flow
import * as PIXI from 'pixi.js';

import { P2_IMG } from 'playground/pixi/constants/routes';
import { TILING_SCALE_VELOCITY, TILING_SCALE_BASE } from 'playground/pixi/constants/pixi';

type Props = {
  app: Object,
};
export default function tilingSprite({ app }: Props) {
  // create a texture from an image path
  const texture = PIXI.Texture.fromImage(P2_IMG);

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
