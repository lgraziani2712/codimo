/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

type Props = {|
  title: string,
  handleClick: () => void | (event: SyntheticEvent) => void,
|};
export default function ExecuteButton({ handleClick, title }: Props) {
  return (<button type="button" onClick={handleClick}>{title}</button>);
}
