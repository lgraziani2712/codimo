/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/**
 * This wrap the webpack require.context functionality
 *
 * @return {Array<Module>} The matches images URLs
 */
export default function requireScreenshots() {
  // $FlowDoNotDisturb This is a webpack feature
  const requireContext = require.context(
    '../../images/screenshots',
    false,
    /^\.\/.*\.png$/,
  );

  return requireContext.keys().map(requireContext);
}
