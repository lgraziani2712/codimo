/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { storiesOf } from 'test/storybook-facades';

import HelloCodimo from '.';

storiesOf('HelloWorld', module)
    .add('Hello World!', () => (
      <HelloCodimo />
    ));
