/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import { COLOR_PALETTE } from 'core/constants/colors';

const AnimatedButton = styled.a`
  border-radius: 10px;
  cursor: ${({ disabled }: Props) => (disabled ? 'cursor' : 'pointer')};
  float: left;
  font-size: 25px;
  font-weight: bold;
  opacity: ${({ disabled }: Props) => (disabled ? '0.6' : 'auto')};
  padding: 10px 40px;
  pointer-events: ${({ disabled }: Props) => (disabled ? 'none' : 'auto')};
  text-decoration: none;
  transition: all 0.1s;
  &:active {
    border-bottom: 1px solid;
    transform: translate(0, 5px);
  }
`;
const ColoredAnimatedButton = styled(AnimatedButton)`
  background-color: ${({ type }: Props) => COLOR_PALETTE[type].normal};
  border-bottom: 5px solid ${({ type }: Props) => COLOR_PALETTE[type].dark};
  color: ${({ type }: Props) => COLOR_PALETTE[type].color};
  text-shadow: 0 -2px ${({ type }: Props) => COLOR_PALETTE[type].dark};
`;

type Props = {|
  disabled?: boolean,
  title: string,
  type: $Keys<typeof COLOR_PALETTE>,
  handleClick: (event: SyntheticEvent) => void,
|};
export default function Button({ handleClick, title, type, disabled }: Props) {
  return (
    <ColoredAnimatedButton
      disabled={disabled}
      type={type}
      onClick={handleClick}
    >{title}</ColoredAnimatedButton>
  );
}
