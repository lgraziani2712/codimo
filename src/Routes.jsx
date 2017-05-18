/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable react/no-multi-comp, react/display-name */
import React from 'react';

import blocklyData from 'test/games/maze/blocklyData.json';
import firstMazeData from 'test/games/maze/easy/001.json';
import secondMazeData from 'test/games/maze/easy/002.json';
import thirdMazeData from 'test/games/maze/easy/003.json';
import fourthMazeData from 'test/games/maze/easy/004.json';
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
}, {
  id: 4,
  path: '/maze/fourth',
  exact: true,
  title: 'Fourth Maze',
  main: () => (<MazeGameContainer blocklyData={blocklyData} gameMetadata={fourthMazeData} />),
}];
