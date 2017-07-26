/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import defaultBlockParser from './blocks/defaultBlockParser';

import './blocks/action_container';

// FIXME move GameDifficulty to the corresponding module
export type GameDifficulty = 'easy' | 'normal' | 'hard';

export type BlockDefinition = {|
  builder(block: Blockly$Block, difficulty: GameDifficulty): void;
  parser?: (block: Blockly$Block) => string;
|};

/**
 * Instanciate every block required by the activity.
 *
 * @version 1.0.0
 * @param  {GameDifficulty} difficulty How complex must be the block
 * @param  {Array<string>}  blockNames A list of required blocks
 * @return {Promise<void | Error>}     Calls every instanciation.
 */
export default function instanciateEveryBlock(
  difficulty: GameDifficulty,
  blockNames: Array<string>,
) {
  return Promise.all(blockNames.map(instanciateABlock(difficulty)));
}

const instanciateABlock = (difficulty: GameDifficulty) =>
  /**
   * Instanciate one block required by the activity.
   * Each block instance is stored in `Blockly.Blocks`.
   *
   * @param  {string} blockName      The block name that will be used as ID.
   * @return {Promise<void | Error>} It loads a BlockBuilder lazily.
   */
  async (blockName: string) => {
    const blockDefinition: BlockDefinition = await import(
      /* webpackChunkName: "Blockly$Block" */`./blocks/${blockName}`);

    Blockly.Blocks[blockName] = {
      init() {
        blockDefinition.builder(this, difficulty);
      },
    };
    Blockly.JavaScript[blockName] = blockDefinition.parser || defaultBlockParser;
  };
