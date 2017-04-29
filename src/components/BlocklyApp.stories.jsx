/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf, action } from 'test/storybook-facades';
import { ZERO } from 'constants/numbers';

import BlocklyApp from './BlocklyApp';

const moveExecutor = (number: number = ZERO, blockName: string) => { action(`${blockName}: ${number}`)(); };
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
    blockExecutor: moveExecutor,
  }, {
    name: 'move_backward',
    blockExecutor: moveExecutor,
  }, {
    name: 'move_right',
    blockExecutor: moveExecutor,
  }, {
    name: 'move_left',
    blockExecutor: moveExecutor,
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
  .add('simple Blockly app', () => (<BlocklyApp gameMetadata={gameMetadata} />));
