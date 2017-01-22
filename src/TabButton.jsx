import React, { PropTypes } from 'react';

export default class TabButton extends React.Component {
  static propTypes = {
    children: PropTypes.string,
  };

  constructor(params) {
    super(params);
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}
