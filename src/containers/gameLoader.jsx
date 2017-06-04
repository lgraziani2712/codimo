/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

import Loading from 'components/pages/Loading';
import Bundle from 'containers/Bundle';
import { upperFirst } from 'helpers/strings';

const gameLoader = (game: string, level: string) => {
  const GameBundle = () => (
    <Bundle
      load={() => Promise.all([
        import(/* webpackChunkName: "GameContainer" */`containers/${upperFirst(game)}GameContainer`),
        import(/* webpackChunkName: "blocklyData" */`test/games/${game}/blocklyData.json`),
        import(/* webpackChunkName: "gameMetadata" */`test/games/${game}/${level}.json`),
      ])}
    >
      {(data?: Array<mixed>) => {
        if (!data) {
          return <Loading />;
        }
        const [GameContainer, blocklyData, gameMetadata] = data;

        return <GameContainer.default blocklyData={blocklyData} gameMetadata={gameMetadata} />;
      }}
    </Bundle>
  );

  return GameBundle;
};

export default gameLoader;
