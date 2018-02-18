/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * Welcome where everything begins!
 *
 * @flow
 */
import React from 'react';

import Activity from 'core/ui/Activity';

import helloCodimoEngine from './helloCodimoEngine';
import metadata from './metadata.json';

export default function HelloCodimo() {
  return (
    <Activity
      engine={helloCodimoEngine(metadata)}
      metadata={metadata}
      hasNoEnd={true}
    />
  );
}
