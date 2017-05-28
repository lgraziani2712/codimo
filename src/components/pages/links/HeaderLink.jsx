/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR_PALETTE } from 'constants/colors';

const Link = styled(RouterLink)`
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  font-size: 1.25rem;
  height: 100%;
  padding: 0 0.5rem;
  text-decoration: none;
`;
const Li = styled.li`
  position: relative;
  transition: 0.5s;
  &:hover {
    font-weight: bold;
  }
  &::before {
    content: '';
    display: block;
    height: 100%;
    left: 50%;
    position: absolute;
    transition: 0.5s;
    width: 0;
    z-index: -1;
  }
  &:hover::before {
    background: ${COLOR_PALETTE.orange.clear};
    left: 0;
    width: 100%;
  }
  &::after {
    bottom: 0;
    content: '';
    display: block;
    height: 3px;
    left: 50%;
    position: absolute;
    transition: 0.5s;
    width: 0;
  }
  &:hover::after {
    background: ${COLOR_PALETTE.orange.light};
    left: 0;
    width: 100%;
  }
`;

type Props = {|
  to: string,
  title: string,
|};
const FooterLink = ({ to, title }: Props) => (
  <Li><Link to={to}>{title}</Link></Li>
);

export default FooterLink;
