/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import { storiesOf, action } from 'test/storybook-facades';

import Button from './Button';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 50px 0 0;
  & a {
    margin: 20px;
  }
`;
const clickedAction = action('Clicked!');

storiesOf('ui/BlocklyApp/components', module)
    .add('Clickable animated buttons', () => (
      <Container>
        <div><Button handleClick={clickedAction} title="Click me 😃" type="blue" /></div>
        <div><Button handleClick={clickedAction} title="Click me 😃" type="green" /></div>
        <div><Button handleClick={clickedAction} title="Click me 😃" type="red" /></div>
        <div><Button handleClick={clickedAction} title="Click me 😃" type="orange" /></div>
      </Container>
    ))
    .add('Unclickable non-animated buttons', () => (
      <Container>
        <div>
          <Button
            disabled={true}
            title="Click me 😃"
            type="blue"
            handleClick={clickedAction}
          />
        </div>
        <div>
          <Button
            disabled={true}
            title="Click me 😃"
            type="green"
            handleClick={clickedAction}
          />
        </div>
        <div>
          <Button
            disabled={true}
            title="Click me 😃"
            type="red"
            handleClick={clickedAction}
          />
        </div>
        <div>
          <Button
            disabled={true}
            title="Click me 😃"
            type="orange"
            handleClick={clickedAction}
          />
        </div>
      </Container>
    ));
