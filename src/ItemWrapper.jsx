import React, { PropTypes } from 'react';

export default class ItemWrapper extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="mold-devpanel__container">
      <div className="mold-devpanel__container-name">{this.props.name}: </div>
      <div className="mold-devpanel__container-children">
        {this.props.children}
      </div>
    </div>;
  }
}
