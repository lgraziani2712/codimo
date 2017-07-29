/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * Welcome where everything starts!
 *
 * @flow
 */
import React from 'react';

import AppLoader from 'core/ui/AppLoader';

import helloCodimoEngine from './helloCodimoEngine';
import level from './level.json';

export default function HelloCodimo() {
  return (
    <AppLoader
      backgroundImages={[]}
      engine={helloCodimoEngine(level)}
      metadata={level}
    />
  );
}
