import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  openPanel,
  selectTab
} from '../actions/index.js';

class Tab extends Component {
  tabStyle() {
    const { panel, id, selected_tab, tabs, burger } = this.props;

    const tabs_ids = Object.keys(tabs);
    const tab_index = tabs_ids.indexOf(id);
    if (burger) {
      if (id === selected_tab) {
        return {
          backgroundColor: "white",
          color: "black",
          transitionDuration: "0.5s",
          opacity: 1,
          transitionDelay: "0.15s"
        }
      }
      else {
        return {
          opacity: 1,
          transitionDelay: "0.15s"
        }
      }
    }
    else {
      return {
        "pointerEvents": "none"
      }
    }
  }

  render() {
    const { text, panel, id, window_dimensions, burger } = this.props;
    return (
      <li
        onClick={() => {
          if (!(window_dimensions.isMobile && !burger)) {
            const section_DOM = document.getElementById(id);
            section_DOM.childNodes[0].scrollIntoView({
              behavior: 'smooth'
            });
            if (panel.isOpen) {
              this.props.openPanel(false, "");
            }
          }
        }}
        style={this.tabStyle()}>
        {text}
      </li>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openPanel,
    selectTab
  }, dispatch)
}

const selector = createSelector(
  state => state['panel'],
  state => state['selected_tab'],
  state => state['window_dimensions'],
  state => state['tabs'],
  state => state['burger'],
  (
    panel,
    selected_tab,
    window_dimensions,
    tabs,
    burger
) => {
    return  {
      panel,
      selected_tab,
      window_dimensions,
      tabs,
      burger
    };
  }
);

export default connect(selector, matchDispatchToProps)(Tab);
