import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import {
  switchToMobile,
  switchToDesktop,
  storeWindowDimensions,
  currentSection,
  playVideo
} from "../actions/index.js";
import Header from "./Header.js";
import "../styles/App.css";
import "../styles/Section.css";
import Hero from "./Hero.js";
import MobileHero from "./MobileHero.js";
import Articles from "./Articles.js";
import Presentation from "./Presentation.js";
import Connect from "./Connect.js";
import $ from "jquery";
import MediaQuery from "react-responsive";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasScrolled: false,
      antiHeader: false,
      showBubble: false,
      videoPaused: true
    };
  }

  updateDimensions() {
    const { window_dimensions } = this.props;
    this.timeout && clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    }, 400);

    if (window.innerWidth < 710) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    } else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }
  }

  handleScroll() {
    const { current_section } = this.props;
    if (window.scrollY > 80) {
      this.setState({ hasScrolled: true });
    } else {
      this.setState({ hasScrolled: false });
    }

    const sectionsDOM = document.getElementsByClassName("section");
    for (let i = 0; i < sectionsDOM.length; i++) {
      let sectionTop = sectionsDOM[i].getBoundingClientRect().top;
      let sectionBottom = sectionsDOM[i].getBoundingClientRect().bottom;
      if (sectionTop <= 0 && sectionBottom >= 78) {
        if (sectionsDOM[i].classList.contains("dark-section")) {
          this.setState({ antiHeader: true });
        } else {
          this.setState({ antiHeader: false });
        }
      }

      if (
        sectionTop >= -(window.innerHeight / 2) &&
        sectionTop <= window.innerHeight / 2
      ) {
        current_section !== sectionsDOM[i].id &&
          this.props.currentSection(sectionsDOM[i].id);
      }
    }

    const avatarDOM = document.getElementById("avatar");
    let avatarTop = avatarDOM.getBoundingClientRect().top;
    let avatarBottom = avatarDOM.getBoundingClientRect().bottom;
    if (avatarTop >= 0 && avatarBottom <= window.innerHeight) {
      this.setState({ showBubble: true });
    }
  }

  handleKeydown(e) {
    const { current_section, video_played } = this.props;
    const allSections = ["hero", "articles", "presentation", "connect"];
    if (e.keyCode === 32) {
      e.preventDefault();
      const video = document.getElementById("pres-video");
      const videoTop = video.getBoundingClientRect().top;
      const videoBottom = video.getBoundingClientRect().bottom;
      if (videoTop >= 0 && videoBottom <= window.innerHeight) {
        this.props.playVideo(!video_played);
      }
    }
    if (e.keyCode === 38) {
      e.preventDefault();
      const currentSectionIndex = allSections.findIndex(
        e => e === current_section
      );
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $(
            "#" + allSections[(currentSectionIndex - 1 + 4) % 4]
          ).offset().top
        },
        800
      );
    }
    if (e.keyCode === 40) {
      e.preventDefault();
      const currentSectionIndex = allSections.findIndex(
        e => e === current_section
      );
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $(
            "#" + allSections[(currentSectionIndex + 1) % 4]
          ).offset().top
        },
        800
      );
    }
  }

  componentDidMount() {
    // const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    window.addEventListener("resize", this.updateDimensions.bind(this));
    window.addEventListener("scroll", this.handleScroll.bind(this));
    window.addEventListener("keydown", this.handleKeydown.bind(this));
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const { window_dimensions } = this.props;
    this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 710) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    } else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }
  }

  render() {
    const { hasScrolled, antiHeader, showBubble, videoPaused } = this.state;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    return (
      <div className={"main-body " + (!isSafari ? "main-body-not-safari" : "")}>
        <Header hasScrolled={hasScrolled} antiHeader={antiHeader} />
        <MediaQuery maxWidth={709}>
          <MobileHero hasScrolled={hasScrolled} />
        </MediaQuery>
        <MediaQuery minWidth={710}>
          <Hero hasScrolled={hasScrolled} />
        </MediaQuery>
        <Articles />
        <Presentation paused={videoPaused} />
        <Connect showBubble={showBubble} />
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      storeWindowDimensions,
      switchToMobile,
      switchToDesktop,
      currentSection,
      playVideo
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["window_dimensions"],
  state => state["concepts"],
  state => state["current_section"],
  state => state["video_played"],
  (window_dimensions, concepts, current_section, video_played) => {
    return {
      window_dimensions,
      concepts,
      current_section,
      video_played
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(App);
