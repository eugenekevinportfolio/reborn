import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import resume from '../img/Resume.pdf';
import Concepts from './Concepts.js';
import About from './About.js';
import Panel from './Panel.js';
import Header from './Header.js';
import Intro from './Intro.js';
import '../styles/App.css';
import '../styles/Panel.css';
import {
  storeWindowDimensions,
  switchToMobile,
  switchToDesktop,
  selectTab,
  openIntro
} from '../actions/index.js';
import logo from '../img/Logo.png';
import SayHi from './SayHi.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desync_panel_open: false,
      border: false,
    }
  }

  updateDimensions() {
    const { window_dimensions } = this.props;
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    }, 400);

    if (window.innerWidth < 850) {
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
    if (window.innerWidth < 850) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    }
    else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }

    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);

    // Handle key events
    this.pressKey = this.pressKey.bind(this);
    window.addEventListener("keydown", this.pressKey);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.handleScroll = undefined;
    window.removeEventListener("keydown", this.pressKey);
    this.pressKey = undefined;
  }

  componentDidUpdate(prevProps) {
    const { panel, intro } = this.props;

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

  pressKey(e) {
    const { selected_tab, tabs, panel } = this.props;
    const tabs_ids = Object.keys(tabs);
    const selectab_tab_index = tabs_ids.indexOf(selected_tab);
    if (!panel.isOpen) {
      if (e.keyCode === 38) {
        e.preventDefault();
        if (selectab_tab_index > 0) {
          const section_DOM = document.getElementById(tabs_ids[selectab_tab_index - 1]);
          section_DOM.childNodes[0].scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
      else if (e.keyCode === 40) {
        e.preventDefault();
        if (selectab_tab_index < tabs_ids.length - 1) {
          const section_DOM = document.getElementById(tabs_ids[selectab_tab_index + 1]);
          section_DOM.childNodes[0].scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
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
      distance_to_bottom[i] = page_bottom - 200 - sections_top[i];
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
        window.scrollY > 10 && this.setState({ border: true });
      }
      else {
        window.scrollY < 10 && this.setState({ border: false });
      }
    }
  }

  render() {
    const { desync_panel_open, border } = this.state;
    const { desync_intro } = this.state;

    return (
      <div className="App">
        {/* {desync_intro && <Intro />} */}
        <div className="content">
          <Header border={border}/>
          <div className="welcome">
            <h1>
              Kevin Eugene
            </h1>
            <div className="intro-labels">
              <p>
                Designer
              </p>
              <div className="separator" />
              <p>
                Software Engineer
              </p>
              <div className="separator" />
              <p>
                Storywriter
              </p>
            </div>
            <div className="CTA-row">
              <a className="CTA" href="mailto:kevin.eugene@hec.edu">
                Say Hi!
              </a>
              <a
                className="CTA"
                href={resume}
                target="_blank"
                rel="noopener noreferrer">
                Resume
              </a>
            </div>
          </div>
          <Concepts />
          <About />
          {/* <SayHi /> */}
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
    selectTab,
    openIntro
  }, dispatch)
}


const selector = createSelector(
  state => state['window_dimensions'],
  state => state['selected_tab'],
  state => state['panel'],
  state => state['tabs'],
  state => state['intro'],
  (
    window_dimensions,
    selected_tab,
    panel,
    tabs,
    intro
) => {
    return  {
      window_dimensions,
      selected_tab,
      panel,
      tabs,
      intro
    };
  }
);

export default connect(selector, matchDispatchToProps)(App);
