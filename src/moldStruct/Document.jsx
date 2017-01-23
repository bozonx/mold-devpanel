import React, { PropTypes } from 'react';
import _ from 'lodash';


export default class Document extends React.Component {
  static propTypes = {
    moldPath: PropTypes.string,
    mold: PropTypes.object,
    storage: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      names: [],
    };

    this.instance = this.props.mold.child(this.props.moldPath);
    this.storage = (this.props.storage) ? this.props.storage : this.instance.mold;
  }

  componentWillMount() {
    this._updateNames();
  }

  _updateNames() {
    const names = [];

    _.each(this.storage, (item, name) => {
      names.push(name);
    });

    // TODO: сортировка параметров по имени
    // TODO: отсортировать примитивы вверх
    // TODO: отсортировать по алфавиту

    this.setState({names});
  }

  // TODO: поумолчанию прятать примитивы, начинающиеся на _
  // TODO: ???? поддержка большой вложенности
  // TODO: помечать элементы из схемы, левые, ro и несохраняемые

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
      return value;
    }
  }

  render() {
    return (
      <div className="mold-devpanel__document">
        <ul>
          {_.map(this.state.names, (name) => <li key={name}>
            <div className="mold-devpanel__document_label">{name}: </div>
            <div className="mold-devpanel__document_value">
              {this._renderValue(this.storage[name])}
            </div>
          </li>)}
        </ul>
      </div>
    );
  }
}
