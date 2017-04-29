/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

declare var __VERSION__: string;
declare var process: {|
  env: {
    [key: string]: ?string,
  },
|};
declare var module: {|
  hot: {|
    accept(dependencies: string | Array<string>, callback: (updatedDependencies: Object) => void): void,
  |},
|};
