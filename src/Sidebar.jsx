/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { type RouteDescription } from './Viewer';

const Wrapper = styled.div`
  background: #f0f0f0;
  padding: 10px;
  width: 100px;
`;
const Container = styled.ul`
  list-style-type: none;
  padding: 0;
`;

type Props = {|
  routes: Array<RouteDescription>,
|};
const Sidebar = ({ routes }: Props) => (
  <Wrapper>
    <Container>
      {routes.map((route) => (
        <li key={route.id}>
          <Link to={route.path}>{route.title}</Link>
        </li>
      ))}
    </Container>
  </Wrapper>
);

export default Sidebar;
