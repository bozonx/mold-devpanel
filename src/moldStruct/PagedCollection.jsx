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
    this.storage = this.instance.realMold;
  }

  componentWillMount() {
  }

  _renderPages(pages, actionName) {
    return _.map(pages, (page, index) => {
      return <ItemWrapper name={`page${index}`}>
        {this._renderCollection(page, actionName, index)}
      </ItemWrapper>;
    });
  }

  _renderCollection(collection, actionName, pageNum) {
    return _.map(collection, (item, index) => {
      const moldPath = `${this.props.moldPath}[${item.$id}]`;
      const storagePath = `action.${actionName}[${pageNum}][${index}]`;
      return <ItemWrapper name={index}>
        <StructDocument moldPath={moldPath}
                        mold={this.props.mold}
                        storage={_.get(this.storage, storagePath)} />
      </ItemWrapper>;
    });
  }


  render() {
    const actionNames = _.keys(this.storage.action).sort();
    return (
      <div className="mold-devpanel__documents-collection">
        {_.map(actionNames, (name) => {
          return <ItemWrapper name={name}>
            {this._renderPages(this.storage.action[name], name)}
          </ItemWrapper>;
        })}
      </div>
    );
  }
}
