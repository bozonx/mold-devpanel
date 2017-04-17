import React from 'react';
import PropTypes from 'prop-types';

export default class TabContent extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}
