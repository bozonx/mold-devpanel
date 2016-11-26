import React, { PropTypes } from 'react';

export default class SwitcherIcon extends React.Component {
  render() {
    return (
      <div id="mold-devpanel-switcher">
        {this.props.icon == 'open' && <span>&lsaquo;</span>}
        {this.props.icon == 'close' && <span>&rsaquo;</span>}
      </div>
    );
  }
}
