import React, { PropTypes } from 'react';
import _ from 'lodash';

import { renderValue } from '../helpers';


export default class Document extends React.Component {
  static propTypes = {
    moldPath: PropTypes.string,
    mold: PropTypes.object,
    storage: PropTypes.object,
    excludeFields: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.oddFields = ['$id', '$index', '$pageIndex', '$parent', '$url', '$loading', '_id', '_rev'];

    this.instance = this.props.mold.child(this.props.moldPath);
    this.storage = (this.props.storage) ? this.props.storage : this.instance.mold;

    this.state = {
      showOdd: false,
    }
  }

  exclude(allNames) {
    let toExclude = (this.props.excludeFields) ? _.clone(this.props.excludeFields) : [];
    if (!this.state.showOdd) {
      toExclude = toExclude.concat(this.oddFields);
    }

    return _.difference(allNames, toExclude);
  }

  _isAnyHidden(allNames) {
    return !_.isEmpty(_.intersection(allNames, this.oddFields));
  }

  renderRecursive(data, name, level) {
    level = level || 0;
    if (_.isPlainObject(data)) {
      const names = this.exclude(_.keys(data));
      names.sort();

      if (level > 0) {
        return <div>
            <ul>
            {_.map(names, (itemName) => <li key={itemName}>
              <div>
                <div className="mold-devpanel__document_label">{name}: </div>
                <div className="mold-devpanel__document_next-level">
                  {this.renderRecursive(data[itemName], itemName, level + 1)}
                </div>
              </div>
            </li>)}
          </ul>
        </div>;
      }
      else {
        return <div>
          <ul>
            {_.map(names, (itemName) => <li key={itemName}>
              {this.renderRecursive(data[itemName], itemName, level + 1)}
            </li>)}
          </ul>
          {this._isAnyHidden(_.keys(data)) &&
            <a href="" className="mold-devpanel__document_odd-swither"
               onClick={::this.handleShowAllClick}>
              {(this.state.showOdd) ? 'Hide odd' : 'Show all'}
            </a>
          }
        </div>;
      }
    }
    else {
      return <div className="mold-devpanel__document_value-wrapper">
        <div className="mold-devpanel__document_label">{name}: </div>
        <div>
          {renderValue(data)}
        </div>
      </div>;
    }
  }

  handleShowAllClick(event) {
    event.preventDefault();
    this.setState({showOdd: !this.state.showOdd});
  }


  render() {
    return (
      <div className="mold-devpanel__document">
        {_.isEmpty(this.storage) ?
          <div className="mold-devpanel__document_value-wrapper mold-devpanel__document_no-data">
            No data.</div>
        :
          <div>
            {this.renderRecursive(this.storage)}
          </div>
        }
      </div>
    );
  }
}
