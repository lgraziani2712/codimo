/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, object-property-newline */
export default {
  difficulty: 'easy',
  engineData: {
    canvas: {
      height: 620,
      width: 1200,
    },
    width: 15,
    height: 7,
    margin: 10,
    size: 64,
    path: [
      ['4,6', { top: true }],
      ['4,5', { bottom: true, top: true }],
      ['4,4', { bottom: true, right: true }],
      ['5,4', { left: true, right: true }],
      ['6,4', { left: true, right: true }],
      ['7,4', { left: true, right: true }],
      ['8,4', { left: true, right: true }],
      ['9,4', { left: true, bottom: true }],
      ['9,5', { top: true, right: true }],
      ['10,5', { left: true, right: true }],
      ['11,5', { left: true, top: true }],
      ['11,4', { bottom: true, top: true }],
      ['11,3', { bottom: true, top: true }],
      ['11,2', { bottom: true, left: true }],
      ['10,2', { left: true, right: true }],
      ['9,2', { left: true, right: true }],
      ['8,2', { left: true, right: true }],
      ['7,2', { left: true, right: true }],
      ['6,2', { left: true, right: true }],
      ['5,2', { left: true, right: true }],
      ['4,2', { left: true, right: true }],
      ['3,2', { left: true, right: true }],
      ['2,2', { top: true, right: true }],
      ['2,1', { top: true, bottom: true }],
      ['2,0', { top: true, bottom: true }],
    ],
    access: '4,6',
    exits: ['2,0'],
    actorExitIdx: 0,
  },
  numericLineData: {
    statics: [0, null, 4, 5, 6, 7, 8, 9, 10, 11],
    accesses: [1],
  },
};
