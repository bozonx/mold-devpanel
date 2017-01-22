import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Tab extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };

  constructor(params) {
    super(params);

    this.buttons = [];
    this.contents = [];

    _.each(this.props.children, (item) => {
      if (item.type.name == 'TabButton') this.buttons.push(item);
      else if (item.type.name == 'TabContent') this.contents.push(item);
    })
  }

  render() {
    return (
      <div>
        <div>
          {_.map(this.buttons, (item) => <span>{item}</span>)}
        </div>
        <div>
          {_.map(this.contents, (item) => <span>{item}</span>)}
        </div>
      </div>
    );
  }
}
