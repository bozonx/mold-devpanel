import React, { PropTypes } from 'react';
import _ from 'lodash';

import ItemWrapper from '../ItemWrapper';
import { renderValue } from '../helpers';


export default class StoreStructure extends React.Component {
  static propTypes = {
    mold: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.schema = this.props.mold.$$schemaManager.getFullSchema();
    this.storage = this.props.mold.$getWholeStorageState();
  }

  recursiveSchema(storage, root, name) {
    if (_.isArray(storage)) {

    }
    else if (_.isPlainObject(storage)) {
      return _.map(storage, (item, itemName) => <ItemWrapper name={itemName}>
        {this.recursiveSchema(item, _.trim(`${root}.${itemName}`, '.'), itemName)}
      </ItemWrapper>)
    }
    else {
      return <div className="mold-devpanel__schema-primitive">
        <div className="mold-devpanel__schema-primitive_name">{name}:</div>
        <div>
          {renderValue(storage)}
        </div>
      </div>
    }
  }

  render() {
    return <div className="mold-devpanel__structure">
      {this.recursiveSchema(this.storage, '')}
    </div>;
  }
}
