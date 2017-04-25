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
import { TEN } from 'constants/numbers';

import mazeGenerator from './mazeGenerator';
import mazeData from './mazeData.json';
import numberGenerator from './numberGenerator';

const WIDTH = 960;
const HEIGHT = 448;
const NUMBER_SIZE = 64;
const basicMaze = mazeGenerator(mazeData);
const simpleNumberMaze = mazeGenerator(mazeData);
const number = numberGenerator(-TEN, mazeData.accesses[0], NUMBER_SIZE);

storiesOf('engine.components.Maze', module)
  .add('basic Maze', () => (<PixiWrapper component={basicMaze} height={HEIGHT} width={WIDTH} />))
  .add('one moving number Maze', () => {
    simpleNumberMaze.addChild(number.view);

    (async () => {
      for (let i = 1; i < mazeData.path.length; i++) {
        await number.updatePosition(mazeData.path[i]);
      }
      await wait(2000); // eslint-disable-line no-magic-numbers
      number.resetPosition();
    })();

    return <PixiWrapper component={simpleNumberMaze} height={HEIGHT} width={WIDTH} />;
  });
