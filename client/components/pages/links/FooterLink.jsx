/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: snow;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: #dadada;
    text-decoration: underline;
  }
`;

type Props = {|
  href: string,
  text: string,
|};
const FooterLink = ({ href, text }: Props) => (
  <Link href={href} target="_blank">{text}</Link>
);

export default FooterLink;
