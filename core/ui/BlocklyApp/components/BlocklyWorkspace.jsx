/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import GrabURL from '../images/grab.png';
import GrabbingURL from '../images/grabbing.png';
import GrabbingNotURL from '../images/grabbing-not.png';

import BlocklyToolbox, { type BlocklyToolboxElement } from './BlocklyToolbox';

const Workspace = styled.div`
  height: 520px;
  width: 500px;

  & .blocklyTrash {
    opacity: 1 !important;
  }

  & .blocklyZoom > image {
    opacity: 1;
  }

  & .blocklyDraggable {
    cursor: url(${GrabURL}) 15 5, auto;

    &.blocklyDragging {
      cursor: url(${GrabbingURL}) 15 5, auto;

      &.blocklyDraggingDelete {
        cursor: url(${GrabbingNotURL}) 15 5, auto;
      }
    }
  }

  & .blocklyScrollbarBackground {
    &:hover + .blocklyScrollbarHandle {
      fill: rgba(80, 80, 80, 0.75);
    }
  }

  & .blocklyScrollbarHandle {
    fill: rgba(100, 100, 100, 0.75);

    &:hover {
      fill: rgba(80, 80, 80, 0.75);
    }

    &:active {
      fill: rgba(60, 60, 60, 0.75);
    }
  }
`;

type Props = {|
  id: string,
  elements: Array<BlocklyToolboxElement>,
  handleWorkspaceCreation(toolbox: HTMLElement): void,
|};
/**
 * It contains the Blockly UI definition.
 *
 * @version 1.0.1
 * @param {string} id Element ID.
 * @param {Array<BlocklyToolboxElement>} elements JSON blocks definition.
 * @param {Function} handleWorkspaceCreation Blockly instantiation callback.
 * @return {React$Element} Blockly workspace.
 */
const BlocklyWorkspace = ({ id, elements, handleWorkspaceCreation }: Props) => (
  <Workspace id={id}>
    <BlocklyToolbox
      elements={elements}
      handleWorkspaceCreation={handleWorkspaceCreation}
    />
  </Workspace>
);

export default BlocklyWorkspace;
