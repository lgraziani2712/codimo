/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';

import activityLoader from '.';

storiesOf('ui/CodimoRouter/activityLoader', module)
  .add('Load HelloCodimo asynchronously', () => {
    const ActivityLoader = activityLoader('HelloCodimo');

    return <ActivityLoader />;
  })
  .add('Load NumericLine/easy/001 asynchronously', () => {
    const ActivityLoader = activityLoader('NumericLine', 'easy', '001');

    return <ActivityLoader />;
  });
