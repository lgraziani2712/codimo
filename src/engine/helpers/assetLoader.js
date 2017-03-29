/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { loader as pixiLoader } from 'pixi.js';

type Asset = string | {
  name?: string,
  url: string,
  options?: {
    crossOrigin?: boolean,
    loadType?: number,
    xhrType?: string,
    metadata?: {
      loadElement: HTMLImageElement | HTMLAudioElement | HTMLVideoElement,
      skipSource: boolean,
    },
  },
  onComplete?: Function,
};

export default function assetLoader(assets: Array<Asset>) {
  return new Promise((resolve, reject) => {
    pixiLoader.add(assets);
    pixiLoader.onError.add(reject);
    pixiLoader.onComplete.add(resolve);

    pixiLoader.load();
  });
}
