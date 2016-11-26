import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class MoldStructure extends React.Component {
  constructor(params) {
    super(params);

    if (!window.appMold) throw new Error(`There isn't window.appMold!`);
    this.mold = window.appMold;
    this.storage = this.mold.$getWholeStorageState();
  }

  recursivelyMap(containerOrArrayOrPrimitive) {
    if (_.isPlainObject(containerOrArrayOrPrimitive)) {
      return _.map(containerOrArrayOrPrimitive, (item, name) => {
        return <div className="mold-devpanel__container">
          <div>{name}: </div>
          <div className="mold-devpanel__container-children">{this.recursivelyMap(item)}</div>
        </div>
      });
    }
    else if (_.isArray(containerOrArrayOrPrimitive)) {
      return _.map(containerOrArrayOrPrimitive, (item, index) => {
        return <div>
          <div>{index}: </div>
          <div>{this.recursivelyMap(item)}</div>
        </div>
      });
    }
    else {
      // primitive
      return <div className="mold-devpanel__primitive">{containerOrArrayOrPrimitive}</div>;
    }
  }

  render() {
    return (
      <div id="mold-devpanel__structure">
        {this.recursivelyMap(this.storage)}
      </div>
    );
  }
}
