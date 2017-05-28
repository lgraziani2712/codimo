/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const Bar = styled.div`
  align-items: center;
  background-color: #e3e3e3;
  border: 1px solid #ddd;
  border-bottom: 0;
  display: flex;
  height: 68px;
  width: 628px;
  & * {
    margin: 0 0 0 10px;
  }
`;

type Props = {|
  isExecuting: boolean,
  isStopped: boolean,
  handleStartGame(): void,
  handleResetGame(): void,
|};
// FIXME hardcoded title
const ActionBar = ({ isExecuting, isStopped, handleStartGame, handleResetGame }: Props) => (
  <Bar>
    {isStopped ?
      <Button
        title="▶ Dale play!"
        type="green"
        handleClick={handleStartGame}
      /> :
      <Button
        disabled={isExecuting}
        title="⏹ Reseteá!"
        type="orange"
        handleClick={handleResetGame}
      />
    }
  </Bar>
);

export default ActionBar;
