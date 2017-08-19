/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import BlocklyToolbox, { type BlocklyToolboxElement } from './BlocklyToolbox';

const Workspace = styled.div`
  height: 520px;
  width: 580px;
`;

type Props = {|
  id: string,
  elements: Array<BlocklyToolboxElement>,
  handleWorkspaceCreation(toolbox: HTMLElement): void,
|};
const BlocklyWorkspace = ({ id, elements, handleWorkspaceCreation }: Props) => (
  <Workspace id={id}>
    <BlocklyToolbox
      elements={elements}
      handleWorkspaceCreation={handleWorkspaceCreation}
    />
  </Workspace>
);

export default BlocklyWorkspace;
