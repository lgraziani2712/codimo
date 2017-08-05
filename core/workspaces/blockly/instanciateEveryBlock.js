/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import defaultBlockParser from './blocks/defaultBlockParser';

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
 * @param  {string}         activityName A function for loading custom blocks.
 * @param  {GameDifficulty} difficulty   How complex must be the block.
 * @param  {Array<string>}  blockNames   A list of required blocks.
 * @return {Promise<void>}               Calls every instanciation.
 */
export default function instanciateEveryBlock(
  activityName: string,
  difficulty: GameDifficulty,
  blockNames: Array<string>,
) {
  return Promise.all(blockNames.map(instanciateABlock(activityName, difficulty)));
}

const activityBlockInstanciator = (activityName: string, blockName: string) => (import(
  // FIXME @see https://github.com/babel/babel-eslint/issues/507
  /* webpackChunkName: "Activity$Block" */
  // eslint-disable-next-line comma-dangle
  `activities/${activityName}/workspace/blocks/${blockName}.js`
));

const instanciateABlock = (
  activityName: string,
  difficulty: GameDifficulty,
) => {
  if (!activityName) {
    throw new Error('The `activityName` must be declared.');
  }

  /**
   * Instanciate one block required by the activity.
   * Each block instance is stored in `Blockly.Blocks`.
   *
   * @param  {string} blockName      The block's ID.
   * @return {Promise<void | Error>} It loads a BlockBuilder lazily.
   */
  return async (blockName: string) => {
    const blockDefinition: BlockDefinition = await import(
      // FIXME @see https://github.com/babel/babel-eslint/issues/507
      // eslint-disable-next-line comma-dangle
      /* webpackChunkName: "Codimo$Block" */`./blocks/${blockName}`
    ).then(mod => mod.default)
        .catch(() => (
          activityBlockInstanciator(activityName, blockName).then(mod => mod.default)
        ));

    Blockly.Blocks[blockName] = {
      init() {
        blockDefinition.builder(this, difficulty);
      },
    };
    Blockly.JavaScript[blockName] = blockDefinition.parser || defaultBlockParser;
  };
};
