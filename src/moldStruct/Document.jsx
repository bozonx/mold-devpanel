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

    this.instance = this.props.mold.child(this.props.moldPath);
    this.storage = (this.props.storage) ? this.props.storage : this.instance.mold;
  }

  // TODO: не рисовать поля в excludeFields
  // TODO: сортировка параметров по имени
  // TODO: помечать элементы из схемы, левые, ro и несохраняемые

  renderRecursive(data, name, level) {
    level = level || 0;
    if (_.isPlainObject(data) && level > 0) {
      return <ul>
        {_.map(data, (item, itemName) => <li key={itemName}>
          <div>
            <div className="mold-devpanel__document_label">{name}: </div>
            <div className="mold-devpanel__document_next-level">
              {this.renderRecursive(item, itemName, level + 1)}
            </div>
          </div>
        </li>)}
      </ul>;
    }
    else if (_.isPlainObject(data)) {
      return <ul>
        {_.map(data, (item, itemName) => <li key={itemName}>
          {this.renderRecursive(item, itemName, level + 1)}
        </li>)}
      </ul>;
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


  render() {
    return (
      <div className="mold-devpanel__document">
        {_.isEmpty(this.storage) ?
          <div className="mold-devpanel__document_value-wrapper mold-devpanel__document_no-data">No data.</div>
        :
          this.renderRecursive(this.storage)
        }
      </div>
    );
  }
}
