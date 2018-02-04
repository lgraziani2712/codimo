/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { type EngineData } from 'core/engines/pixijs/engineGenerator';

import defaultBlockParser from './blocks/defaultBlockParser';

// FIXME move GameDifficulty to the corresponding module
export type GameDifficulty = 'easy' | 'normal' | 'hard';

export type BlockDefinition = {|
  builder(
    block: Blockly$Block,
    difficulty: GameDifficulty,
    engineData: EngineData,
  ): void;
  parser?: (block: Blockly$Block) => string;
|};

/**
 * Instanciate every block required by the activity.
 *
 * @version 1.1.0
 * @param {string} activityName A function for loading custom blocks.
 * @param {GameDifficulty} difficulty How complex must be the block.
 * @param {Array<string>} blockNames A list of required blocks.
 * @param {EngineData} engineData Metadata used for configuration.
 * @return {Promise<void>} Calls every instanciation.
 */
export default function instanciateEveryBlock(
  activityName: string,
  difficulty: GameDifficulty,
  blockNames: Array<string>,
  engineData: EngineData,
) {
  return Promise.all(blockNames.map(
    instanciateABlock(activityName, difficulty, engineData),
  ));
}

const activityBlockInstanciator = (
  activityName: string,
  blockName: string,
) => (import(
  // FIXME @see https://github.com/babel/babel-eslint/issues/507
  /* webpackChunkName: "Activity$Block" */
  // eslint-disable-next-line comma-dangle
  `activities/${activityName}/workspace/blocks/${blockName}.js`
));

const instanciateABlock = (
  activityName: string,
  difficulty: GameDifficulty,
  engineData: EngineData,
) => {
  if (!activityName) {
    throw new Error('The `activityName` must be declared.');
  }

  /**
   * Instanciate one block required by the activity.
   * Each block instance is stored in `Blockly.Blocks`.
   *
   * @param {string} blockName The block's ID.
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
        // `this` means the block instance.
        blockDefinition.builder(this, difficulty, engineData);
      },
    };
    Blockly.JavaScript[blockName] = blockDefinition.parser || defaultBlockParser;
  };
};
