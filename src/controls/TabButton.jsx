import React from 'react';
import PropTypes from 'prop-types';

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
