/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 * @jest-environment node
 */
import React from 'react';
import renderer from 'react-test-renderer';

import 'test/BlocklyMock';
import 'jest-styled-components';

import FourOhFour from './FourOhFour';

describe('CodimoRouter components snapshots', () => {
  it('renders the raw components correctly', () => {
    const fourOhFourTree = renderer.create(
      <FourOhFour
        location={{ pathname: 'testActivity/testLevel/001' }}
      />,
    ).toJSON();

    expect(fourOhFourTree).toMatchSnapshot();
  });
});
