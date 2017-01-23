import React, { PropTypes } from 'react';
import _ from 'lodash';

import StructDocument from './StructDocument';


export default class StructDocumetsCollection extends React.Component {
  static propTypes = {
    moldPath: PropTypes.string,
    mold: PropTypes.object,
    renderItemWrapper: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.instance = this.props.mold.child(this.props.moldPath);
    this.storage = this.instance.mold;
  }

  componentWillMount() {
  }

  _renderDocumentsCollection(moldPath) {
    // TODO: use instance
    const collectionStorage = _.get(this.storage, moldPath);

    return _.map(collectionStorage.action, (action, name) => {
      return this.props.renderItemWrapper(name, this._renderPages(action, moldPath))
    });
  }

  _renderPages(pages, actionName) {
    return <div>{
      _.map(pages, (page, index) => {
        return this.props.renderItemWrapper(`page${index}`,
          this._renderCollection(page, actionName, index))})
    }</div>
  }

  _renderCollection(collection, actionName, pageNum) {
    return _.map(collection, (item, index) => {
      const moldPath = `${this.props.moldPath}[${item.mold.$id}]`;
      return this.props.renderItemWrapper(index, <StructDocument moldPath={convertFromSchemaToLodash(moldPath)}
                                                                 mold={this.props.mold} />)
    });
  }

  render() {
    return (
      <div className="mold-devpanel__documents-collection">
        {_.map(this.storage.action, (action, name) => {
          return this.props.renderItemWrapper(name, this._renderPages(action, name))
        })}
      </div>
    );
  }
}
