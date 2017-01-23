import React, { PropTypes } from 'react';

export default class TabButton extends React.Component {
  static propTypes = {
    children: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}
