import React, { PropTypes } from 'react';
import _ from 'lodash';

import ItemWrapper from '../ItemWrapper';
import StructDocument from './StructDocument';


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
  }

  componentWillMount() {
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
          return <ItemWrapper name={name}>
            {this._renderPages(action, name)}
          </ItemWrapper>;
        })}
      </div>
    );
  }
}
