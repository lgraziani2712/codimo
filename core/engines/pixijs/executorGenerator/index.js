/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

export type Instructions = Array<string>;
export type Executor = {|
  addBlockExecutor(blockName: string): void,
  parseInstructions(code: string): Instructions,
|};
