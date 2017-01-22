import React, { PropTypes } from 'react';

export default class TabButton extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };

  constructor(params) {
    super(params);
  }

  render() {
    return <button>{this.props.children}</button>;
  }
}
