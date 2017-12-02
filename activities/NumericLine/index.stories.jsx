/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from 'test/storybook-facades';

import level from './levels/hard/001.json';
import normalBloklyData from './levels/hard/blocklyData.json';

import NumericLine from '.';

const metadata = {
  activityName: 'NumericLine',
  ...level,
  blocklyData: normalBloklyData,
};

storiesOf('NumericLine', module)
  .add('First normal game', () => (
    <MemoryRouter>
      <NumericLine metadata={metadata} />
    </MemoryRouter>
  ));
