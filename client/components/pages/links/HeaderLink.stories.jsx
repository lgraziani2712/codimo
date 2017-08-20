/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { storiesOf } from 'test/storybook-facades';

import HeaderLink from './HeaderLink';

const label = 'Hello Button';
const MainContainer = styled.div`
  display: flex;
  justify-content: left;
`;
const StoryContainer = styled.div`
  border: 1px dotted black;
  font-size: 36px;
  margin: 10% 0 0 10%;
`;

storiesOf('components.pages.links.HeaderLink', module)
    .add('without children', () => {
      const story = <Router><HeaderLink to="#" title={label} /></Router>;

      return <MainContainer><StoryContainer>{story}</StoryContainer></MainContainer>;
    })
    .add('with children', () => {
      const story = (
        <Router>
          <HeaderLink to="#" title={label}>
            <HeaderLink to="#" title="Child 1" />
            <HeaderLink to="#" title="Child 2" />
            <HeaderLink to="#" title="Child 3" />
          </HeaderLink>
        </Router>
      );

      return <MainContainer><StoryContainer>{story}</StoryContainer></MainContainer>;
    });
