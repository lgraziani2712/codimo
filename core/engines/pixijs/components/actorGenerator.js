/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container } from 'pixi.js';

import componentGenerator from './componentGenerator';
import positioningFunctionalityBuilder from './functionalities/positioningFunctionalityBuilder';
import hitTheWallFunctionalityBuilder from './functionalities/hitTheWallFunctionalityBuilder';

const actorGenerator = (size: number, margin: number) =>
  (view: Container, position: string) => (
    componentGenerator(view, size, margin)
        .addFunctionality('positioning', positioningFunctionalityBuilder(position))
        .addFunctionality('hitTheWall', hitTheWallFunctionalityBuilder())
  );

export default actorGenerator;
