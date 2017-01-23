import React, { PropTypes } from 'react';
import _ from 'lodash';

import ItemWrapper from '../ItemWrapper';
import Document from './Document';
import DocumetsCollection from './DocumetsCollection';

import { convertFromSchemaToLodash } from '../helpers';


export default class MoldStructure extends React.Component {
  static propTypes = {
    mold: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.schema = this.props.mold.$$schemaManager.getFullSchema();
    this.storage = this.props.mold.$getWholeStorageState();

    this.props.mold.onAnyChange(() => {
      this.setState({storage: this.props.mold.$getWholeStorageState()});
    });
  }

  recursiveSchema(schema, root, name) {
    if (!_.isPlainObject(schema)) return;
    if (schema.type == 'container') {
      return this._renderContainer(schema, root, name);
    }
    else if (schema.type == 'document') {
      return <ItemWrapper name={name}>
        <Document moldPath={convertFromSchemaToLodash(root)}
                        mold={this.props.mold} />
      </ItemWrapper>;
    }
    else if (schema.type == 'documentsCollection') {
      return <ItemWrapper name={name}>
        <DocumetsCollection moldPath={convertFromSchemaToLodash(root)}
                                  mold={this.props.mold} />
      </ItemWrapper>;
    }
    // TODO: other types
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

    return <ItemWrapper name={name}>
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
      <div id="mold-devpanel__structure">
        <div>
          {this.recursiveSchema(this.schema, '')}
        </div>
      </div>
    );
  }
}
