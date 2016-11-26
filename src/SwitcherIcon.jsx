import React, { PropTypes } from 'react';

export default class SwitcherIcon extends React.Component {
  render() {
    return (
      <div id="mold-devpanel-switcher">
        {this.props.icon == 'open' && '&lsaquo;'}
        {this.props.icon == 'close' && '&rsaquo;'}
      </div>
    );
  }
}
