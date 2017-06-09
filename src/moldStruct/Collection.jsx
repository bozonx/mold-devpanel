import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ItemWrapper from '../ItemWrapper';
import StructDocument from './Document';


export default class DocumetsCollection extends React.Component {
  static propTypes = {
    moldPath: PropTypes.string,
    mold: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.instance = this.props.mold.child(this.props.moldPath);
    this.storage = this.instance.mold;
  }

  componentWillMount() {
  }

  _renderCollection(collection) {
    return _.map(collection, (item, index) => {
      const moldPath = `${this.props.moldPath}[${item.$id}]`;
      return <ItemWrapper key={index} name={index}>
        <StructDocument moldPath={moldPath}
                        mold={this.props.mold}
                        storage={item} />
      </ItemWrapper>;
    });
  }

  render() {
    return <div>
      {this._renderCollection(this.storage)}
    </div>;
  }
}
