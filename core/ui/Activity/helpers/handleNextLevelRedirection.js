/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import swal from 'sweetalert2';

import { ONE, THREE } from 'core/constants/numbers';
import gameTextUI from 'core/constants/localize/es/gameTextUI';

/**
 * This is in charge of redirect to the next
 * exercise in case it exists one.
 * If not, it announce the level completeness.
 *
 * @version 1.0.0
 * @param {string} activityName The activity name.
 * @param {string} difficulty The difficulty.
 * @param {Object} location The react-router location object.
 * @param {Object} history The react-router history object.
 * @return {Promise<void>} The sweetalert promise.
 */
const handleNextLevelRedirection = (
  activityName: string,
  difficulty: string,
  location: Object,
  history: Object,
) => (): Promise<void> => {
  const level = parseInt(location.pathname.split('/').pop());
  const stringLvl = (level + ONE).toString().padStart(THREE, '0');
  const path = `/${activityName}/${difficulty}/${stringLvl}`;

  return swal(gameTextUI.successMessage).then(() => {
    history.push(path);
  }, () => {
    history.push(path);
  });
};

export default handleNextLevelRedirection;
