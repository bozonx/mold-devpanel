import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class MoldStructure extends React.Component {
  constructor(params) {
    super(params);

    if (!window.appMold) throw new Error(`There isn't window.appMold!`);
    this.mold = window.appMold;

    this.mold.onAnyUpdate(() => {
      this.setState({storage: this.mold.$getWholeStorageState()});
    });

    this.state = {
      storage: this.mold.$getWholeStorageState(),
    }
  }

  // TODO: правильней будет пройтись по схеме, тогда можно будет определить документы
  // TODO: отсортировать примитивы вверх
  // TODO: отсортировать по алфавиту
  // TODO: поумолчанию прятать примитивы, начинающиеся на _
  // TODO: подсвечивать несколько секунд последние изменившиеся элементы и их родителей, если они свернуты


  recursivelyMap(containerOrArray) {
    if (_.isPlainObject(containerOrArray)) {
      return _.map(containerOrArray, (item, name) => {
        if (_.isPlainObject(item) || _.isArray(item)) {
          return <div className="mold-devpanel__container" key={name}>
            <div className="mold-devpanel__container-name">{name}: </div>
            <div className="mold-devpanel__container-children">{this.recursivelyMap(item)}</div>
          </div>
        }
        else {
          return this.renderPrimitive(name, item);
        }

      });
    }
    else if (_.isArray(containerOrArray)) {
      return _.map(containerOrArray, (item, index) => {
        return <div key={index}>
          <div className="mold-devpanel__container-name">{index}: </div>
          <div>{this.recursivelyMap(item)}</div>
        </div>
      });
    }
  }

  renderPrimitive(name, value) {
    return <div key={name} className="mold-devpanel__primitive">{name}: {value}</div>;
  }

  render() {
    return (
      <div id="mold-devpanel__structure">
        {this.recursivelyMap(this.state.storage)}
      </div>
    );
  }
}
