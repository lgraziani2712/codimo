/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';

import level from './levels/normal/001.json';
import normalBloklyData from './levels/normal/blocklyData.json';

import NumericLine from '.';

const metadata = {
  activityName: 'NumericLine',
  ...level,
  blocklyData: normalBloklyData,
};

storiesOf('NumericLine', module)
    .add('First normal game', () => (
      <NumericLine metadata={metadata} />
    ));
