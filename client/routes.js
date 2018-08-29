/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Codimo$Route } from 'core/ui/CodimoRouter';
import gameTextUI from 'core/constants/localize/es/gameTextUI';

const routes: Array<Codimo$Route> = [
  {
    activityName: 'NumericLine',
    difficulty: 'easy',
    title: gameTextUI.difficulty.easy,
    children: [
      {
        title: `${gameTextUI.levels[0]} ${gameTextUI.exercise}`,
        path: '001',
      },
      {
        title: `${gameTextUI.levels[1]} ${gameTextUI.exercise}`,
        path: '002',
      },
      {
        title: `${gameTextUI.levels[2]} ${gameTextUI.exercise}`,
        path: '003',
      },
      {
        title: `${gameTextUI.levels[3]} ${gameTextUI.exercise}`,
        path: '004',
      },
      {
        title: `${gameTextUI.levels[4]} ${gameTextUI.exercise}`,
        path: '005',
      },
      {
        title: `${gameTextUI.levels[5]} ${gameTextUI.exercise}`,
        path: '006',
      },
    ],
  },
  {
    activityName: 'NumericLine',
    difficulty: 'normal',
    title: gameTextUI.difficulty.normal,
    children: [
      {
        title: `${gameTextUI.levels[0]} ${gameTextUI.exercise}`,
        path: '001',
      },
      {
        title: `${gameTextUI.levels[1]} ${gameTextUI.exercise}`,
        path: '002',
      },
      {
        title: `${gameTextUI.levels[2]} ${gameTextUI.exercise}`,
        path: '003',
      },
      {
        title: `${gameTextUI.levels[3]} ${gameTextUI.exercise}`,
        path: '004',
      },
      {
        title: `${gameTextUI.levels[4]} ${gameTextUI.exercise}`,
        path: '005',
      },
    ],
  },
  {
    activityName: 'NumericLine',
    difficulty: 'hard',
    title: gameTextUI.difficulty.hard,
    children: [
      {
        title: `${gameTextUI.levels[0]} ${gameTextUI.exercise}`,
        path: '001',
      },
      {
        title: `${gameTextUI.levels[1]} ${gameTextUI.exercise}`,
        path: '002',
      },
    ],
  },
  {
    activityName: 'MultipliersAndDivisors',
    difficulty: 'easy',
    title: 'Uno de múltiplos',
    children: [
      {
        title: `${gameTextUI.levels[0]} ${gameTextUI.exercise}`,
        path: '001',
      },
    ],
  },
  {
    activityName: 'MultipliersAndDivisors',
    difficulty: 'normal',
    title: 'Uno de divisores',
    children: [
      {
        title: `${gameTextUI.levels[0]} ${gameTextUI.exercise}`,
        path: '001',
      },
    ],
  },
];

export default routes;
