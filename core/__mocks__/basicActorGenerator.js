/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container } from 'pixi.js';

import componentGenerator from 'core/engines/pixijs/components/componentGenerator';
import positioningFunctionalityBuilder
  from 'core/engines/pixijs/components/functionalities/positioningFunctionalityBuilder';

const basicActorGenerator = (size: number, margin: number) =>
  (view: Container, position: string) => (
    componentGenerator(view, size, margin)
      .addFunctionality('positioning', positioningFunctionalityBuilder(position))
  );

export default basicActorGenerator;
