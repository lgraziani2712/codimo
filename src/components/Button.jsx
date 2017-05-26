/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import { BUTTON_COLORS } from 'constants/colors';

const AnimatedButton = styled.a`
  border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
  float: left;
  font-family: 'Allerta', sans-serif;
  font-size: 25px;
  font-weight: bold;
  opacity: ${({ disabled }) => (disabled ? '0.6' : 'auto')};
  padding: 10px 40px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  text-decoration: none;
  transition: all 0.1s;
  &:active {
    border-bottom: 1px solid;
    transform: translate(0, 5px);
  }
`;
const ColoredAnimatedButton = AnimatedButton.extend`
  background-color: ${({ type }) => BUTTON_COLORS[type].bgColor};
  border-bottom: 5px solid ${({ type }) => BUTTON_COLORS[type].border};
  color: ${({ type }) => BUTTON_COLORS[type].color};
  text-shadow: 0 -2px ${({ type }) => BUTTON_COLORS[type].border};
`;

type Props = {|
  disabled?: boolean,
  title: string,
  type: $Keys<typeof BUTTON_COLORS>,
  handleClick: (event: SyntheticEvent) => void,
|};
export default function ExecuteButton({ handleClick, title, type, disabled }: Props) {
  return (
    <ColoredAnimatedButton
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >{title}</ColoredAnimatedButton>
  );
}
