import React, { PropTypes } from 'react';

export default class SwitcherIcon extends React.Component {
  render() {
    return (
      <div className="mold-devpanel-switcher">
        {this.props.icon == 'arrow-left' && <span>&lsaquo;</span>}
        {this.props.icon == 'arrow-right' && <span>&rsaquo;</span>}
        {this.props.icon == 'arrow-down' && <span>v</span>}
      </div>
    );
  }
}
