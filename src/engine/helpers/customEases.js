/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import CustomEase from 'vendors/CustomEase';

export const EASE_BE_HAPPY = 'EASE_BE_HAPPY';
export const EASE_BE_SAD = 'EASE_BE_SAD';

CustomEase.create(
  EASE_BE_HAPPY,
  'M0,0 C0,0 0.055,0.444 0.175,0.444 0.294,0.444 0.332,0 0.332,0 0.332,0 0.323,0.97 0.618,1 0.9,1.028 1,0 1,0',
);
CustomEase.create(
  EASE_BE_SAD,
  // eslint-disable-next-line max-len
  'M0,0 C0,0 0.05,-1,0.05,-1,0.05,-1 0.1,0,0.1,0,0.1,0 0.15,1,0.15,1,0.15,1 0.2,0,0.2,0,0.2,0 0.25,-1,0.25,-1,0.25,-1, 0.3,0,0.3,0,0.3,0, 0.35,1,0.35,1,0.35,1, 0.4,0,0.4,0,0.4,0, 0.45,-1,0.45,-1,0.45,-1, 0.5,0,0.5,0,0.5,0, 0.55,1,0.55,1,0.55,1, 0.6,0,0.6,0,0.6,0, 0.65,-1,0.65,-1,0.65,-1, 0.7,0,0.7,0,0.7,0, 0.75,1,0.75,1,0.75,1, 0.8,0,0.8,0,0.8,0, 0.85,-1,0.85,-1,0.85,-1, 0.9,0,0.9,0,0.9,0, 0.95,1,0.95,1,0.95,1, 1,0,1,0',
);
