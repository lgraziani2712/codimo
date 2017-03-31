// @flow
import * as PIXI from 'pixi.js';

import { ANCHOR_CENTERED } from 'playground/pixi/constants/pixi';
import { BUNNY_IMG } from 'playground/pixi/constants/routes';
import { getHalfSize } from 'playground/pixi/helpers/pixi';

type Props = {
  app: PIXI.Application,
};
export default function rotateBunny({ app }: Props) {
  const BASE_ROTATION_DEGREE = 0.1;
  const bunny = PIXI.Sprite.fromImage(BUNNY_IMG);


  // center the sprite's anchor point
  bunny.anchor.set(ANCHOR_CENTERED);

  // move the sprite to the center of the screen
  bunny.x = getHalfSize(app.renderer.width);
  bunny.y = getHalfSize(app.renderer.height);

  app.stage.addChild(bunny);

  // Listen for animate update
  app.ticker.add(delta => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent tranformation
    bunny.rotation += BASE_ROTATION_DEGREE / delta;
  });
}
