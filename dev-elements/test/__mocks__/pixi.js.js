/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */

export class DisplayObject {
  toLocal = (point: Point) => point;
}
export class Point {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
  set(number: number) {
    this.x = this.y = number;
  }
}
export class Container extends DisplayObject {
  height: number;
  parent: Container;
  pivot: Point;
  rotation: number;
  scale: Point;
  width: number;

  constructor() {
    super();

    this.pivot = new Point();
    this.rotation = 0;
    this.scale = new Point;
    this.height = 200;
    this.width = 200;
  }
  addChild = (f: Container) => f;
  getChildAt = () => this;
  setParent(parent: Container): Container {
    this.parent = parent;

    return parent;
  }
}

function returnThis() {
  return this;
}

export class Graphics extends Container {
  beginFill = returnThis;
  moveTo = returnThis;
  lineTo = returnThis;
  closePath = returnThis;
  endFill = returnThis;
  drawRect = returnThis;
}

export class Texture {
  static WHITE = 'WHITE';
}
export class Sprite extends Container {
  anchor: Point;

  constructor() {
    super();

    this.anchor = new Point();
  }
}

export class Text extends Sprite {}
export class TextStyle {}
