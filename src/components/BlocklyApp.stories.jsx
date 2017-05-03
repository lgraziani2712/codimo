/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';

import BlocklyApp from './BlocklyApp';

const gameMetadata = {
  elements: [{
    define: 'block',
    type: 'move_forward',
  }, {
    define: 'block',
    type: 'move_backward',
  }, {
    define: 'block',
    type: 'move_right',
  }, {
    define: 'block',
    type: 'move_left',
  }],
  blockDefinitions: [{
    name: 'move_forward',
  }, {
    name: 'move_backward',
  }, {
    name: 'move_right',
  }, {
    name: 'move_left',
  }],
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

storiesOf('components.BlocklyApp', module)
  .add('simple Blockly app', () => (<BlocklyApp gameMetadata={gameMetadata} handleSetOfInstructions={() => {}} />));
