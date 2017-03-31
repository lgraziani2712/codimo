// @flow
import { Application } from 'pixi.js';

type Props = {
  size: {
    width: number,
    height: number,
  },
  options: PixiRendererOptionsParameterType,
};
const defaults = {
  size: {
    width: 800,
    height: 600,
  },
  options: {
    backgroundColor: 0x1099bb,
    antialias: true,
  },
};

export default function App({ size, options }: Props = defaults) {
  const app = new Application(size.width, size.height, options);

  if (document.body) {
    document.body.appendChild(app.view);
  }

  return app;
}
