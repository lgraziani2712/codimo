// @flow
import * as PIXI from 'pixi.js';

import {
  BUNNIES,
  BUNNIES_PER_ROW,
  SPACE_BETWEEN_BUNNIES,
  ANCHOR_CENTERED,
  HALF_SIZE,
} from 'playground/pixi/constants/pixi';
import { BUNNY_IMG } from 'playground/pixi/constants/routes';

type Props = {
  app: PIXI.Application,
};
export default function container({ app }: Props) {
  const container = new PIXI.Container();
  // Cache images
  const texture = PIXI.Texture.fromImage(BUNNY_IMG);

  app.stage.addChild(container);

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
