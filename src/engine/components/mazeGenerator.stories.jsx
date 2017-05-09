/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import wait from 'speculation/wait';

import { storiesOf } from 'test/storybook-facades';
import PixiWrapper from 'test/PixiWrapper';
import gameMetadataDataWithoutBlocks from 'test/gameMetadataDataWithoutBlocks.json';
import { TEN } from 'constants/numbers';

import mazeGenerator from './mazeGenerator';
import numberGenerator from './numberGenerator';

const WIDTH = 1200;
const HEIGHT = 620;
const { mazeData } = gameMetadataDataWithoutBlocks;

mazeData.path = new Map(mazeData.path);

const basicMaze = mazeGenerator(mazeData);
const simpleNumberMaze = mazeGenerator(mazeData);
const number = numberGenerator(-TEN, mazeData.accesses[0], mazeData.exits[0], mazeData.size, mazeData.margin);

storiesOf('engine.components.Maze', module)
  .add('basic Maze', () => (
    <PixiWrapper component={basicMaze.view} isContainer={true} height={HEIGHT} width={WIDTH} />
  ))
  .add('one moving number Maze', () => {
    simpleNumberMaze.view.addChild(number.view);

    (async () => {
      await wait(1000); // eslint-disable-line no-magic-numbers
      for (let i = 1; i < mazeData.path.length; i++) {
        await number.updatePosition(mazeData.path[i]);
      }
      await wait(2000); // eslint-disable-line no-magic-numbers
      number.resetPosition();
    })();

    return (
      <PixiWrapper component={simpleNumberMaze.view} isContainer={true} height={HEIGHT} width={WIDTH} />
    );
  });
