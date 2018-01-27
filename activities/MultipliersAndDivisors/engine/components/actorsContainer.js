/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { Container, Graphics } from 'pixi.js';

import { ZERO, ONE, HALF } from 'core/constants/numbers';
import componentGenerator, {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';

import containerFunctionalitiesBuilder from './functionalities/containerFunctionalitiesBuilder';
import numberGenerator from './numberGenerator';

const CONTAINER_BG_COLOR = 0x5cb85c;
const NUMERIC_LINE_NUMBER_BG_COLOR = 0x990044;
const NUMERIC_LINE_NUMBER_BG_ALPHA = 0.4;
const NUMERIC_LINE_NUMBER_CONTAINER_BG_ALPHA = 0;

/**
 * Contains the possible actors for the exercise.
 *
 * @version 1.0.0
 * @todo Add link to the metadata shape documentation.
 * @todo Make it Generator compliant.
 * @param {GameDifficulty} difficulty Exercise difficulty.
 * @param {Object} engineData The metadata required by the maze.
 * @param {CodimoComponent} portalPlatform The component to teleport the numbers.
 * @return {CodimoComponent} The new static component.
 */
const actorsContainer = (
  difficulty: GameDifficulty,
  engineData: Object,
  portalPlatform: CodimoComponent,
): CodimoComponent => {
  // Verify the metadata contains the required parameters.
  if (!(engineData.actors instanceof Array)) {
    throw new Error(
      '`actorsContainer` component requires `engineData.actors` ' +
      'to be an Array. See blablabla for its documentation.',
    );
  }
  if (engineData.actors.length === ZERO) {
    throw new Error(
      '`engineData.actors` needs to have at least one object.',
    );
  }
  const sizeAndMargin = engineData.size + engineData.margin;
  const view = new Graphics();
  const container = new Container();
  const width =
    engineData.width * engineData.size
      + (engineData.width + ONE) * engineData.margin;
  const height = engineData.size + (engineData.margin + engineData.margin);
  const numbers = [];

  view.addChild(container);

  view
    .beginFill(CONTAINER_BG_COLOR)
    .drawRect(ZERO, ZERO, width, height)
    .endFill();

  view.x = engineData.size - engineData.margin;

  engineData.actors.forEach((actorData, i) => {
    const actorContainer = new Graphics();
    const square = new Graphics();

    // This container allows the number to be correctly centered
    actorContainer
      .beginFill(ZERO, NUMERIC_LINE_NUMBER_CONTAINER_BG_ALPHA)
      .drawRect(ZERO, ZERO, sizeAndMargin, sizeAndMargin)
      .endFill();
    actorContainer.x = i * sizeAndMargin - engineData.margin;

    square
      .beginFill(NUMERIC_LINE_NUMBER_BG_COLOR, NUMERIC_LINE_NUMBER_BG_ALPHA)
      .drawRect(ZERO, ZERO, engineData.size, engineData.size)
      .endFill();

    square.x = square.y = engineData.margin;

    actorContainer.addChild(square);

    const number = numberGenerator(difficulty, actorContainer, {
      ...actorData,
      size: engineData.size,
      margin: engineData.margin,
    });

    numbers.push(number);

    container.addChild(actorContainer);
  });

  container.pivot.x = container.width / HALF;
  container.x = width / HALF;

  return componentGenerator(view, engineData.size, engineData.margin)
    .addFunctionality(
      'containerFunctionalities',
      containerFunctionalitiesBuilder(numbers, portalPlatform),
    )
    .build();
};

export default actorsContainer;
