/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { game } from 'constants/localize/es';

export type RouteDescription = {|
  game: string,
  exact: boolean,
  title: string,
  children: Array<{|
    title: string,
    path: string,
  |}>,
|};
const routes: Array<RouteDescription> = [{
  exact: true,
  game: 'maze',
  title: game.difficulty.easy,
  children: [{
    title: `${game.levels[0]} ${game.exercise}`,
    path: 'easy/001',
  }, {
    title: `${game.levels[1]} ${game.exercise}`,
    path: 'easy/002',
  }, {
    title: `${game.levels[2]} ${game.exercise}`,
    path: 'easy/003',
  }, {
    title: `${game.levels[3]} ${game.exercise}`,
    path: 'easy/004',
  }],
}, {
  exact: true,
  game: 'maze',
  title: game.difficulty.normal,
  children: [{
    title: `${game.levels[0]} ${game.exercise}`,
    path: 'normal/001',
  }, {
    title: `${game.levels[1]} ${game.exercise}`,
    path: 'normal/002',
  }, {
    title: `${game.levels[2]} ${game.exercise}`,
    path: 'normal/003',
  }],
}];

export default routes;
