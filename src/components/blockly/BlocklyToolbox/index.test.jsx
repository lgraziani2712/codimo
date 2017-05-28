/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 * @jest-environment node
 */
/* eslint-disable no-magic-numbers */
import React from 'react';
import renderer from 'react-test-renderer';

import blockGenerator from './blockGenerators/blockGenerator';
import categoryGenerator from './blockGenerators/categoryGenerator';
import sepGenerator from './blockGenerators/sepGenerator';

import BlocklyToolbox from '.';

describe('BlocklyToolbox', () => {
  it('renders correctly an empty toolbox', () => {
    const tree = renderer.create(
      <BlocklyToolbox elements={[]} handleWorkspaceCreation={() => {}} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  describe('Generators', () => {
    describe('blockGenerator', () => {
      it('renders correctly without children', () => {
        const description = {
          define: 'block',
          type: 'test_block',
        };
        const tree = renderer.create(
          blockGenerator(description, 0),
        ).toJSON();

        expect(tree).toMatchSnapshot();
      });
      xit('renders correctly with children');
    });
  });
  describe('categoryGenerator', () => {
    it('renders correctly without children', () => {
      const description = {
        define: 'category',
        name: 'test_category',
        color: '#deedee',
        expanded: false,
      };
      const tree = renderer.create(
        categoryGenerator(description, 2),
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
  describe('sepGenerator', () => {
    it('renders correctly', () => {
      const description = {
        define: 'sep',
        gaap: 24,
      };
      const tree = renderer.create(
        sepGenerator(description, 3),
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
