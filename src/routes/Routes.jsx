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

export type RouteDescription = {|
  exact?: boolean,
  path: string,
  title: string,
  main: ReactClass<*>,
|};

export default [{
  path: '/maze/first',
  exact: true,
  title: 'First Maze',
  main: () => (<MazeGameContainer blocklyData={blocklyData} gameMetadata={firstMazeData} />),
}, {
  path: '/maze/second',
  exact: true,
  title: 'Second Maze',
  main: () => (<MazeGameContainer blocklyData={blocklyData} gameMetadata={secondMazeData} />),
}, {
  path: '/maze/third',
  exact: true,
  title: 'Third Maze',
  main: () => (<MazeGameContainer blocklyData={blocklyData} gameMetadata={thirdMazeData} />),
}, {
  path: '/maze/fourth',
  exact: true,
  title: 'Fourth Maze',
  main: () => (<MazeGameContainer blocklyData={blocklyData} gameMetadata={fourthMazeData} />),
}];
