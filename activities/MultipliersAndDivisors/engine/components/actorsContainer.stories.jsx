/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/* eslint-disable no-magic-numbers, */
import React from 'react';
import { Container } from 'pixi.js';

import { storiesOf, action } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';

import metadata from '../../__mocks__/metadata';

import platformBlockGenerator from './platformBlockGenerator';
import actorsContainer from './actorsContainer';

const { difficulty, engineData } = metadata;
const WIDTH = engineData.canvas.width;
const HEIGHT = 300;
const openingThePortalEvent = action('Opening the portal');
const resetEvent = action('Reseting everything');

storiesOf('MultipliersAndDivisors/engine/components/actorsContainer', module)
  .add('it renders', () => {
    const view = new Container();
    const platform =
      platformBlockGenerator(0x0, engineData.size, engineData.margin)(0, 0);
    const actors = actorsContainer(difficulty, engineData, platform);

    platform.view.x = 20;
    platform.view.y = engineData.size * 2;

    view.addChild(actors.view, platform.view);

    return [
      <PixiWrapper
        key={1}
        component={view}
        isContainer={true}
        height={HEIGHT}
        width={WIDTH}
      />,
      <button
        key={2}
        onClick={(evt) => {
          openingThePortalEvent(evt);

          actors.openThePortal(1);
        }}
      >{'Open the portal'}</button>,
      <button
        key={3}
        onClick={(evt) => {
          resetEvent(evt);

          actors.resetAllActors();
        }}
      >{'Reset'}</button>,
    ];
  });
