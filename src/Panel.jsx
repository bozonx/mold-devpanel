import React, { PropTypes } from 'react';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);

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
