/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from 'test/storybook-facades';

import level from './levels/easy/001.json';
import easyBloklyData from './levels/easy/blocklyData.json';

import MultipliersAndDivisors from '.';

const metadata = {
  activityName: 'MultipliersAndDivisors',
  ...level,
  blocklyData: easyBloklyData,
};

storiesOf('MultipliersAndDivisors', module)
  .add('First easy game', () => (
    <MemoryRouter>
      <MultipliersAndDivisors metadata={metadata} />
    </MemoryRouter>
  ));
