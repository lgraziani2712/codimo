/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';

import 'jest-styled-components';

import BackgroundImage from './BackgroundImage';
import TwoColumns from './TwoColumns';

describe('ui/Activity/components', () => {
  it('renders <BackgroundImage /> correctly', () => {
    const buttonTree = renderer.create(
      <BackgroundImage image="/test.png" />,
    ).toJSON();

    expect(buttonTree).toMatchSnapshot();
  });
  it('renders <TwoColumns /> correctly', () => {
    const tree = renderer.create(<TwoColumns />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
