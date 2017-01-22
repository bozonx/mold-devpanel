import React, { PropTypes } from 'react';

export default class TabContent extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };

  constructor(params) {
    super(params);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
