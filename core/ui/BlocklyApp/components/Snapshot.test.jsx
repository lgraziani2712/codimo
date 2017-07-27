/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';

import 'jest-styled-components';

import ActionBar from './ActionBar';
import Button from './Button';

describe('ui/BlocklyApp/components', () => {
  it('renders the Button correctly', () => {
    const buttonTree = renderer.create(
      <Button handleClick={() => {}} title="I'm a button" type="red" />,
    ).toJSON();

    expect(buttonTree).toMatchSnapshot();
  });
  it('renders the ActionBar correctly', () => {
    const tree = renderer.create(
      <ActionBar
        isExecuting={false}
        isStopped={true}
        handleStartGame={() => {}}
        handleResetGame={() => {}}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
