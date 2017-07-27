/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import { storiesOf, action } from 'test/storybook-facades';
import { blocklyData } from 'core/__mocks__/gameMetadata';

import BlocklyApp from './';

const newBlocklyData = {
  ...blocklyData,
  defaultElements: `
    <block type="move_forward">
      <next>
        <block type="move_right">
          <next>
            <block type="move_backward">
              <next>
                <block type="move_left" />
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  `,
};
const handleClick = action('On play');
const handleSetOfInstructions = (rawInstructions) => (
  new Promise((resolve) => {
    handleClick(rawInstructions);
    resolve();
  })
);
const Container = styled.div`
  width: 500px;
`;

storiesOf('ui/BlocklyApp', module)
    .add('Simple Blockly app', () => (
      <Container>
        <BlocklyApp
          difficulty="easy"
          blocklyData={newBlocklyData}
          handleSetOfInstructions={handleSetOfInstructions}
          handleResetGame={() => Promise.resolve()}
        />
      </Container>
    ))
    .add('Complex Blockly app', () => {
      const newestBlocklyData = {
        ...blocklyData,
        elements: [{
          define: 'category',
          name: 'Actions',
          blocks: blocklyData.elements,
        }, {
          define: 'category',
          name: 'Loops',
          blocks: [{
            define: 'block',
            type: 'simple_loop',
          }, {
            define: 'block',
            type: 'repeat_x',
          }],
        }],
        blockDefinitions: [
          ...blocklyData.blockDefinitions,
          'simple_loop',
          'repeat_x',
        ],
      };

      return (
        <Container>
          <BlocklyApp
            difficulty="normal"
            blocklyData={newestBlocklyData}
            handleSetOfInstructions={handleSetOfInstructions}
            handleResetGame={() => Promise.resolve()}
          />
        </Container>
      );
    });
