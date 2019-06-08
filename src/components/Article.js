import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import {
  switchToMobile,
  switchToDesktop,
  storeWindowDimensions
} from "../actions/index.js";
import ArticleHero from "./ArticleHero";
import "../styles/Article.css";
import "../styles/Parallax.css";
import ArticleHeader from "./ArticleHeader";

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasScrolled: false,
      hasScrolledFast: true
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
    const { hasScrolled } = this.state;
    if (window.scrollY > 80) {
      !hasScrolled && this.setState({ hasScrolled: true });
    } else {
      hasScrolled && this.setState({ hasScrolled: false });
    }
  }

  handleKeydown() {}

  componentDidMount() {
    // const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("keydown", this.handleKeydown);
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("keydown", this.handleKeydown);
    this.updateDimensions = undefined;
    this.handleScroll = undefined;
    this.handleKeydown = undefined;
  }

  render() {
    const { hasScrolled, hasScrolledFast } = this.state;
    const { history } = this.props;

    return (
      <div className="article-container article--dark">
        <ArticleHeader hasScrolled={hasScrolled} history={history} />
        <ArticleHero hasScrolled={hasScrolled} />
        <div style={{ height: 1000 }} />
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      storeWindowDimensions,
      switchToMobile,
      switchToDesktop
    },
    dispatch
  );
}

const selector = createSelector(
  state => state["window_dimensions"],
  window_dimensions => {
    return {
      window_dimensions
    };
  }
);

export default connect(
  selector,
  matchDispatchToProps
)(Article);
