import React, { PropTypes } from 'react';
import _ from 'lodash';

import ItemWrapper from '../ItemWrapper';


export default class SchemaStructure extends React.Component {
  static propTypes = {
    mold: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.schema = this.props.mold.$$schemaManager.getFullSchema();
    this.storage = this.props.mold.$getWholeStorageState();
  }

  recursiveSchema(schema, root, name) {
    if (!_.isPlainObject(schema)) return;
    if (_.includes(['container', 'document'], schema.type)) {
      return this._renderContainer(schema, root, name);
    }
    else if (_.includes(['documentsCollection', 'pagedCollection', 'collection'], schema.type)) {
      return this._renderDocumentsCollection(schema, root, name);
    }
    else if (!schema.type) {
      return this._proceedPlainObject(schema, root);
    }
  }

  _proceedPlainObject(schema, root) {
    const names = _.keys(schema).sort();
    return _.map(names, (itemName) => {
      const newRoot = _.trim(`${root}.${itemName}`, '.');
      return <div key={itemName}>{this.recursiveSchema(schema[itemName], newRoot, itemName)}</div>;
    });
  }

  _renderDocumentsCollection(schema, root, name) {
    return <ItemWrapper name={name} hint={schema.type}>
      {this.recursiveSchema(schema.item, `${root}.item`, 'item')}
    </ItemWrapper>;
  }

  _renderContainer(schema, root, name) {
    const names = _.keys(schema.schema).sort();

    return <ItemWrapper name={name}>
      {_.map(names, (itemName) => {
        if (_.includes(['string', 'boolean', 'number'], schema.schema[itemName].type)) {
          return <div className="mold-devpanel__schema-primitive">
            <div className="mold-devpanel__schema-primitive_name">{itemName}:</div>
            <div>
              <div className="mold-devpanel__schema-primitive_type">
                {schema.schema[itemName].type}
              </div>
              {schema.schema[itemName].readOnly && <div className="mold-devpanel__schema-primitive_ro">ro</div>}
              {!_.isUndefined(schema.schema[itemName].saveable) && (
                (schema.schema[itemName].saveable) ?
                  <div className="mold-devpanel__schema-primitive_saveable">saveable</div>
                :
                <div className="mold-devpanel__schema-primitive_unsaveable">unsaveable</div>
              )}
              {schema.schema[itemName].primary && <div className="mold-devpanel__schema-primitive_primary">primary</div>}
            </div>
          </div>;
        }
        else {
          return this.recursiveSchema(schema.schema[itemName], `${root}.schema.${itemName}`, itemName);
        }
      })}
    </ItemWrapper>;
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
