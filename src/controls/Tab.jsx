import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import storage from '../storage';

export default class Tab extends React.Component {
  static propTypes = {
    children: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.buttons = [];
    this.contents = [];

    _.each(this.props.children, (item) => {
      if (item.type.name == 'TabButton') {
        this.buttons.push(item);
      }
      else if (item.type.name == 'TabContent') this.contents.push(item);
    });

    this.state = {
      current: storage.get('currentTab') || 0,
    };
  }

  handleButtonClick(current) {
    this.setState({current});
    storage.set('currentTab', current);
  }

  render() {
    return <div>
      <div className="mold-devpanel__tab_buttons">
        {_.map(this.buttons, (item, index) =>
          <button className={this.state.current === index && 'mold-devpanel__tab-active'}
                  onClick={() => this.handleButtonClick(index)}>{item}</button>)}
      </div>
      <div>
        {_.map(this.contents, (item, index) =>
          <div className={this.state.current !== index && 'mold-devpanel__hide'}>{item}</div>)}
      </div>
    </div>;
  }
}
