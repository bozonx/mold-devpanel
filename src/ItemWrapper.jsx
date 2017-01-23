import React, { PropTypes } from 'react';

import SwitcherIcon from './controls/SwitcherIcon';


export default class ItemWrapper extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    folded: PropTypes.bool,
    children: PropTypes.object,
    //onFoldClick: PropTypes.object,
  };

  // static defaultProps = {
  //   folded: false,
  // };

  constructor(props) {
    super(props);

    this.state = {
      folded: this.props.folded,
    }
  }

  handleFoldClick(event) {
    event.preventDefault();
    this.setState({folded: !this.state.folded});
  }

  render() {
    return <div className="mold-devpanel__container">
      <div className="mold-devpanel__container-name">
        {this.props.name}
        <button onClick={::this.handleFoldClick}>
          {(this.state.folded) ?
            <SwitcherIcon icon="arrow-left" />
            :
            <SwitcherIcon icon="arrow-down" />
          }
        </button>
      </div>
      <div className="mold-devpanel__container-children">
        {!this.state.folded && this.props.children}
      </div>
    </div>;
  }
}
