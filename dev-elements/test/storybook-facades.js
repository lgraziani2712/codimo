/**
 * @author Luciano Graziani @lgraziani2712
 *
 * @flow
 */
// $FlowDoNotDisturb internal jest module
import expectReal from 'jest-matchers';

export {
  storiesOf,
  action,
  linkTo,
} from '@kadira/storybook';

export {
  specs,
  describe,
  it,
  beforeEach,
  before,
  after,
  afterEach,
  xit,
  fit,
  xdescribe,
} from 'storybook-addon-specifications';

export const expect = expectReal;
