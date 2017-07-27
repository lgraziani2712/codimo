/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */

export const blocklyData = {
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
  blockDefinitions: [
    'move_forward',
    'move_backward',
    'move_right',
    'move_left',
  ],
  defaultElements: `
    <block type="move_forward">
      <next><block type="move_left">
        <next><block type="move_backward">
            <next><block type="move_backward">
              <next><block type="move_right">
                <next><block type="move_right">
                  <next><block type="move_forward">
                    <next><block type="move_forward">
                      <next><block type="move_left">
                        <next><block type="move_backward"/></next>
                      </block></next>
                    </block></next>
                  </block></next>
                </block></next>
              </block></next>
            </block></next>
        </block></next>
      </block></next>
    </block>
  `,
};

export default {
  difficulty: 'easy',
  engineData: {
    canvas: {
      height: 569,
      width: 700,
    },
    width: 3,
    height: 5,
    margin: 0,
    size: 128,
  },
};
