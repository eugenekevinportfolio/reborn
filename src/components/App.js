import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import {
  switchToMobile,
  switchToDesktop,
  storeWindowDimensions,
  selectConcept
} from "../actions/index.js";
import Header from "./Header.js";
import "../styles/App.css";
import map from "lodash/map";
import Concept from "./Concept.js";
import Presentation from "./Presentation.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canScroll: false
    };
  }

  updateDimensions() {
    const { window_dimensions } = this.props;
    this.timeout && clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    }, 400);

    if (window.innerWidth < 810) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    } else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }
  }

  handleScroll() {
    const { selected_concept } = this.props;
    const { canScroll } = this.state;
    const conceptsDOM = document.getElementsByClassName("concept-container");
    for (let i = 0; i < conceptsDOM.length; i++) {
      if (
        conceptsDOM[i].getBoundingClientRect().top >= -120 &&
        conceptsDOM[i].getBoundingClientRect().top <= 60
      ) {
        selected_concept !== conceptsDOM[i].id &&
          this.props.selectConcept(conceptsDOM[i].id);
      }
    }

    const presentationDOM = document.getElementById("presentation-container");
    if (
      presentationDOM.getBoundingClientRect().top <= 0 ||
      presentationDOM.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      !canScroll && this.setState({ canScroll: true });
    } else {
      canScroll && this.setState({ canScroll: false });
    }
  }

  componentDidMount() {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    window.addEventListener("resize", this.updateDimensions.bind(this));
    isSafari && window.addEventListener("scroll", this.handleScroll.bind(this));
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const { window_dimensions } = this.props;
    this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 810) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    } else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }
  }

  renderConcepts() {
    const { concepts } = this.props;
    return map(concepts, (concept, id) => (
      <Concept key={id} id={id} {...concept} />
    ));
  }

  render() {
    const { canScroll } = this.state;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    return (
      <div
        onScroll={() => this.handleScroll()}
        className={"main-body " + (!isSafari ? "main-body-not-safari" : "")}
      >
        <Header />
        {this.renderConcepts()}
        <Presentation canScroll={canScroll} />
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
      selectConcept
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["window_dimensions"],
  state => state["concepts"],
  state => state["selected_concept"],
  (window_dimensions, concepts, selected_concept) => {
    return {
      window_dimensions,
      concepts,
      selected_concept
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(App);
