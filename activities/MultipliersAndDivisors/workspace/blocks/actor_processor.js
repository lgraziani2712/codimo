/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { CONTAINER } from 'core/constants/colors';
import { type EngineData } from 'core/engines/pixijs/engineGenerator';
import { type GameDifficulty } from 'core/workspaces/blockly/instanciateEveryBlock';

import {
  ACTOR_PROCESS_START,
  ACTOR_PROCESS_STOP,
  ACTOR_PROCESSOR_TITLE,
  ACTOR_PROCESSOR_TOOLTIP,
} from '../../constants';

const MAIN_INPUT = 'program';
const ACTOR_SELECTION = 'actor';

export default {
  builder(
    block: Blockly$Block,
    difficulty: GameDifficulty,
    engineData: EngineData,
  ) {
    const actorsIdx = engineData.actors.map(
      (actor, idx) => [actor.number.toString(), idx.toString()],
    );

    block.appendDummyInput()
      .appendField(ACTOR_PROCESSOR_TITLE)
      .appendField(
        new Blockly.FieldDropdown(actorsIdx),
        ACTOR_SELECTION,
      );
    block.appendStatementInput(MAIN_INPUT);
    block.setColour(CONTAINER);
    block.setTooltip(ACTOR_PROCESSOR_TOOLTIP);
  },
  // TODO Refactor this process making the actor number implicit for the
  // actions from the statement.
  parser(block: Blockly$Block) {
    const actor = block.getFieldValue(ACTOR_SELECTION);
    const rawActions =
      Blockly.JavaScript.statementToCode(block, MAIN_INPUT).split('👇');

    rawActions.pop();

    const actions = rawActions.reduce(
      (actions, action) => `${actions}${action}👋${actor}👇`,
      '',
    );

    return `
      ${ACTOR_PROCESS_START}👋${block.id}👋${actor}👇
      ${actions}
      ${ACTOR_PROCESS_STOP}👋${block.id}👋${actor}👇
    `;
  },
};
