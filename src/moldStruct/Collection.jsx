import React, { PropTypes } from 'react';
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

    this.state = {
    };

    this.instance = this.props.mold.child(this.props.moldPath);
    this.storage = this.instance.mold;

    console.log(11111, this.storage, this.instance)
  }

  componentWillMount() {
  }

  _renderCollection(collection) {
    return _.map(collection, (item, index) => {
      const moldPath = `${this.props.moldPath}[${item.$id}]`;
      return <ItemWrapper name={index}>
        <StructDocument moldPath={moldPath}
                        mold={this.props.mold}
                        storage={item} />
      </ItemWrapper>;
    });
  }

  render() {
    return (
      <div>
        {this._renderCollection(this.storage)}
      </div>
    );
  }
}
