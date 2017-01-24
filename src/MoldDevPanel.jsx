import React, { PropTypes } from 'react';

import storage from './storage';
import Panel from './Panel';
import MoldStructure from './moldStruct/MoldStructure';
import SchemaStructure from './schemaStruct/SchemaStructure';
import StoreStructure from './storeStruct/StoreStructure';
import SwitcherIcon from './controls/SwitcherIcon';
import Tab from './controls/Tab';
import TabButton from './controls/TabButton';
import TabContent from './controls/TabContent';


export default class MoldDevPanel extends React.Component {
  constructor(props) {
    super(props);

    if (!window.appMold) throw new Error(`There isn't window.appMold!`);

    // test data
    // const schema = require('./_testSchema').default.schema;
    // const moldStorage = require('./_testSchema').default.storage;
    // this.mold = require('../libs/mold').default({}, schema);
    // this.mold.$setWholeStorageState(moldStorage);
    // real mold
    this.mold = window.appMold;

    const savedState = storage.get('open');

    this.state = {
      open: savedState,
    };
  }

  toggleOpen(newState) {
    this.setState({open: newState});
    storage.set('open', newState);
  }

  render() {
    return (
      <div>

        <div className={!this.state.open && 'mold-devpanel--hide'}>
          <Panel>
            <div id="mold-devpanel-header">
              <div id="mold-devpanel-closer" onClick={() => this.toggleOpen(false)}>
                <SwitcherIcon icon="arrow-right" className="mold-devpanel__big-icon" />
              </div>
              <div id="mold-devpanel-header-h1">
                <h1>Mold development bar.</h1>
              </div>
            </div>

            <Tab>
              <TabButton>Mold</TabButton>
              <TabButton>Schema</TabButton>
              <TabButton>Store</TabButton>

              <TabContent>
                <div>
                  <MoldStructure mold={this.mold} />
                </div>
              </TabContent>
              <TabContent>
                <div>
                  <SchemaStructure mold={this.mold} />
                </div>
              </TabContent>
              <TabContent>
                <div>
                  <StoreStructure mold={this.mold} />
                </div>
              </TabContent>
            </Tab>
          </Panel>
        </div>
        <div id="mold-devpanel-openner"
             className={this.state.open && 'mold-devpanel--hide'}
             onClick={() => this.toggleOpen(true)}>
          <SwitcherIcon icon="arrow-left" className="mold-devpanel__big-icon" />
        </div>
      </div>
    );
  }
}
