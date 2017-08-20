/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 * @jest-environment node
 */
import React from 'react';
import renderer from 'react-test-renderer';

import 'jest-styled-components';

import FrontPage from './FrontPage';

jest.mock('./pages/requireScreenshots');

describe('Components snapshots', () => {
  it('renders the FrontPage correctly', () => {
    const tree = renderer.create(<FrontPage />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
