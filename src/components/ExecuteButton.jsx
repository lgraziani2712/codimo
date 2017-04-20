/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

type Props = {
  handleClick: (event: SyntheticEvent) => void,
};
export default function ExecuteButton({ handleClick }: Props) {
  return (<button type="button" onClick={handleClick}>{'Dale play!'}</button>);
}
