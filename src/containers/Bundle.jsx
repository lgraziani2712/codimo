/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import React from 'react';

type Props = {|
  // FIXME Instead of object must be an ES6 module type definition
  load(): Promise<Object | Array<Object>>,
  children(null | Object | Array<Object>): void,
|};
type State = {|
  mod: any,
|};
class Bundle extends React.Component {
  props: Props;
  state: State;

  componentWillMount() {
    this.load(this.props);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.load === this.props.load) {
      return;
    }
    this.load(nextProps);
  }
  load(props: Props) {
    this.setState({});
    props.load().then((mod) => {
      this.setState(() => ({
        // handle both es imports and cjs
        mod: mod.default || mod,
      }));
    });
  }
  render() {
    return this.props.children(this.state.mod);
  }
}

export default Bundle;
