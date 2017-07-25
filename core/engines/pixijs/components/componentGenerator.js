/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type Container } from 'pixi.js';

import { ANCHOR_CENTER } from 'core/constants/numbers';

type Functionality = Object;
export type CodimoComponent = {
  view: Container,

  [key: string]: any,
};
export type FunctionalityBuilder = (
  size: number,
  margin: number,
  component: CodimoComponent,
) => Functionality;
export type Generator = {|
  addFunctionality(key: string, functionality: FunctionalityBuilder): Generator,
  build(): CodimoComponent,
|};

/**
 * This generator creates components with functionalities.
 *
 * @todo Add example
 * @version 1.0.0
 * @param  {Container} view   A PixiJS Container.
 * @param  {number}    size   Códimo's block size.
 * @param  {number}    margin Códimo's block margin.
 * @return {Generator}        The component generator object for
 *                            this specific `view`.
 */
export default function componentGenerator(
  view: Container,
  size: number,
  margin: number,
): Generator {
  const functionalities = new Map();

  return {
    /**
     * Sets a `functionality` into a Map collection on `key`.
     * This makes replacement easy: pass a new function with the same
     * `key` as the one you want to replace.
     *
     * @param {string}               key           Unique key.
     * @param {FunctionalityBuilder} functionality A new animation or action for
     *                                             the component.
     * @return {Generator}                         This allow chaining calls.
     */
    addFunctionality(key: string, functionality: FunctionalityBuilder): Generator {
      functionalities.set(key, functionality);

      return this;
    },
    /**
     * It instanciate every functionality and adds it to the component
     * object.
     *
     * Also sets some default props to the view.
     *
     * @return {CodimoComponent} A component with a set of functionalities
     */
    build() {
      const functionalityValues = functionalities.values();
      let component = {
        view,
      };

      view.width = view.height = size;

      // TODO I don't know if is OK to have this here
      // anchor is only available on Sprite family objects
      if (view.anchor) {
        view.anchor.set(ANCHOR_CENTER);
      }

      for (const functionality of functionalityValues) {
        component = {
          ...component,
          ...functionality(size, margin, component),
        };
      }

      return component;
    },
  };
}
