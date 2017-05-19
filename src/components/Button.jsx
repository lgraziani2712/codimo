/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

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
  user-select: none;

  &:active {
    border-bottom: 1px solid;
    transform: translate(0, 5px);
  }
`;

const colors = {
  blue: {
    bgColor: '#428bca',
    border: '#0a5a9c',
    color: '#fff',
  },
  green: {
    bgColor: '#5cb85c',
    border: '#1b7c1b',
    color: '#fff',
  },
  red: {
    bgColor: '#d9534f',
    border: '#be2f2b',
    color: '#fff',
  },
  yellow: {
    bgColor: '#d3ae3f',
    border: '#8e6c08',
    color: '#fff',
  },
};
const ColoredAnimatedButton = styled(AnimatedButton)`
  background-color: ${({ type }) => colors[type].bgColor};
  border-bottom: 5px solid ${({ type }) => colors[type].border};
  color: ${({ type }) => colors[type].color};
  text-shadow: 0px -2px ${({ type }) => colors[type].border};
`;

type Props = {|
  disabled?: boolean,
  title: string,
  type: 'blue' | 'red' | 'green' | 'yellow',
  handleClick: () => void | (event: SyntheticEvent) => void,
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
