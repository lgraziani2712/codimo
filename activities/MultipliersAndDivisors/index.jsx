/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import Activity, { type Metadata } from 'core/ui/Activity';

import engine from './engine';
import wp1 from './images/numbers-wp1.jpg';
import wp2 from './images/numbers-wp2.jpg';
import wp3 from './images/numbers-wp3.jpg';
import wp4 from './images/numbers-wp4.jpg';
import wp5 from './images/numbers-wp5.jpg';

type Props = {|
  metadata: Metadata,
|};
export default function MultipliersAndDivisors({ metadata }: Props) {
  return (
    <Activity
      backgroundImages={[wp1, wp2, wp3, wp4, wp5]}
      engine={engine(metadata)}
      metadata={metadata}
    />
  );
}
