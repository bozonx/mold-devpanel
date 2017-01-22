import React, { PropTypes } from 'react';
import _ from 'lodash';

import StructDocument from './StructDocument';


export default class MoldStructure extends React.Component {
  constructor(params) {
    super(params);

    if (!window.appMold) throw new Error(`There isn't window.appMold!`);
    this.mold = window.appMold;

    this.mold.onAnyChange(() => {
      this.setState({storage: this.mold.$getWholeStorageState()});
    });

    // this.state = {
    //   storage: this.mold.$getWholeStorageState(),
    // }
  }

  // TODO: правильней будет пройтись по схеме, тогда можно будет определить документы
  // TODO: подсвечивать несколько секунд последние изменившиеся элементы и их родителей, если они свернуты


  // recursivelyMap(containerOrArray) {
  //   if (_.isPlainObject(containerOrArray)) {
  //     return _.map(containerOrArray, (item, name) => {
  //       if (_.isPlainObject(item) || _.isArray(item)) {
  //         return <div className="mold-devpanel__container" key={name}>
  //           <div className="mold-devpanel__container-name">{name}: </div>
  //           <div className="mold-devpanel__container-children">{this.recursivelyMap(item)}</div>
  //         </div>
  //       }
  //       else {
  //         return this.renderPrimitive(name, item);
  //       }
  //
  //     });
  //   }
  //   else if (_.isArray(containerOrArray)) {
  //     return _.map(containerOrArray, (item, index) => {
  //       return <div key={index}>
  //         <div className="mold-devpanel__container-name">{index}: </div>
  //         <div>{this.recursivelyMap(item)}</div>
  //       </div>
  //     });
  //   }
  // }

  renderPrimitive(name, value) {
    return <div key={name} className="mold-devpanel__primitive">{name}: {value}</div>;
  }

  recursiveSchema(schema, root, name) {
    if (!_.isPlainObject(schema)) return;
    if (schema.type == 'container') {
      return this._renderContainer(schema, root, name);
    }
    else if (schema.type == 'document') {
      // TODO: взять инстанс по пути схемы
      //return <StructDocument />
      return <div>{name} : {root}</div>;
    }
    else if (schema.type == 'documentsCollection') {
      return <div>{name} : {root}</div>;
    }
    // TODO: oteher types
    else {
      return this._proceedPlainObject(schema, root);
    }
  }

  _proceedPlainObject(schema, root) {
    return _.map(schema, (item, itemName) => {
      const newRoot = _.trim(`${root}.${itemName}`, '.');
      return <div key={itemName}>{this.recursiveSchema(item, newRoot, itemName)}</div>;
    });
  }

  _renderContainer(schema, root, name) {
    return <div className="mold-devpanel__container">
      <div className="mold-devpanel__container-name">{name}: </div>
      <div className="mold-devpanel__container-children">
        {this._proceedPlainObject(schema.schema, _.trim(`${root}.schema`, '.'))}
      </div>
    </div>;
  }


  render() {
    return (
      <div id="mold-devpanel__structure">
        {/*{this.recursivelyMap(this.state.storage)}*/}
        {this.recursiveSchema(this.mold.$$schemaManager.getFullSchema(), '')}
      </div>
    );
  }
}
