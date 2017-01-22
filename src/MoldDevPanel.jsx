import React, { PropTypes } from 'react';
import localStorage from 'localStorage';

import './main.scss';
import Panel from './Panel';
import MoldStructure from './MoldStructure';
import SwitcherIcon from './SwitcherIcon';
import Tab from './Tab';
import TabButton from './TabButton';
import TabContent from './TabContent';

export default class MoldDevPanel extends React.Component {
  constructor(params) {
    super(params);

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

              <TabContent>
                <MoldStructure />
              </TabContent>
              <TabContent>
                <div>Schema</div>
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
