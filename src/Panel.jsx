import React, { PropTypes } from 'react';

export default class Panel extends React.Component {
  constructor(params) {
    super(params);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div id="mold-devpanel">
        <div id="mold-devpanel-inner">
          {this.props.children}
        </div>
      </div>
    );
  }
}
