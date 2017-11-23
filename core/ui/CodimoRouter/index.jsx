/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import activityLoader from './activityLoader';
import FourOhFour from './components/FourOhFour';

export type Codimo$Route = {|
  activityName: string,
  difficulty?: 'easy' | 'normal' | 'hard',
  title: string,
  children?: Array<{|
    path: string,
    title: string,
  |}>,
|};

type CodimoRouter$Props = {|
  routes: Array<Codimo$Route>,
|};

/**
 * This component is responsible for loading asynchronously the required
 * activity.
 *
 * @version 1.1.0
 * @param  {CodimoRouter$Props} routes A list of description of a Route.
 * @constructor
 */
export default function CodimoRouter({ routes }: CodimoRouter$Props) {
  return (
    <Switch path="/:activity/:difficulty/:level">
      {routes.map((route) => {
        if (!route.children) {
          const path = `/${route.activityName}`;

          return (
            <Route
              key={path}
              path={path}
              exact={true}
              component={activityLoader(route.activityName)}
            />
          );
        }

        return route.children.map((child) => {
          if (!route.difficulty) {
            throw new Error(
              // eslint-disable-next-line max-len
              `The activity ${route.activityName} requires to add the difficulty to the metadata definition.`,
            );
          }
          const path = `/${route.activityName}/${route.difficulty}/${child.path}`;

          return (
            <Route
              key={path}
              path={path}
              exact={true}
              component={activityLoader(route.activityName, route.difficulty, child.path)}
            />
          );
        });
      })}
      {/*
        * 404 for levels. This means the game has ended.
        * TODO 404 for levels needs a proper refactor.
        */}
      <Route path="/:activity/:difficulty/:level" component={FourOhFour} />
    </Switch>
  );
}
