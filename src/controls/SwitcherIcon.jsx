import React from 'react';

export default class SwitcherIcon extends React.Component {
  render() {
    return (
      <div className={'mold-devpanel-switcher ' + this.props.className}>
        {this.props.icon == 'arrow-left' && <span className="mold-devpanel__switcher_arrow-left">&lsaquo;</span>}
        {this.props.icon == 'arrow-right' && <span className="mold-devpanel__switcher_arrow-right">&rsaquo;</span>}
        {this.props.icon == 'arrow-down' && <span className="mold-devpanel__switcher_arrow-down">v</span>}
      </div>
    );
  }
}
