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
 * This is the MultipliersAndDivisors  game's actor generator function.
 *
 * @version 1.0.0
 * @param {GameDifficulty} difficulty Metadata required for the randomizer.
 * @param {Container} initialParent The component parent required for resetting.
 * @returns {CodimoComponent} The new actor component.
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
    .build();
};

export default numberGenerator;
