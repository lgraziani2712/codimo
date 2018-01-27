/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, */
import React from 'react';
import wait from 'speculation/wait';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import { MOVE_FORWARD } from 'core/constants/instructions';

import multipliersMetadata from '../__mocks__/multipliersMetadata';
import { OPEN_PORTAL, LEAVE_MAZE } from '../constants';

import engine from '.';

const MOVE_FORWARD_MOCK = {
  id: '1',
  key: MOVE_FORWARD,
  params: ['4', '3'],
};
const OPEN_PORTAL_MOCK = {
  id: '2',
  key: OPEN_PORTAL,
  params: ['3'],
};
const LEAVE_MAZE_MOCK = {
  id: '3',
  key: LEAVE_MAZE,
  params: ['3'],
};
const WIDTH = multipliersMetadata.engineData.canvas.width;
const HEIGHT = multipliersMetadata.engineData.canvas.height;

storiesOf('MultipliersAndDivisors/engine', module)
  .add('it renders', () => {
    const basicEngine = engine(multipliersMetadata);

    const instructions = [
      OPEN_PORTAL_MOCK,
      MOVE_FORWARD_MOCK,
      LEAVE_MAZE_MOCK,
    ];

    (async () => {
      await wait(1000);
      await basicEngine.excecuteSetOfInstructions(instructions, () => {});
    })();

    return (
      <PixiWrapper
        component={basicEngine.view}
        isContainer={true}
        height={HEIGHT}
        width={WIDTH}
      />
    );
  });
