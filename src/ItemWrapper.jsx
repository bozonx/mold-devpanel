import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

import SwitcherIcon from './controls/SwitcherIcon';


export default class ItemWrapper extends React.Component {
  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hint: PropTypes.string,
    folded: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    //onFoldClick: PropTypes.object,
  };

  // static defaultProps = {
  //   folded: false,
  // };

  constructor(props) {
    super(props);

    this.state = {
      folded: this.props.folded,
      hovered: false,
    };
  }

  handleFoldClick(event) {
    event.preventDefault();
    this.setState({folded: !this.state.folded});
  }

  render() {
    return <div className="mold-devpanel__container">
      <div className="mold-devpanel__container-name"
           onMouseEnter={() => this.setState({hovered: true})}
           onMouseLeave={() => this.setState({hovered: false})}>
        <span>{this.props.name}</span>
        {!_.isEmpty(this.props.children) &&
        <button onClick={::this.handleFoldClick}>
          {(this.state.folded) ?
            <SwitcherIcon icon="arrow-right" />
            :
            <SwitcherIcon icon="arrow-down" />
          }
        </button>
        }
        {this.props.hint && <span className="mold-devpanel__container-hint">{this.props.hint}</span>}
      </div>
      <div className={classnames('mold-devpanel__container-children',
                      {'mold-devpanel__container-children--hovered': this.state.hovered})}>
        {!this.state.folded && this.props.children}
      </div>
    </div>;
  }
}
