import React, { PropTypes } from 'react';

import './main.scss';
import Panel from './Panel';
import MoldStructure from './MoldStructure';
import SwitcherIcon from './SwitcherIcon';

export default class MoldDevPanel extends React.Component {
  constructor(params) {
    super(params);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div>
        <div className={!this.state.open && 'mold-devpanel--hide'}>
          <Panel>
            <SwitcherIcon icon="close" onClick={() => this.setState({open: false})} />
            <h1>Mold development bar.</h1>
            <MoldStructure />
          </Panel>
        </div>
        <div id="mold-devpanel-openner"
             className={this.state.open && 'mold-devpanel--hide'}
             onClick={() => this.setState({open: true})}>
          <SwitcherIcon icon="open" />
        </div>
      </div>
    );
  }
}
