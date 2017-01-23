import React, { PropTypes } from 'react';
import localStorage from 'localStorage';

import './main.scss';
import Panel from './Panel';
import MoldStructure from './moldStruct/MoldStructure';
import SwitcherIcon from './controls/SwitcherIcon';
import Tab from './controls/Tab';
import TabButton from './controls/TabButton';
import TabContent from './controls/TabContent';

export default class MoldDevPanel extends React.Component {
  constructor(props) {
    super(props);

    // TODO: use real
    //this.mold = window.appMold;
    // test data
    const schema = require('./_testSchema').default.schema;
    const storage = require('./_testSchema').default.storage;
    this.mold = require('../libs/mold').default({}, schema);
    this.mold.$setWholeStorageState(storage);

    const savedState = localStorage.getItem('mold-devpanel__open') == 'true';

    this.state = {
      open: savedState,
    };
  }

  toggleOpen(newState) {
    this.setState({open: newState});
    localStorage.setItem('mold-devpanel__open', newState);
  }

  render() {
    return (
      <div>
        <div className={!this.state.open && 'mold-devpanel--hide'}>
          <Panel>
            <div id="mold-devpanel-header">
              <div id="mold-devpanel-closer" onClick={() => this.toggleOpen(false)}>
                <SwitcherIcon icon="close" />
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
                <MoldStructure mold={this.mold} />
              </TabContent>
              <TabContent>
                <div>Schema</div>
              </TabContent>
              <TabContent>
                <div>Store</div>
              </TabContent>
            </Tab>
          </Panel>
        </div>
        <div id="mold-devpanel-openner"
             className={this.state.open && 'mold-devpanel--hide'}
             onClick={() => this.toggleOpen(true)}>
          <SwitcherIcon icon="open" />
        </div>
      </div>
    );
  }
}
