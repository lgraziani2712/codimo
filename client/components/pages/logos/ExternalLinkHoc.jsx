/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

const SvgIcon = styled.svg`
  height: 22px;
  position: relative;
  vertical-align: middle;

  & path {
    fill: rgba(0, 0, 0, 0.6);
  }

  a:hover > & path {
    fill: rgba(0, 0, 0, 0.7);
  }
`;

type Props = {|
  desc: string,
  label: string,
  link: string,
  path: string,
  viewBox: string,
|};
const ExternalLinkHoc = ({ desc, label, link, path, viewBox }: Props) => (
  <a href={link} target="_blank">
    <SvgIcon
      aria-labelledby={label}
      role="img"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={label}>{desc}</title>
      <path d={path} />
    </SvgIcon>
  </a>
);

export default ExternalLinkHoc;
