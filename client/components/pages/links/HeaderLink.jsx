/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR_PALETTE } from 'core/constants/colors';

const LinkContainer = styled.li`
  list-style-type: none;
  position: relative;

  &::before {
    background: ${({ isActive }) => (!isActive ? 'default' : COLOR_PALETTE.orange.clear)};
    content: '';
    height: 100%;
    left: ${({ isActive }) => (!isActive ? '50%' : '0')};
    position: absolute;
    transition: 0.5s;
    width: ${({ isActive }) => (!isActive ? '0' : '100%')};
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
    height: 5%;
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
const Link = styled(RouterLink)`
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: flex;
  font-size: 1.25em;
  height: 100%;
  padding: 0 0.5em;
  text-decoration: none;

  ${/*sc-selector*/LinkContainer}:hover > a {
    font-weight: bold;
  }
`;
const EmptyLink = Link.withComponent('span');
const ChildrenContainer = styled.ul`
  background: rgba(240, 240, 240, 0.9);
  box-shadow: 0 0 1px 1px rgba(85, 95, 110, 0.4);
  display: flex;
  flex-direction: column;
  margin: 0;
  min-width: 15em;
  opacity: 0;
  padding: 0;
  position: absolute;
  transform: translateY(-2em);
  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.1s;
  visibility: hidden;
  width: 100%;
  z-index: -1;

  ${/*sc-selector*/LinkContainer}:hover > & {
    opacity: 1;
    transform: translateY(0%);
    transition-delay: 0s, 0s, 0.3s;
    visibility: visible;
    z-index: 0;
  }
`;

const isActive = (actualUrl: string, url: string) => (
  actualUrl.split('/')[1] === url || actualUrl.split('/')[2] !== undefined && (
    actualUrl.split('/')[1] === url.split('/')[1]
    && actualUrl.split('/')[2] === url.split('/')[2]
  )
);

type Props = {|
  location: Object,
  title: string,
  to: string,
  children?: React.Element<HeaderLink>,
|};
const HeaderLink = ({ children, location, to, title }: Props) => {
  const active = isActive(location.pathname, to);

  return (
    <LinkContainer isActive={active}>
      {active || children
        ? <EmptyLink>{title}</EmptyLink>
        : <Link to={to}>{title}</Link>
      }
      {!children || (<ChildrenContainer>{children}</ChildrenContainer>)}
    </LinkContainer>
  );
};

export default withRouter(HeaderLink);
