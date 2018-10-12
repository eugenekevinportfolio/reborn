import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import Concepts from './Concepts.js';
import About from './About.js';
import Side from './Side.js';
import Panel from './Panel.js';
import MobileHead from './MobileHead.js';
import '../styles/App.css';
import '../styles/Panel.css';
import {
  storeWindowDimensions,
  switchToMobile,
  switchToDesktop,
  selectTab
} from '../actions/index.js';
import logo from '../img/Logo.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desync_panel_open: false,
      border: false
    }
  }

  updateDimensions() {
    const { window_dimensions } = this.props;
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    }, 400);

    if (window.innerWidth < 650) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    }
    else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    const { window_dimensions } = this.props;
    this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 650) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    }
    else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }

    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.handleScroll = undefined;
  }

  componentDidUpdate(prevProps) {
    const { panel } = this.props;

    if (!prevProps.panel.isOpen && panel.isOpen) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      this.setState({
        desync_panel_open: true
      })
    }
    else if (prevProps.panel.isOpen && !panel.isOpen) {
      document.getElementsByTagName("body")[0].style.overflow = null;
      setTimeout(() => {
        this.setState({
          desync_panel_open: false
        })
      }, 800)
    }
  }

  handleScroll(e) {
    const { border } = this.state;
    const { window_dimensions, selected_tab, panel } = this.props;
    const page_bottom = window_dimensions.height;
    const sections_array = document.getElementsByClassName("section");
    const sections_top = [];
    for (let i = 0; i < sections_array.length; i++) {
      sections_top[i] = sections_array[i].getBoundingClientRect().top;
    }
    const distance_to_bottom = [];
    for (let i = 0; i < sections_top.length; i++) {
      distance_to_bottom[i] = page_bottom - sections_top[i];
    }
    const positive_values = [];
    for (let i = 0; i < distance_to_bottom.length; i++) {
      if (distance_to_bottom[i] > 0) {
        positive_values[i] = distance_to_bottom[i];
      }
    }
    const minimum_positive = Math.min(...positive_values);
    const index_of_min = distance_to_bottom.indexOf(minimum_positive);
    const section_to_focus = sections_array[index_of_min] && sections_array[index_of_min].id;
    selected_tab !== section_to_focus && section_to_focus && this.props.selectTab(section_to_focus);

    if (window_dimensions.isMobile) {
      if (!border) {
        document.documentElement.scrollTop > 10 && this.setState({ border: true });
      }
      else {
        document.documentElement.scrollTop < 10 && this.setState({ border: false });
      }
    }
  }

  render() {
    const { desync_panel_open, border } = this.state;
    const { window_dimensions } = this.props;

    return (
      <div className="App">
        {window_dimensions.isDesktop && <Side />}
        <div id="main" className="content">
          {window_dimensions.isDesktop ?
            <div id="top-of-the-world" className="header">
              <img src={logo} alt="Logo" className="logo" />
              <p>
                KEVIN EUGENE
              </p>
            </div>
            :
            <MobileHead border={border}/>
          }
          <h1 className="big-title">
            Welcome to my portfolio
          </h1>
          <p className="intro">
            This is my portfolio. Please scroll down to have a look at a few of my UI-UX projects.
          </p>
          <Concepts />
          <About />
          {desync_panel_open && <Panel />}
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    storeWindowDimensions,
    switchToMobile,
    switchToDesktop,
    selectTab
  }, dispatch)
}


const selector = createSelector(
  state => state['window_dimensions'],
  state => state['selected_tab'],
  state => state['panel'],
  (
    window_dimensions,
    selected_tab,
    panel
) => {
    return  {
      window_dimensions,
      selected_tab,
      panel
    };
  }
);

export default connect(selector, matchDispatchToProps)(App);
