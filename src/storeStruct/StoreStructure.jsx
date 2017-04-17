import React from 'react';
import PropTypes from 'prop-types';
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

    this.state = {
      storage: this.props.mold.$getWholeStorageState(),
    };

    this.props.mold.onAnyChange(() => {
      this.setState({storage: this.props.mold.$getWholeStorageState()});
    });
  }

  recursiveSchema(storage, name) {
    if (_.isArray(storage)) {
      return this._renderArray(storage, name);
    }
    else if (_.isPlainObject(storage)) {
      return this._renderContainer(storage, name);
    }
    else {
      return this._renderPrimitive(storage, name);
    }
  }

  _renderPrimitive(storage, name) {
    return <div className="mold-devpanel__schema-primitive">
      <div className="mold-devpanel__schema-primitive_name">{name}:</div>
      <div>
        {renderValue(storage)}
      </div>
    </div>
  }

  _renderArray(storage, name) {
    const isPlainArray = !_.isPlainObject(_.last(storage)) && !_.isArray(_.last(storage));
    if (_.isEmpty(storage) || isPlainArray) {
      // plain array
      return this._renderPrimitive(storage, name);
    }

    // collections
    return <ItemWrapper name={name}>
      {_.map(storage, (item, index) =>
        this.recursiveSchema(item, index.toString()))}
    </ItemWrapper>;
  }

  _renderContainer(storage, name) {
    if (_.isEmpty(storage)) {
      return this._renderPrimitive(storage, name);
    }

    const renderChildren = () => {
      return _.map(storage, (item, itemName) =>
        this.recursiveSchema(item, itemName));
    };

    if (name) {
      return <ItemWrapper name={name}>
        {renderChildren()}
      </ItemWrapper>;
    }

    return renderChildren();
  }

  render() {
    return <div className="mold-devpanel__structure">
      {this.recursiveSchema(this.state.storage)}
    </div>;
  }
}
