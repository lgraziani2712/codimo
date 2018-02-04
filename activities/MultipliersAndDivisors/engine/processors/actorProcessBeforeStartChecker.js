/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

import { ONE } from 'core/constants/numbers';
import parseEmoji from 'core/helpers/parseEmoji';
import { type Instructions } from 'core/workspaces/blockly/parseInstructions';
import {
  type PreExecutionChecker,
  type HighlightBlockHandler,
} from 'core/engines/pixijs/engineGenerator';
import engineErrorBuilder
  from 'core/engines/pixijs/engineGenerator/processors/checkers/engineErrorBuilder';

import { ACTOR_PROCESS_START } from '../../constants';
import TrashMeURL from '../../images/trash-me.mp4';
import ChangeMeURL from '../../images/change-me.mp4';

const multipleButSameActorError = engineErrorBuilder(
  'MultipleButSameActorError',
  {
    title: parseEmoji('DOS BLOQUES VERDES MUEVEN EL MISMO NÚMERO'),
    html: parseEmoji(`
      <p>CAMBIÁ EL <b>NÚMERO</b> DE UNO DE LOS <b>BLOQUES VERDES</b></p>
      <video src="${ChangeMeURL}" autoplay loop></video>
      <p>O <b>TIRÁ A LA BASURA</b> UNO</p>
      <video src="${TrashMeURL}" autoplay loop></video>
    `),
  },
);

/**
 * Verifies if there are more than one `ACTOR_PROCESS_START` instruction
 * with the same actor index.
 *
 * @version 1.0.0
 * @param {Instructions} instructions
 *  An array of fresh instructions to be validated.
 * @param {HighlightBlockHandler} handleHighlightBlock
 *  The function used to highlight the invalid blocks.
 * @return {PreExecutionChecker} The new checker.
 */
const actorProcessBeforeStartChecker: PreExecutionChecker = (
  instructions: Instructions,
  handleHighlightBlock: HighlightBlockHandler,
) => {
  let flag = false;
  const actorProcesses = instructions.reduce((processes, instruction) => {
    if (instruction.key !== ACTOR_PROCESS_START) {
      return processes;
    }
    const processInfo = processes[instruction.params[0]] || {
      cant: 0,
      block: '',
    };

    processInfo.cant++;
    processInfo.block = instruction.id;

    processes[instruction.params[0]] = processInfo;

    return processes;
  }, {});

  Object.keys(actorProcesses).forEach(idx => {
    if (actorProcesses[idx].cant > ONE) {
      handleHighlightBlock(actorProcesses[idx].block);

      flag = true;
    }
  });

  if (flag) {
    throw multipleButSameActorError;
  }
};

export default actorProcessBeforeStartChecker;
