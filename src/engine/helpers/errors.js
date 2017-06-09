/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * NOTE:  Since this errors are extremely specific, and we know the only place
 *        where they are thrown, there is no need on having the stack error.
 *
 * @flow
 */
import { engine } from 'constants/localize/es';

export type MazeError = {|
  title: string,
  html?: string,
  imageUrl?: string,
  text?: string,
|};
const mazeErrorGenerator = (name: string): MazeError => (engine.errors[name]);

export const MazeExitError = mazeErrorGenerator('MazeExitError');
export const MazePathError = mazeErrorGenerator('MazePathError');
export const MazePathOverflowError = mazeErrorGenerator('MazePathOverflowError');
export const MazeStarvationError = mazeErrorGenerator('MazeStarvationError');
export const MazeWrongExitError = mazeErrorGenerator('MazeWrongExitError');
