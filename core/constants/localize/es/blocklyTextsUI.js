/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import parseEmoji from 'core/helpers/parseEmoji';

export default {
  actions: {
    play: `${parseEmoji('▶')} PROBAR`,
    reset: `${parseEmoji('⏹')} INTENTAR DE NUEVO`,
  },
};
