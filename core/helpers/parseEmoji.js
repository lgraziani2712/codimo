/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import twemoji from 'twemoji';

export default function parseEmoji(string: string) {
  return (
    twemoji.parse(string, {
      folder: 'svg',
      ext: '.svg',
    })
  );
}
