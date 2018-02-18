/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import { ZERO, FOUR } from 'core/constants/numbers';
import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';

import platformBlockGenerator from './platformBlockGenerator';

const UNUSED_TINT = 0x0;
const SIZE = 100;
const MARGIN = 20;
const POS_ZERO = '0,0';

storiesOf('MultipliersAndDivisors/engine/components/platformBlockGenerator', module)
  .add('Setting the portal platform', () => {
    const platform = platformBlockGenerator(
      UNUSED_TINT,
      SIZE,
      MARGIN,
      POS_ZERO,
    )(ZERO, ZERO);

    platform.view.x = platform.view.y = MARGIN;

    return (
      <PixiWrapper
        isContainer={false}
        component={platform.view}
        height={SIZE + MARGIN * FOUR}
        width={SIZE + MARGIN * FOUR}
      />
    );
  });
