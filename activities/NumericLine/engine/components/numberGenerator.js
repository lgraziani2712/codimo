/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container, Text, TextStyle } from 'pixi.js';

import { ZERO, HALF, ANCHOR_CENTER } from 'core/constants/numbers';
import { actorGenerator } from 'core/engines/pixijs/generics/actorGenerator';
import componentGenerator, {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import emotionFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/emotionFunctionalityBuilder';
import { getRandomInt } from 'core/helpers/randomizers';
import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';

import randomizeActorsBuilder from '../../helpers/randomizeActorsBuilder';

import { type EngineData$NumericLineData } from './numericLineGenerator';
import enterToNumericLineFunctionalityBuilder
  from './functionalities/enterToNumericLineFunctionalityBuilder';
import changeActorFunctionalityBuilder
  from './functionalities/changeActorFunctionalityBuilder';

const SIX = 6;
const styleRaw = {
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
  fill: ['#ffffff', '#cccccc'],
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / SIX,
  dropShadowDistance: 3,
};

/**
 * Static generator for the numeric line's numbers.
 *
 * @version 1.0.0
 * @param {number} number The actor shape.
 * @param {number} size Block's size.
 * @param {number} margin Block's margin.
 * @return {CodimoComponent} The new static component.
 */
export const staticNumberGenerator = (
  number: number,
  size: number,
  margin: number,
): CodimoComponent => {
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size + size / SIX,
  });
  const view = new Text(number.toString(), style);

  view.x = view.y = size / HALF;
  /**
   * PixiJS recomendation for better text resolution
   * @see https://github.com/pixijs/pixi.js/wiki/Performance-Tips#text
   */
  view.scale.x = view.scale.y = ANCHOR_CENTER;
  view.anchor.set(ANCHOR_CENTER);

  return componentGenerator(view, size, margin)
    .addFunctionality('emotions', emotionFunctionalityBuilder)
    .build();
};

type EngineData = {
  numericLineData: EngineData$NumericLineData,
  actorExitIdx?: number,
  startPosition: string,
  exits: Array<string>,
  size: number,
  margin: number,
};

/**
 * This is the NumericLine game's actor generator function.
 *
 * @version 1.0.1
 * @param {GameDifficulty} difficulty
 *  Metadata required for the randomizer.
 * @param {Container} initialParent
 *  The component parent required for resetting.
 * @param {EngineData} engineData Exercise metadata.
 * @param {EngineData$NumericLineData} engineData.numericLineData
 *  Metadata required for the randomizer.
 * @param {number} [engineData.actorExitIdx]
 *  Index used with the randomizer result.
 * @param {string} engineData.startPosition Represented by an "x,y" string.
 * @param {Array<string>} engineData.exits
 *  Array of strings with 2D coords as "x,y".
 * @param {number} engineData.size Block's size.
 * @param {number} engineData.margin Block's margin.
 * @return {CodimoComponent} The new actor component.
 */
const numberGenerator = (
  difficulty: GameDifficulty,
  initialParent: Container,
  {
    numericLineData,
    actorExitIdx,
    startPosition,
    exits,
    size,
    margin,
  }: EngineData,
): CodimoComponent => {
  ////////////////////////////////////////////
  // 1. Create the randomizer function
  ////////////////////////////////////////////
  const randomizeActor = randomizeActorsBuilder(difficulty, numericLineData);
  const randomActor = randomizeActor();
  const exitIdx =
    actorExitIdx === undefined
      ? getRandomInt(ZERO, randomActor.length)
      : actorExitIdx;
  ////////////////////////////////////////////
  // 2. Get the actual number and endPosition
  ////////////////////////////////////////////
  const number = randomActor[exitIdx];
  const endPosition = exits[exitIdx];
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size + size / SIX,
  });
  const view = new Text(number.toString(), style);

  /**
   * PixiJS recomendation for better text resolution
   * @see https://github.com/pixijs/pixi.js/wiki/Performance-Tips#text
   */
  view.scale.x = view.scale.y = ANCHOR_CENTER;
  view.anchor.set(ANCHOR_CENTER);

  initialParent.addChild(view);

  return actorGenerator(view, size, margin, startPosition, endPosition)
    .addFunctionality(
      'enterToNumericLine',
      enterToNumericLineFunctionalityBuilder,
    )
    .addFunctionality('changeActor', changeActorFunctionalityBuilder(
      difficulty,
      randomizeActor,
      exitIdx,
    ))
    .build();
};

export default numberGenerator;
