/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container } from 'pixi.js';

import { HALF } from 'core/constants/numbers';
import { type Metadata } from 'core/ui/Activity';
import { actorProcessors } from 'core/engines/pixijs/generics/actorGenerator';
import engineGenerator from 'core/engines/pixijs/engineGenerator';
import emotionResetProcessorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/emotionResetProcessorBuilder';

import hasLeftTheMazeProcessorBuilder from './processors/hasLeftTheMazeProcessorBuilder';
import changeActorOnResetBuilder from './processors/changeActorOnResetBuilder';
import numberGenerator from './components/numberGenerator';
import mazeGenerator from './components/mazeGenerator';
import numericLineGenerator from './components/numericLineGenerator';

/**
 * The NumericLine game engine generator.
 *
 * @version 1.0.0
 * @todo Add link to the metadata shape documentation.
 * @param  {GameDifficulty} difficulty Metadata required by the components.
 * @param  {EngineData}     engineData Metadata required by the components.
 * @return {Engine}                    The new engine.
 */
export default function engine({ difficulty, engineData }: Metadata) {
  const numericLine = numericLineGenerator(engineData);
  const maze = mazeGenerator(engineData);
  const number = numberGenerator(difficulty, maze.view, engineData);

  return actorProcessors(engineData, number, engineGenerator(() => {
    const view = new Container();
    const MARGIN_NUMERIC_LINE_MAZE = engineData.margin + engineData.size / HALF;

    maze.view.y = numericLine.view.height + MARGIN_NUMERIC_LINE_MAZE;

    view.addChild(maze.view, numericLine.view);

    return view;
  }))
      .addExecutionProcessor(
        'hasLeftTheMaze',
        hasLeftTheMazeProcessorBuilder(number, numericLine, engineData),
      )
      .addResetProcessor('numericLineEmotions', emotionResetProcessorBuilder(numericLine))
      .addResetProcessor('changeActor', changeActorOnResetBuilder(number))
      .build();
}
