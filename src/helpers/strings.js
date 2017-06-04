/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { ZERO, ONE } from 'constants/numbers';

export const upperFirst = (string: string) => (
  string.charAt(ZERO).toLocaleUpperCase() + string.substr(ONE)
);

export const removeMe = () => {};
