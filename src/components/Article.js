import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { bindActionCreators } from "redux";
import {
  switchToMobile,
  switchToDesktop,
  storeWindowDimensions,
  selectConcept
} from "../actions/index.js";
import ArticleHero from "./ArticleHero";
import "../styles/Article.css";
import "../styles/Parallax.css";
import ArticleHeader from "./ArticleHeader";
import Youtube from "./Youtube.js";
import Connect from "./Connect.js";
import NextArticle from "./NextArticle.js";
import Mogi from "./Mogi.js";

class Article extends Component {
  constructor(props) {
    super(props);
    this.lastPosition = 0;

    this.state = {
      hasScrolled: false,
      hasScrolledFast: false,
      currentMediaIndex: null,
      showBubble: false,
      isNextArticleFocused: false
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
    const { hasScrolled, hasScrolledFast, currentMediaIndex } = this.state;
    const deltaY = window.scrollY - this.lastPosition;
    if (window.scrollY > 80) {
      !hasScrolled && this.setState({ hasScrolled: true });
      if (deltaY > 20) {
        !hasScrolledFast && this.setState({ hasScrolledFast: true });
      } else if (deltaY < -15) {
        hasScrolledFast && this.setState({ hasScrolledFast: false });
      }
    } else {
      hasScrolled && this.setState({ hasScrolled: false });
      hasScrolledFast && this.setState({ hasScrolledFast: false });
    }
    this.lastPosition = window.scrollY;

    const articleMedia = document.getElementsByClassName("article-media");
    let visibleMediaIndex = [];
    for (let i = 0; i < articleMedia.length; i++) {
      let mediaTop = articleMedia[i].getBoundingClientRect().top;
      let mediaBottom = articleMedia[i].getBoundingClientRect().bottom;
      if (mediaTop >= 0 && mediaBottom + 60 <= window.innerHeight) {
        visibleMediaIndex.push(i);
      } else if (mediaTop >= window.innerHeight || mediaBottom <= 0) {
        articleMedia[i].style.visibility = "hidden";
      } else if (mediaTop >= 0 || mediaBottom <= window.innerHeight) {
        articleMedia[i].style.visibility = "unset";
      }
    }

    const lastMediaIndex = visibleMediaIndex.length - 1;
    visibleMediaIndex[lastMediaIndex] !== undefined &&
      currentMediaIndex !== visibleMediaIndex[lastMediaIndex] &&
      this.setState({ currentMediaIndex: visibleMediaIndex[lastMediaIndex] });

    const avatarDOM = document.getElementById("avatar");
    let avatarTop = avatarDOM.getBoundingClientRect().top;
    let avatarBottom = avatarDOM.getBoundingClientRect().bottom;
    if (avatarTop >= 0 && avatarBottom <= window.innerHeight) {
      this.setState({ showBubble: true });
    }

    const nextArticleDOM = document.getElementById("next-article");
    let nextArticleTop = nextArticleDOM.getBoundingClientRect().top;
    let nextArticleBottom = nextArticleDOM.getBoundingClientRect().bottom;
    if (
      nextArticleTop >= 0 &&
      nextArticleBottom <= (4 * window.innerHeight) / 5
    ) {
      this.setState({ isNextArticleFocused: true });
    } else {
      this.setState({ isNextArticleFocused: false });
    }
  }

  handleKeydown() {}

  componentDidMount() {
    // const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const { match } = this.props;

    this.props.selectConcept(match.params.id);

    window.scrollTo(0, 0);
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
    this.setState({
      hasScrolled: false,
      hasScrolledFast: true,
      currentMediaIndex: null
    });
  }

  renderConcept() {
    const { selected_concept } = this.props;
    const { currentMediaIndex } = this.state;

    switch (selected_concept) {
      case "youtube":
        return <Youtube currentMediaIndex={currentMediaIndex} />;
      case "mogi":
        return <Mogi currentMediaIndex={currentMediaIndex} />;
      default:
        return <div />;
    }
  }

  render() {
    const {
      hasScrolled,
      hasScrolledFast,
      showBubble,
      isNextArticleFocused
    } = this.state;
    const { concepts, selected_concept } = this.props;
    const darkMode = selected_concept && concepts[selected_concept].darkMode;

    return (
      <div className={"article-container " + (darkMode ? "article--dark" : "")}>
        <ArticleHeader
          hasScrolled={hasScrolled}
          hasScrolledFast={hasScrolledFast}
        />
        <ArticleHero hasScrolled={hasScrolled} />
        {this.renderConcept()}
        <NextArticle isNextArticleFocused={isNextArticleFocused} />
        <Connect darkMode={darkMode} showBubble={showBubble} />
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
  state => state["selected_concept"],
  state => state["concepts"],
  (window_dimensions, selected_concept, concepts) => {
    return {
      window_dimensions,
      selected_concept,
      concepts
    };
  }
);

export default withRouter(
  connect(
    selector,
    matchDispatchToProps
  )(Article)
);
