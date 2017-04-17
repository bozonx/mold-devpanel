import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ItemWrapper from '../ItemWrapper';
import Document from './Document';


export default class DocumentsCollection extends React.Component {
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

  _renderCollection(collection, actionName, pageNum) {
    return _.map(collection, (item, index) => {
      const moldPath = `${this.props.moldPath}[${item.$id}]`;
      const storagePath = `action.${actionName}[${pageNum}][${index}]`;
      return <ItemWrapper name={index}>
        <Document moldPath={moldPath}
                  mold={this.props.mold}
                  storage={_.get(this.storage, storagePath)} />
      </ItemWrapper>;
    });
  }

  _renderDocuments(name) {
    const moldPath = `${this.props.moldPath}.${name}`;
    return <ItemWrapper name={name}>
      <Document moldPath={moldPath}
                mold={this.props.mold} />
    </ItemWrapper>;
  }

  _renderPages(pages, actionName) {
    return <ItemWrapper name={actionName}>
      {_.map(pages, (page, index) => {
        return <ItemWrapper name={`page${index}`}>
          {this._renderCollection(page, actionName, index)}
        </ItemWrapper>;
      })}
    </ItemWrapper>;
  }

  render() {
    const actionNames = _.keys(this.storage.action).sort();
    const documentsNames = _.keys(this.storage.documents).sort();
    return (
      <div>
        {_.map(actionNames, (name) => this._renderPages(this.storage.action[name], name))}
        {_.map(documentsNames, (name) => this._renderDocuments(name))}
      </div>
    );
  }
}
