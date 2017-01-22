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
      if (item.type.name == 'TabButton') {
        this.buttons.push(item);
      }
      else if (item.type.name == 'TabContent') this.contents.push(item);
    });

    this.state = {
      current: 0,
    };
  }

  handleButtonClick(current) {
    this.setState({current});
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
