/**
 * @author Luciano Graziani @lgraziani2712
 *
 */
import 'babel-polyfill';

import { configure } from '@storybook/react';

const req = require.context('../src', true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
