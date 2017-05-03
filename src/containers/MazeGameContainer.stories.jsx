/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';
import gameMetadata from 'test/gameMetadata.json';

import MazeGameContainer from './MazeGameContainer';

storiesOf('containers.MazeGameContainer', module)
  .add('first game', () => (<MazeGameContainer gameMetadata={gameMetadata} />));
