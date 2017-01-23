import React, { PropTypes } from 'react';
import _ from 'lodash';


export default class Document extends React.Component {
  static propTypes = {
    moldPath: PropTypes.string,
    mold: PropTypes.object,
    storage: PropTypes.object,
    excludeFields: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.oddFields = ['$index', '$pageIndex', '$parent', '$url', '_id', '_rev'];

    this.instance = this.props.mold.child(this.props.moldPath);
    this.storage = (this.props.storage) ? this.props.storage : this.instance.mold;

    this.state = {
      showOdd: false,
    }
  }

  sort(allNames) {
    let filteredNames = _.difference(allNames, this.props.excludeFields);

    if (!this.state.showOdd) {
      filteredNames = _.difference(allNames, this.oddFields);
    }

    filteredNames.sort();

    return filteredNames;
  }

  renderRecursive(data, name, level) {
    level = level || 0;
    if (_.isPlainObject(data)) {
      const names = this.sort(_.keys(data));

      if (level > 0) {
        return <ul>
          {_.map(names, (itemName) => <li key={itemName}>
            <div>
              <div className="mold-devpanel__document_label">{name}: </div>
              <div className="mold-devpanel__document_next-level">
                {this.renderRecursive(data[itemName], itemName, level + 1)}
              </div>
            </div>
          </li>)}
        </ul>;
      }
      else {
        return <ul>
          {_.map(names, (itemName) => <li key={itemName}>
            {this.renderRecursive(data[itemName], itemName, level + 1)}
          </li>)}
        </ul>;
      }
    }
    else {
      return <div className="mold-devpanel__document_value-wrapper">
        <div className="mold-devpanel__document_label">{name}: </div>
        <div>
          {this._renderValue(data)}
        </div>
      </div>;
    }
  }

  _renderValue(value) {
    if (_.isBoolean(value)) {
      return <span className="mold-devpanel__type-boolean">{value}</span>;
    }
    else if (_.isNumber(value)) {
      return <span className="mold-devpanel__type-number">{value}</span>;
    }
    else if (_.isString(value)) {
      return <span className="mold-devpanel__type-string">"
        {_.truncate(value, {length: 25})}
        "</span>;
    }
    else {
      return JSON.stringify(value);
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
            <a href=""
               className="mold-devpanel__document_odd-swither"
               onClick={::this.handleShowAllClick}>
              {(this.state.showOdd) ? 'Hide odd' : 'Show all'}
            </a>
          </div>
        }
      </div>
    );
  }
}
