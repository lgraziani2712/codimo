/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import { blocklyData } from 'test/gameMetadata';

import BlocklyApp from './BlocklyApp';

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

storiesOf('components.BlocklyApp', module)
  .add('simple Blockly app', () => (
    <BlocklyApp blocklyData={newBlocklyData} handleSetOfInstructions={() => {}} handleResetGame={() => {}} />
  ));
