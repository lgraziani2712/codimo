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
  }, {
    define: 'block',
    type: 'leave_maze',
  }],
  blockDefinitions: [{
    name: 'move_forward',
  }, {
    name: 'move_backward',
  }, {
    name: 'move_right',
  }, {
    name: 'move_left',
  }, {
    name: 'leave_maze',
  }],
  defaultElements: `
    <block type="move_forward">
      <next><block type="move_forward">
        <next><block type="move_forward">
          <next><block type="move_forward"/></next>
        </block></next>
      </block></next>
    </block>
  `,
};

export default {
  difficulty: 'easy',
  mazeData: {
    canvas: {
      height: 569,
      width: 450,
    },
    width: 5,
    height: 5,
    margin: 10,
    size: 64,
    path: [
      ['2,4', { top: true }],
      ['2,3', { top: true, bottom: true }],
      ['2,2', { top: true, bottom: true }],
      ['2,1', { top: true, bottom: true }],
      ['2,0', { top: true, bottom: true }],
    ],
    access: '2,4',
    exits: ['2,0'],
    actorExitIdx: 0,
  },
  numericLineData: {
    statics: [1, null, 5],
    accesses: [1],
  },
};
