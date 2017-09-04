/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 */
import 'babel-polyfill';

import { configure } from '@storybook/react';

let req;

if (process.env.STORYBOOK_FOLDER === 'activities') {
  req = require.context('../activities', true, /\.stories\.jsx$/);
}
if (process.env.STORYBOOK_FOLDER === 'core') {
  req = require.context('../core', true, /\.stories\.jsx$/);
}
if (process.env.STORYBOOK_FOLDER === 'client') {
  req = require.context('../client', true, /\.stories\.jsx$/);
}

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
