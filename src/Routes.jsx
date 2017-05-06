/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable react/no-multi-comp, react/display-name */
import React from 'react';

import blocklyData from 'test/games/maze/blocklyData.json';
import firstMazeData from 'test/games/maze/easy/first.json';
import secondMazeData from 'test/games/maze/easy/second.json';
import thirdMazeData from 'test/games/maze/easy/third.json';
import MazeGameContainer from 'containers/MazeGameContainer';

export default [{
  id: 0,
  path: '/',
  exact: true,
  title: 'Home',
  main: () => (<h2>{'Home'}</h2>),
}, {
  id: 1,
  path: '/maze/first',
  exact: true,
  title: 'First Maze',
  main: () => (<MazeGameContainer blocklyData={blocklyData} gameMetadata={firstMazeData} />),
}, {
  id: 2,
  path: '/maze/second',
  exact: true,
  title: 'Second Maze',
  main: () => (<MazeGameContainer blocklyData={blocklyData} gameMetadata={secondMazeData} />),
}, {
  id: 3,
  path: '/maze/third',
  exact: true,
  title: 'Third Maze',
  main: () => (<MazeGameContainer blocklyData={blocklyData} gameMetadata={thirdMazeData} />),
}];
