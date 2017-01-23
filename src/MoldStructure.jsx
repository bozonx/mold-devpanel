import React, { PropTypes } from 'react';
import _ from 'lodash';

import StructDocument from './StructDocument';

import testSchema from './_testSchema';
import { convertFromSchemaToLodash } from './helpers';


export default class MoldStructure extends React.Component {
  constructor(params) {
    super(params);

    if (!window.appMold) throw new Error(`There isn't window.appMold!`);

    // TODO: use real
    //this.mold = window.appMold;
    //this.mold.$$schemaManager.getFullSchema()
    //this.mold.$getWholeStorageState()

    this.schema = testSchema.schema;
    this.storage = testSchema.storage;
    this.mold = require('../libs/mold').default({}, this.schema);
    this.mold.$setWholeStorageState(this.storage);


    this.mold.onAnyChange(() => {
      this.setState({storage: this.mold.$getWholeStorageState()});
    });

    // this.state = {
    //   storage: this.mold.$getWholeStorageState(),
    // }
  }

  recursiveSchema(schema, root, name) {
    if (!_.isPlainObject(schema)) return;
    if (schema.type == 'container') {
      return this._renderItemWrapper(name,
        this._proceedPlainObject(schema.schema, _.trim(`${root}.schema`, '.')));
    }
    else if (schema.type == 'document') {
      return this._renderItemWrapper(name, <StructDocument moldPath={convertFromSchemaToLodash(root)}
                                                           mold={this.mold} />);
    }
    else if (schema.type == 'documentsCollection') {
      return this._renderItemWrapper(name, this._renderDocumentsCollection(schema, root, name));
    }
    // TODO: other types
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
