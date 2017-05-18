/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

function importAll(req) {
  req.keys().forEach(req);
}

// $FlowDoNotDisturb is a webpack function
importAll(require.context('./', true, /\.js$/));
