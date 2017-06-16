/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { game } from 'constants/localize/es';

export type RouteDescription = {|
  difficulty: 'easy' | 'normal' | 'hard',
  exact: boolean,
  game: string,
  title: string,
  children: Array<{|
    title: string,
    path: string,
  |}>,
|};
const routes: Array<RouteDescription> = [{
  exact: true,
  game: 'maze',
  difficulty: 'easy',
  title: game.difficulty.easy,
  children: [{
    title: `${game.levels[0]} ${game.exercise}`,
    path: '001',
  }, {
    title: `${game.levels[1]} ${game.exercise}`,
    path: '002',
  }, {
    title: `${game.levels[2]} ${game.exercise}`,
    path: '003',
  }, {
    title: `${game.levels[3]} ${game.exercise}`,
    path: '004',
  }],
}, {
  exact: true,
  game: 'maze',
  difficulty: 'normal',
  title: game.difficulty.normal,
  children: [{
    title: `${game.levels[0]} ${game.exercise}`,
    path: '001',
  }, {
    title: `${game.levels[1]} ${game.exercise}`,
    path: '002',
  }, {
    title: `${game.levels[2]} ${game.exercise}`,
    path: '003',
  }],
}, {
  exact: true,
  game: 'maze',
  difficulty: 'hard',
  title: game.difficulty.hard,
  children: [{
    title: `${game.levels[0]} ${game.exercise}`,
    path: '001',
  }, {
    title: `${game.levels[1]} ${game.exercise}`,
    path: '002',
  }],
}];

export default routes;
