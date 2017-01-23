import React, { PropTypes } from 'react';

import SwitcherIcon from './controls/SwitcherIcon';


export default class ItemWrapper extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    folded: PropTypes.bool,
    children: PropTypes.object,
  };

  // static defaultProps = {
  //   folded: false,
  // };

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="mold-devpanel__container">
      <div className="mold-devpanel__container-name">
        {this.props.name}
        <button>
          {(this.props.folded) ?
            <SwitcherIcon icon="arrow-left" />
            :
            <SwitcherIcon icon="arrow-down" />
          }
        </button>
      </div>
      <div className="mold-devpanel__container-children">
        {this.props.children}
      </div>
    </div>;
  }
}
