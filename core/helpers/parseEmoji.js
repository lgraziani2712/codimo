/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import twemoji from 'twemoji';

/**
 * Generates an HTML string with the parsed string.
 *
 * @param  {string} string Contains text and emojis
 * @return {[type]}        HTML as string. It assures every emoji
 *                         is uniform on every OS and browser.
 */
export default function parseEmoji(string: string) {
  return (
    twemoji.parse(string, {
      folder: 'svg',
      ext: '.svg',
    })
  );
}
