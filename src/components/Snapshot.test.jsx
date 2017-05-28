/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 * @jest-environment node
 */
import React from 'react';
import renderer from 'react-test-renderer';

import FrontPage from './FrontPage';
import GameContainer from './GameContainer';

describe('Components snapshots', () => {
  it('renders the FrontPage correctly', () => {
    const tree = renderer.create(<FrontPage />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('renders the GameContainer correctly', () => {
    const tree = renderer.create(<GameContainer image="/images/test-url.jpg" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
