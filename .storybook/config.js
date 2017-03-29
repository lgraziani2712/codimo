/**
 * @author Luciano Graziani @lgraziani2712
 *
 */
import { configure } from '@kadira/storybook';

const req = require.context('../src', true, /\.stories\.jsx$/);

function loadStories() {
  // require('globalStyles');
  req.keys().forEach(req);
}

configure(loadStories, module);
