/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container, Text, TextStyle } from 'pixi.js';

import { ANCHOR_CENTER } from 'core/constants/numbers';
import {
  actorGenerator,
} from 'core/engines/pixijs/generics/actorGenerator';
import {
  type CodimoComponent,
} from 'core/engines/pixijs/components/componentGenerator';
import {
  type GameDifficulty,
} from 'core/workspaces/blockly/instanciateEveryBlock';

import openThePortalBuilder from './functionalities/openThePortalBuilder';
import enterToNumericLineBuilder from './functionalities/enterToNumericLineBuilder';

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

type NumberMetadata = {
  number: number,
  startPosition: string,
  endPosition: string,
  size: number,
  margin: number,
};

/**
 * This is the MultipliersAndDivisors game's actor generator function.
 *
 * @version 1.1.0
 * @param {GameDifficulty} difficulty Metadata required for the randomizer.
 * @param {Container} initialParent The component parent required for resetting.
 * @param {NumberMetadata} metadata Required information.
 * @param {Number} metadata.number Which number represents this actor?
 * @param {String} metadata.startPosition In which block appears?
 * @param {String} metadata.endPosition Which position on the Numeric Line  is the correct?
 * @param {Number} metadata.size Used by functionalities and for component representation.
 * @param {Number} metadata.margin Used by functionalities and for component representation.
 * @return {CodimoComponent} The new actor component.
 */
const numberGenerator = (
  difficulty: GameDifficulty,
  initialParent: Container,
  { number, startPosition, endPosition, size, margin }: NumberMetadata,
): CodimoComponent => {
  const style = new TextStyle({
    ...styleRaw,
    fontSize: size + size / SIX,
  });
  const view = new Text(number.toString(), style);

  view.scale.x = view.scale.y = ANCHOR_CENTER;
  view.anchor.set(ANCHOR_CENTER);

  initialParent.addChild(view);

  return actorGenerator(view, size, margin, startPosition, endPosition)
    .addFunctionality('openThePortal', openThePortalBuilder)
    .addFunctionality('enterToNumericLine', enterToNumericLineBuilder)
    .build();
};

export default numberGenerator;
