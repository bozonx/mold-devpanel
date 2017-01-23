import React, { PropTypes } from 'react';
import _ from 'lodash';

import StructDocument from './StructDocument';
import StructDocumetsCollection from './StructDocumetsCollection';

import { convertFromSchemaToLodash } from './helpers';


export default class MoldStructure extends React.Component {
  static propTypes = {
    mold: PropTypes.object,
  };

  constructor(props) {
    super(props);

    if (!window.appMold) throw new Error(`There isn't window.appMold!`);

    this.schema = this.props.mold.$$schemaManager.getFullSchema();
    this.storage = this.props.mold.$getWholeStorageState();

    this.props.mold.onAnyChange(() => {
      this.setState({storage: this.props.mold.$getWholeStorageState()});
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
                                                           mold={this.props.mold} />);
    }
    else if (schema.type == 'documentsCollection') {
      return this._renderItemWrapper(name, <StructDocumetsCollection moldPath={convertFromSchemaToLodash(root)}
                                                                     mold={this.props.mold}
                                                                     renderItemWrapper={this._renderItemWrapper} />);
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
