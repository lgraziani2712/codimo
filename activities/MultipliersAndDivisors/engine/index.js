/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { HALF, TWO } from 'core/constants/numbers';
import { type Metadata } from 'core/ui/Activity';
import engineGenerator from 'core/engines/pixijs/engineGenerator';
import processorGenerator from 'core/engines/pixijs/engineGenerator/processors/processorGenerator';
import {
  positioningProcessorBuilder,
  positionResetProcessorBuilder,
} from 'core/engines/pixijs/engineGenerator/processors/positioningProcessorBuilder';
import emotionResetProcessorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/emotionResetProcessorBuilder';
import theFallenOneResetProcessorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/theFallenOneResetProcessorBuilder';
import hasHitAWallBuilder
  from 'core/engines/pixijs/engineGenerator/processors/checkers/hasHitAWallBuilder';
import hasBecomeTheFallenOneBuilder
  from 'core/engines/pixijs/engineGenerator/processors/checkers/hasBecomeTheFallenOneBuilder';

import numericLineGenerator from './components/numericLineGenerator';
import mazeGenerator from './components/mazeGenerator';
import actorsContainer from './components/actorsContainer';
import hasLeftTheMazeProcessorBuilder from './processors/hasLeftTheMazeProcessorBuilder';
import actorProcessStartProcessor from './processors/actorProcessStartProcessor';
import actorProcessEndProcessor from './processors/actorProcessEndProcessor';
import actorProcessBeforeStartChecker from './processors/actorProcessBeforeStartChecker';
import allNumbersInOrderBeforeEndChecker from './processors/allNumbersInOrderBeforeEndChecker';
import atLeastOneNumberInTheLineBeforeEndChecker
  from './processors/atLeastOneNumberInTheLineBeforeEndChecker';
import resetActorsFromNumericLine from './processors/resetActorsFromNumericLine';

/**
 * The MultipliersAndDivisors game engine generator.
 *
 * @version 1.0.0
 * @todo Add link to the metadata shape documentation.
 * @param {Metadata} metadata The activity specific information.
 * @param {GameDifficulty} metadata.difficulty
 *  Metadata required by the components.
 * @param {EngineData} metadata.engineData
 *  Metadata required by the components.
 * @return {Engine} The new engine.
 */
export default function engine({ difficulty, engineData }: Metadata) {
  const view = new Container();
  const numericLine = numericLineGenerator(engineData);
  const maze = mazeGenerator(engineData);
  const actorsLine = actorsContainer(
    difficulty,
    engineData,
    maze.platformBlock(),
  );
  const MARGIN_MAZE = engineData.margin + engineData.size / HALF;

  maze.view.y = numericLine.view.height + MARGIN_MAZE;
  actorsLine.view.y = maze.view.height + numericLine.view.height + MARGIN_MAZE * TWO;

  view.addChild(actorsLine.view, maze.view, numericLine.view);

  return engineGenerator(view)
    .addPreExecutionChecker(
      'actorProcessBeforeStart',
      actorProcessBeforeStartChecker,
    )
    ////////////////////////////
    // Execution Processors
    ////////////////////////////
    .addExecutionProcessor(
      'positioning',
      processorGenerator(
        engineData,
        actorsLine.actors(),
        positioningProcessorBuilder,
      )
        .addChecker('hasHitAWall', hasHitAWallBuilder)
        .addChecker('theFallenOne', hasBecomeTheFallenOneBuilder)
        .build(),
    )
    .addExecutionProcessor(
      'actorProcessStart',
      processorGenerator(
        engineData,
        actorsLine,
        actorProcessStartProcessor,
      ).build(),
    )
    .addExecutionProcessor(
      'actorProcessStop',
      actorProcessEndProcessor(actorsLine.actors()),
    )
    ////////////////////////////
    // Will Stop Checkers
    ////////////////////////////
    .addWillStopExecutionChecker(
      'atLeastOneNumberInTheLine',
      atLeastOneNumberInTheLineBeforeEndChecker(numericLine),
    )
    .addWillStopExecutionChecker(
      'allNumbersInOrder',
      allNumbersInOrderBeforeEndChecker(numericLine),
    )
    ////////////////////////////
    // Reset Processors
    ////////////////////////////
    .addResetProcessor(
      'theFallenOne',
      theFallenOneResetProcessorBuilder(actorsLine.actors()),
    )
    .addResetProcessor(
      'positioning',
      positionResetProcessorBuilder(actorsLine.actors()),
    )
    .addExecutionProcessor(
      'hasLeftTheMaze',
      hasLeftTheMazeProcessorBuilder(
        actorsLine.actors(),
        numericLine,
        engineData,
      ),
    )
    .addResetProcessor(
      'numericLineEmotions',
      emotionResetProcessorBuilder(numericLine),
    )
    .addResetProcessor(
      'resetActorsFromNumericLine',
      resetActorsFromNumericLine(numericLine),
    )
    .build();
}
