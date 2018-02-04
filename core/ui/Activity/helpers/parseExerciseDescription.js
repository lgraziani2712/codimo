/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

import parseEmoji from 'core/helpers/parseEmoji';

import { type SwalObject } from '../';

export default function parseExerciseDescription(
  exerciseDescription: SwalObject,
): SwalObject {
  return {
    ...exerciseDescription,
    title: parseEmoji(exerciseDescription.title),
    html: parseEmoji(exerciseDescription.html),
  };
}
