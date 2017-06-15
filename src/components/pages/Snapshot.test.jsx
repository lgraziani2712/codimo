/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 * @jest-environment node
 */
import React from 'react';
import {
  MemoryRouter as Router,
} from 'react-router-dom';
import renderer from 'react-test-renderer';

import 'test/BlocklyMock';
import 'jest-styled-components';

import CodimoLink from './logos/CodimoLink';
import FooterLink from './links/FooterLink';
import GithubLink from './logos/GithubLink';
import RawContentContainer from './RawContentContainer';
import MenuBar from './MenuBar';
import PageContainer from './PageContainer';
import Loading from './Loading';

describe('Components snapshots', () => {
  it('renders the links correctly', () => {
    const footerLinkTree = renderer.create(
      <FooterLink href="http://helloworld.test" text="Hello dear" />,
    ).toJSON();
    const codimoLinkTree = renderer.create(<Router><CodimoLink /></Router>).toJSON();
    const githubLinkTree = renderer.create(<GithubLink />).toJSON();

    expect(footerLinkTree).toMatchStyledComponentsSnapshot();
    expect(codimoLinkTree).toMatchStyledComponentsSnapshot();
    expect(githubLinkTree).toMatchStyledComponentsSnapshot();
  });
  it('renders the raw components correctly', () => {
    const rawContentContainerTree = renderer.create(<RawContentContainer />).toJSON();

    expect(rawContentContainerTree).toMatchStyledComponentsSnapshot();
  });
  it('renders the Loading correctly', () => {
    const tree = renderer.create(<Loading />).toJSON();

    expect(tree).toMatchStyledComponentsSnapshot();
  });
  it('renders the MenuBar correctly', () => {
    const tree = renderer.create(<Router><MenuBar routes={[]} /></Router>).toJSON();

    expect(tree).toMatchStyledComponentsSnapshot();
  });
  it('renders the PageContainer correctly', () => {
    const tree = renderer.create(<PageContainer />).toJSON();

    expect(tree).toMatchStyledComponentsSnapshot();
  });
});
