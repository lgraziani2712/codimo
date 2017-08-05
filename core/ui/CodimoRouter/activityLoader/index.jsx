/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * FIXME comma-dangle eslint on dynamic import
 *
 * @flow
 */
import React from 'react';
import loadable from 'react-loadable';

import Loading from './Loading';

/**
 * It loads an Activity asynchronously. While is waiting for it, it
 * shows the `<Loading />` component.
 *
 * If the difficulty is set, then the level must to. And when they are
 * set it means the activity has more than one level. This adds the
 * activity's metadata to the loader.
 *
 * @version 1.0.0
 * @param  {string} activityName      Which activity are you loading?
 * @param  {string} [difficulty]      With what difficulty?
 * @param  {string} [level]           And which level?
 * @return {React$Element<Activity>}  The Activity instance.
 */
const activityLoader = (activityName: string, difficulty?: string, level?: string) => {
  const loader = {};

  loader.Activity = () => import(
    // eslint-disable-next-line comma-dangle
    /* webpackChunkName: "Actvity$Component" */`activities/${activityName}/index.jsx`
  );

  if (difficulty) {
    if (!level) {
      throw new Error('Level parameter is undefined when difficulty one it isn\'t.');
    }

    loader.blocklyData = () => import(
      /* webpackChunkName: "Actvity$BlocklyData" */
      // eslint-disable-next-line comma-dangle
      `activities/${activityName}/levels/${difficulty}/blocklyData.json`
    );
    loader.metadata = () => import(
      /* webpackChunkName: "Actvity$Metadata" */
      // eslint-disable-next-line comma-dangle
      `activities/${activityName}/levels/${difficulty}/${level}.json`
    );
  }

  return loadable.Map({
    loader,
    loading: Loading,
    render(loaded) {
      const Activity = loaded.Activity.default;
      let metadata;

      if (loaded.metadata) {
        metadata = {
          activityName,
          ...loaded.metadata,
          blocklyData: loaded.blocklyData,
        };
      }

      return <Activity metadata={metadata} />;
    },
  });
};

export default activityLoader;
