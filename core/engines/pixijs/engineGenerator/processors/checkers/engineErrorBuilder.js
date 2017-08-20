/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import gameTextUI from 'core/constants/localize/es/gameTextUI';

export type ClientError = {
  confirmButtonText: string,
  name: string,
  imageUrl: string,
  text: string,
  title: string,
};
type ClientErrorProps = {|
  title: string,
  confirmButtonText?: string,
  imageUrl?: string,
  text?: string,
  html?: string,
|};

/**
 * It generates a new object that will be used for push Information
 * to the user.
 *
 * @version 1.0.0
 * @param  {string}           name  Error's name.
 * @param  {ClientErrorProps} props Error data.
 * @return {ClientError}            Error instance.
 */
const engineErrorBuilder = (name: string, props: ClientErrorProps): ClientError => ({
  confirmButtonText: gameTextUI.accept,
  name,
  ...props,
});

export default engineErrorBuilder;
