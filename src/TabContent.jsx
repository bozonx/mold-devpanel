import React, { PropTypes } from 'react';

export default class TabContent extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };

  constructor(params) {
    super(params);
  }

  render() {
    return this.props.children;
  }
}
