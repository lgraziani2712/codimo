/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, object-property-newline */
export default {
  difficulty: 'normal',
  engineData: {
    canvas: {
      height: 480,
      width: 400,
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
    access: '2,4',
    exits: ['2,0'],
    actorExitIdx: 0,
    platformCoords: '2,4',
    actors: [
      {
        number: 1,
        startPosition: '0,0',
        endPosition: '2,0',
      },
      {
        number: 5,
        startPosition: '0,0',
        endPosition: '3,0',
      },
      {
        number: -3,
        startPosition: '0,0',
        endPosition: '4,0',
      },
      {
        number: 4,
        startPosition: '0,0',
        endPosition: '5,0',
      },
    ],
  },
  numericLineData: {
    statics: [0, null, 4, 5, 6, 7, 8, 9, 10, 11],
    accesses: [1],
  },
};
