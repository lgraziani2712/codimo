/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, object-property-newline */
export default {
  activityName: 'MultipliersAndDivisors',
  difficulty: 'normal',
  blocklyData: {
    blockDefinitions: [],
    defaultElements: 'no one',
    elements: [],
  },
  engineData: {
    canvas: {
      width: 500,
      height: 680,
    },
    width: 5,
    height: 5,
    margin: 10,
    size: 64,
    path: [
      ['2,4', { top: true }],
      ['2,3', { bottom: true, top: true }],
      ['2,2', { bottom: true, top: true }],
      ['2,1', { bottom: true, top: true }],
      ['2,0', { bottom: true, top: true }],
    ],
    exits: ['2,0'],
    platformCoords: '2,4',
    actors: [
      {
        number: 1,
        endPosition: '5,0',
      },
      {
        number: 5,
        endPosition: '3,0',
      },
      {
        number: -3,
        endPosition: '4,0',
      },
      {
        number: 4,
        endPosition: '2,0',
      },
    ],
    numericLineData: {
      statics: [0, 1, null, 5, 6],
      accesses: [2],
    },
  },
};
