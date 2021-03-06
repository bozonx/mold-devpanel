import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ItemWrapper from '../ItemWrapper';
import Document from './Document';
import DocumentsCollection from './DocumentsCollection';
import PagedCollection from './PagedCollection';
import Collection from './Collection';

import { convertFromSchemaToLodash } from '../helpers';


export default class MoldStructure extends React.Component {
  static propTypes = {
    mold: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.schema = this.props.mold.$$schemaManager.getFullSchema();

    this.state = {
      storage: this.props.mold.$getWholeStorageState(),
    };
  }

  componentWillMount() {
    this.props.mold.onAnyChange(() => {
      this.setState({storage: this.props.mold.$getWholeStorageState()});
    });
  }

  recursiveSchema(schema, root, name) {
    // TODO: сделать универсальный способ подключения, чтобы можно было расширять

    if (!_.isPlainObject(schema)) return;
    if (schema.type == 'container') {
      return this._renderContainer(schema, root, name);
    }
    else if (schema.type == 'document') {
      return <ItemWrapper key={`${root}.${name}`} name={name}>
        <Document moldPath={convertFromSchemaToLodash(root)}
                  mold={this.props.mold} />
      </ItemWrapper>;
    }
    else if (schema.type == 'documentsCollection') {
      return <ItemWrapper key={`${root}.${name}`} name={name}>
        <DocumentsCollection moldPath={convertFromSchemaToLodash(root)}
                             mold={this.props.mold} />
      </ItemWrapper>;
    }
    else if (schema.type == 'pagedCollection') {
      return <ItemWrapper key={`${root}.${name}`} name={name}>
        <PagedCollection moldPath={convertFromSchemaToLodash(root)}
                         mold={this.props.mold} />
      </ItemWrapper>;
    }
    else if (schema.type == 'collection') {
      return <ItemWrapper key={`${root}.${name}`} name={name}>
        <Collection moldPath={convertFromSchemaToLodash(root)}
                    mold={this.props.mold} />
      </ItemWrapper>;
    }
    else if (!schema.type) {
      return this._proceedPlainObject(schema, root);
    }
  }

  _renderContainer(schema, root, name) {
    const otherFields = {};
    const nextLevel = {};
    _.each(schema.schema, (item, itemName) => {
      if (_.includes(['boolean', 'string', 'number'], item.type)) {
        otherFields[itemName] = item;
      }
      else {
        nextLevel[itemName] = item;
      }
    });

    const nextLevelNames = _.keys(nextLevel).sort();

    return <ItemWrapper key={`${root}.${name}`} name={name}>
      {!_.isEmpty(otherFields) &&
        <Document moldPath={convertFromSchemaToLodash(root)}
                        mold={this.props.mold}
                        excludeFields={_.keys(nextLevel)} />
      }
      {_.map(nextLevelNames, (itemName) => {
        return this.recursiveSchema(schema.schema[itemName], `${root}.schema.${itemName}`, itemName);
      })}
    </ItemWrapper>;
  }

  _proceedPlainObject(schema, root) {
    const names = _.keys(schema).sort();
    return _.map(names, (itemName) => {
      const newRoot = _.trim(`${root}.${itemName}`, '.');
      return <div key={itemName}>{this.recursiveSchema(schema[itemName], newRoot, itemName)}</div>;
    });
  }

  render() {
    return (
      <div className="mold-devpanel__structure">
        <div>
          {this.recursiveSchema(this.schema, '')}
        </div>
      </div>
    );
  }
}
