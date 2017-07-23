/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import parseEmoji from 'core/helpers/parseEmoji';

import engineErrorBuilder, { type ClientError } from './engineErrorBuilder';

const defaultProps = engineErrorBuilder('HasHitAWallError', {
  imageUrl: '/core/images/errors/HasHitAWallError.png',
  text: 'La dirección que intentás tomar es incorrecta',
  title: parseEmoji('🙅 Camino no válido 🙅‍♂️'),
});

type Props = {|
  confirmButtonText?: string,
  imageUrl?: string,
  text?: string,
  title?: string,
|};
const hasHitAWallErrorGenerator = (props?: Props): ClientError => ({
  ...defaultProps,
  ...props,
});

export default hasHitAWallErrorGenerator;
