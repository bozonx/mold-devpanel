import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class StructDocument extends React.Component {
  static propTypes = {
    documentMold: PropTypes.object,
    documentSchema: PropTypes.object,
  };

  constructor(params) {
    super(params);

    this.state = {
      names: [],
    };
  }

  componentWillMount() {
    this._updateNames();
  }

  _updateNames() {
    const names = [];
    _.each(this.props.documentMold, (item, name) => {
      names.push(name);
    });

    // TODO: сортировка параметров по имени
    // TODO: отсортировать примитивы вверх
    // TODO: отсортировать по алфавиту

    this.setState(names);
  }

  // TODO: поумолчанию прятать примитивы, начинающиеся на _
  // TODO: ???? поддержка большой вложенности
  // TODO: помечать элементы из схемы, левые, ro и несохраняемые

  render() {
    return (
      <div>
        <ul>
          {_.map(this.state.names, (name) => <li>
            <label>{name}</label>
            <div>
              {this.props.documentMold[name]}
            </div>
          </li>)}
        </ul>
      </div>
    );
  }
}
