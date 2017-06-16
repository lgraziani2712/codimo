/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import gameMetadata, { blocklyData } from 'test/gameMetadata';

import MazeGameContainer from './MazeGameContainer';

storiesOf('containers.MazeGameContainer', module)
    .add('first game', () => (
      <MazeGameContainer blocklyData={blocklyData} gameMetadata={gameMetadata} />
    ))
    .add('multiple exits game', () => {
      const newGameMetadata = {
        ...gameMetadata,
        mazeData: {
          ...gameMetadata.mazeData,
          path: [
            ['2,4', { top: true }],
            ['2,3', { top: true, bottom: true }],
            ['2,2', { top: true, bottom: true }],
            ['2,1', { top: true, bottom: true }],
            ['2,0', { top: true, bottom: true, right: true }],
            ['3,0', { top: true, left: true }],
          ],
          exits: ['2,0', '3,0'],
        },
        numericLineData: {
          statics: [1, null, null],
          accesses: [1, 2],
        },
      };

      return (
        <MazeGameContainer blocklyData={blocklyData} gameMetadata={newGameMetadata} />
      );
    });
