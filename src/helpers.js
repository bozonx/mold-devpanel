import React from 'react';
import _ from 'lodash';

export function convertFromSchemaToLodash(path) {
  return path.replace(/\.schema/g, '');
}

export function renderValue(value) {
  if (_.isBoolean(value)) {
    return <span className="mold-devpanel__type-boolean">{JSON.stringify(value)}</span>;
  }
  else if (_.isNumber(value)) {
    return <span className="mold-devpanel__type-number">{value}</span>;
  }
  else if (_.isString(value)) {
    return <span className="mold-devpanel__type-string">"
      {_.truncate(value, {length: 25})}
      "</span>;
  }
  else {
    return JSON.stringify(value);
  }
}
