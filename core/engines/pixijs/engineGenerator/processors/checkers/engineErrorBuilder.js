/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

export type ClientError = {
  confirmButtonText: string,
  name: string,
  imageUrl: string,
  text: string,
  title: string,
};
type Props = {|
  imageUrl: string,
  text: string,
  title: string,
  confirmButtonText?: string,
|};
const engineErrorBuilder = (name: string, props: Props): ClientError => ({
  confirmButtonText: 'Aceptar',
  name,
  ...props,
});

export default engineErrorBuilder;
