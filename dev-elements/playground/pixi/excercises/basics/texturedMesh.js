// @flow
import * as PIXI from 'pixi.js';

type Props = {
  app: PIXI.Application,
};
export default function texturedMesh({ app }: Props) {
  // build a rope!
  const ROPE_MOVEMENT_VELOCITY = 0.1;
  const graphicsData = {
    line: {
      weight: 2,
      color: 0xffc2c2,
    },
    circle: {
      color: 0xff0022,
      radius: 10,
    },
  };
  const pointMovementData = {
    x: {
      displacement: 0.3,
      distance: 20,
    },
    y: {
      displacement: 0.5,
      distance: 30,
    },
  };
  const pointsData = {
    length: 25,
    y: 0,
  };
  const ropeLength = 45;
  const points = [];

  for (let i = 0; i < pointsData.length; i++) {
    points.push(new PIXI.Point(i * ropeLength, pointsData.y));
  }

  const strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('/images/snake.png'), points);

  strip.x = -40;
  strip.y = 300;
  app.stage.addChild(strip);

  const graphics = new PIXI.Graphics();

  graphics.x = strip.x;
  graphics.y = strip.y;
  app.stage.addChild(graphics);

  let count = 0;

  // start animating
  app.ticker.add(() => {
    count += ROPE_MOVEMENT_VELOCITY;

    // make the snake
    for (let i = 0; i < points.length; i++) {
      points[i].x = i * ropeLength + Math.cos((i * pointMovementData.x.displacement) + count) * pointMovementData.x.distance;
      points[i].y = Math.sin((i * pointMovementData.y.displacement) + count) * pointMovementData.y.distance;
    }
    renderPoints();
  });

  function renderPoints () {
    graphics.clear();

    const first = 0;

    graphics.lineStyle(graphicsData.line.weight, graphicsData.line.color);
    graphics.moveTo(points[first].x, points[first].y);

    for (let i = 1; i < points.length; i++) {
      graphics.lineTo(points[i].x, points[i].y);
    }

    for (let i = 1; i < points.length; i++) {
      graphics.beginFill(graphicsData.circle.color);
      graphics.drawCircle(points[i].x, points[i].y, graphicsData.circle.radius);
      graphics.endFill();
    }
  }
}
