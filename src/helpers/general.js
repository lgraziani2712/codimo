/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import twemoji from 'twemoji';

export const parseEmoji = (string: string) => (
  twemoji.parse(string, {
    folder: 'svg',
    ext: '.svg',
  })
);

export const deleteMe = () => {};
