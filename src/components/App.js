import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import {
  switchToMobile,
  switchToDesktop,
  storeWindowDimensions,
  currentSection,
  selectConcept,
  playVideo,
  previewConcept
} from "../actions/index.js";
import Header from "./Header.js";
import "../styles/App.css";
import "../styles/Section.css";
import MobileHero from "./MobileHero.js";
import Articles from "./Articles.js";
// import Presentation from "./Presentation.js";
import Connect from "./Connect.js";
import $ from "jquery";
import CV from "./CV.js";

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
    const { current_section, selected_concept } = this.props;
    const { hasScrolled } = this.state;
    if (window.scrollY > 80) {
      !hasScrolled && this.setState({ hasScrolled: true });
    } else {
      hasScrolled && this.setState({ hasScrolled: false });
    }

    const conceptsDOM = document.getElementsByClassName("concept-container");
    for (let i = 0; i < conceptsDOM.length; i++) {
      let conceptTop = conceptsDOM[i].getBoundingClientRect().top;
      if (
        conceptTop >= -(window.innerHeight / 2) &&
        conceptTop <= window.innerHeight / 2
      ) {
        selected_concept !== conceptsDOM[i].id &&
          this.props.selectConcept(conceptsDOM[i].id);
      }
    }

    const sectionsDOM = document.getElementsByClassName("section");
    for (let i = 0; i < sectionsDOM.length; i++) {
      let sectionTop = sectionsDOM[i].getBoundingClientRect().top;
      let sectionBottom = sectionsDOM[i].getBoundingClientRect().bottom;

      if (
        (sectionTop <= 0 && sectionBottom >= window.innerHeight) ||
        (sectionTop >= 0 && sectionBottom <= window.innerHeight) ||
        (sectionTop >= 0 &&
          sectionTop <= window.innerHeight / 2 &&
          sectionBottom >= window.innerHeight) ||
        (sectionTop <= 0 &&
          sectionBottom >= window.innerHeight / 2 &&
          sectionBottom <= window.innerHeight)
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
    const { current_section } = this.props;
    const allSections = ["hero", "articles", "connect"];
    // if (e.keyCode === 32) {
    //   e.preventDefault();
    //   const video = document.getElementById("pres-video");
    //   const videoTop = video.getBoundingClientRect().top;
    //   const videoBottom = video.getBoundingClientRect().bottom;
    //   if (videoTop >= 0 && videoBottom <= window.innerHeight) {
    //     this.props.playVideo(!video_played);
    //   }
    // }
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
    const { isPreviewOn } = this.props;
    isPreviewOn && this.props.previewConcept(false);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("keydown", this.handleKeydown);
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

  onReady() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("keydown", this.handleKeydown);
    this.updateDimensions = undefined;
    this.handleScroll = undefined;
    this.handleKeydown = undefined;
  }

  render() {
    const { hasScrolled, antiHeader, showBubble } = this.state;
    const { globalDarkMode } = this.props;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    return (
      <div
        onLoad={() => this.onReady()}
        className={
          "main-body " +
          (!isSafari ? "main-body-not-safari " : "") +
          (globalDarkMode ? "main-body--dark" : "")
        }
      >
        <Header hasScrolled={hasScrolled} antiHeader={antiHeader} />
        <CV antiHeader={antiHeader} />
        {/* <MediaQuery maxWidth={709}> */}
        <MobileHero hasScrolled={hasScrolled} />
        {/* </MediaQuery> */}
        {/* <MediaQuery minWidth={710}>
          <Hero hasScrolled={hasScrolled} />
        </MediaQuery> */}
        <Articles />
        {/* <TechPress /> */}
        {/* <Presentation paused={videoPaused} /> */}
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
      playVideo,
      selectConcept,
      previewConcept
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["window_dimensions"],
  state => state["concepts"],
  state => state["current_section"],
  state => state["video_played"],
  state => state["selected_concept"],
  state => state["globalDarkMode"],
  state => state["isPreviewOn"],
  (
    window_dimensions,
    concepts,
    current_section,
    video_played,
    selected_concept,
    globalDarkMode,
    isPreviewOn
  ) => {
    return {
      window_dimensions,
      concepts,
      current_section,
      video_played,
      selected_concept,
      globalDarkMode,
      isPreviewOn
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(App);
