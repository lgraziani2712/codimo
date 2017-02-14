/**
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Luciano Graziani @LucianoGraziani
 */
// @flow
import React from 'react';

type Props = {
	handleClick: Function,
};
export default function ExecuteButton({ handleClick }: Props) {
	return (<button type="button" onClick={handleClick}>{'Dale play!'}</button>);
}
