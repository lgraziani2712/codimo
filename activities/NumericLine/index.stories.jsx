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
import hardBloklyData from './levels/hard/blocklyData.json';

import NumericLine from '.';

const metadata = {
  activityName: 'NumericLine',
  ...level,
  blocklyData: hardBloklyData,
};

storiesOf('NumericLine', module)
  .add('First hard game', () => (
    <MemoryRouter>
      <NumericLine metadata={metadata} />
    </MemoryRouter>
  ));
