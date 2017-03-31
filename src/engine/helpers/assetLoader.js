/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { loader as pixiLoader } from 'pixi.js';

export default function assetLoader(assets: Array<string | PixiResourceType>) {
  return new Promise((resolve, reject) => {
    pixiLoader.add(assets);
    pixiLoader.onError.add(reject);
    pixiLoader.onComplete.add(resolve);

    pixiLoader.load();
  });
}
