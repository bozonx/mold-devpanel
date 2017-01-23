import React, { PropTypes } from 'react';
import _ from 'lodash';

import StructDocument from './StructDocument';

import testSchema from './_testSchema';
import { convertFromSchemaToLodash } from './helpers';


export default class MoldStructure extends React.Component {
  constructor(params) {
    super(params);

    if (!window.appMold) throw new Error(`There isn't window.appMold!`);
    this.mold = window.appMold;

    this.mold.onAnyChange(() => {
      this.setState({storage: this.mold.$getWholeStorageState()});
    });

    //this.mold.$$schemaManager.getFullSchema()
    this.schema = testSchema.schema;
    //this.mold.$getWholeStorageState()
    this.storage = testSchema.storage;

    // this.state = {
    //   storage: this.mold.$getWholeStorageState(),
    // }
  }

  // TODO: правильней будет пройтись по схеме, тогда можно будет определить документы
  // TODO: подсвечивать несколько секунд последние изменившиеся элементы и их родителей, если они свернуты

  // TODO: поддержка простых коллекций, pagedCollection

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
      return this._renderItemWrapper(name,
        this._proceedPlainObject(schema.schema, _.trim(`${root}.schema`, '.')));
    }
    else if (schema.type == 'document') {
      return this._renderItemWrapper(name, <StructDocument schema={schema}
                                                           schemaRoot={root}
                                                           name={name}
                                                           fullStorage={this.storage} />);
    }
    else if (schema.type == 'documentsCollection') {
      return this._renderItemWrapper(name, this._renderDocumentsCollection(schema, root, name));
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

  _renderItemWrapper(name, inner) {
    return <div key={name} className="mold-devpanel__container">
      <div className="mold-devpanel__container-name">{name}: </div>
      <div className="mold-devpanel__container-children">
        {inner}
      </div>
    </div>;
  }

  _renderDocumentsCollection(schema, root, name) {
    const storageRoot = convertFromSchemaToLodash(root);
    const collectionStorage = _.get(this.storage, storageRoot);

    return _.map(collectionStorage.action, (action, name) => {
      return this._renderItemWrapper(name, <div>{
        _.map(action, (page, index) => {
          return this._renderItemWrapper(`page${index}`, this._renderCollection(page))})
      }</div>)
    });
  }

  _renderCollection(collection) {
    return _.map(collection, (item, index) => {
      return this._renderItemWrapper(index, <div>1</div>)
    });
  }

  render() {
    return (
      <div id="mold-devpanel__structure">
        {/*{this.recursivelyMap(this.state.storage)}*/}
        <div>
          {this.recursiveSchema(this.schema, '')}
        </div>
      </div>
    );
  }
}
