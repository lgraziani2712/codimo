/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/**
 * It's a wrapper for the Webpack feature require.context.
 *
 * @version 1.0.0
 * @param  {string}  base               The root folder to start searching.
 * @param  {boolean} scanSubDirectories Flag to tell if the sub directories
 *                                      need to be scanned.
 * @param  {RegExp}  regExp             The file filter used on the search.
 * @return {Array<Module>}              The matched modules.
 */
export default function loadModulesFromContext(
  base: string = '.',
  scanSubDirectories: boolean = false,
  regExp: RegExp = /\.js$/,
) {
  // $FlowDoNotDisturb This is a webpack feature
  const requireContext = require.context(base, scanSubDirectories, regExp);

  return requireContext.keys().map(requireContext);
}
